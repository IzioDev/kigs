import { Resolver, RpcClient, IUtxosChanged, Encoding } from "kaspa-wasm";
import { unknownErrorToErrorLike } from "../utils/errors";

// Create a simple client for API requests
export class KaspaClient {
  options: {
    debug: boolean;
    retryDelay: number;
    maxRetries: number;
  };

  rpc: RpcClient | null;
  networkId: string;
  connected: boolean;
  retryCount: number;

  utxoNotificationCallback?: (notification: IUtxosChanged) => unknown;
  utxoNotificationSubscribeAddresses: string[] = [];
  historyOfEmittedTxIdUtxoChanges: string[] = [];

  constructor(networkId?: string) {
    this.options = {
      debug: true,
      retryDelay: 2000,
      maxRetries: 3,
      // ...options,
    };

    this.rpc = null;
    this.networkId = networkId ?? "mainnet";
    this.connected = false;
    this.retryCount = 0;
  }

  // Log helper function
  log(message: string, level = "log") {
    if (this.options.debug) {
      // @TODO: use a proper logging method
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console[level](`[KaspaClient] ${message}`);
    }
  }

  // Set the network ID
  setNetworkId(networkId: string) {
    this.networkId = networkId;
    this.log(`Network ID set to ${networkId}`);
    return this;
  }

  // Connect to a node using the resolver
  async connect(): Promise<unknown> {
    if (this.retryCount >= this.options.maxRetries) {
      throw new Error(
        `Failed to connect after ${this.options.maxRetries} attempts`
      );
    }

    try {
      this.log(`Initializing connection for network: ${this.networkId}`);

      // Create RPC client with proper configuration
      this.rpc = new RpcClient({
        resolver: new Resolver(),
        networkId: this.networkId,
        encoding: Encoding.Borsh,
      });

      // Connect to the network
      await this.rpc.connect();
      this.connected = true;
      this.log(`Connected to ${this.rpc.url}`);

      return this;
    } catch (error) {
      this.log(
        `Connection attempt failed: ${unknownErrorToErrorLike(error)}`,
        "error"
      );
      this.retryCount++;

      if (this.retryCount < this.options.maxRetries) {
        this.log(`Retrying in ${this.options.retryDelay}ms...`);
        await new Promise((resolve) =>
          setTimeout(resolve, this.options.retryDelay)
        );
        return this.connect();
      }

      throw error;
    }
  }

  // Disconnect from the node
  async disconnect() {
    if (this.rpc && this.connected) {
      await this.rpc.disconnect();
      this.connected = false;
      this.log("Disconnected from node");
    }
  }

  async subscribeToUtxoChanges(
    addresses: string[],
    callback: (notification: IUtxosChanged) => unknown
  ) {
    try {
      if (!this.rpc || !this.connected) {
        throw new Error("Not connected to network");
      }

      if (this.utxoNotificationCallback) {
        this.rpc.removeEventListener(
          "utxos-changed",
          this.utxoNotificationCallback
        );
        this.rpc.unsubscribeUtxosChanged(
          this.utxoNotificationSubscribeAddresses
        );
        this.log("Removed existing UTXO change listener");
      }

      this.log(`Subscribing to UTXO changes for addresses: ${addresses}`);

      const boundCallback = callback.bind(this);

      const wrappedWithFilter = (notification: IUtxosChanged) => {
        const transactionIds = notification.data.added?.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (utxo: any) => utxo?.outpoint?.transactionId
        );

        const notEmittedTxIds = transactionIds.filter(
          (txId: string) =>
            this.historyOfEmittedTxIdUtxoChanges.findIndex(
              (item) => item === txId
            ) === -1
        );

        if (notEmittedTxIds.length > 0) {
          this.log(
            `Emitting UTXO change notification for txids: ${notEmittedTxIds}`
          );
          this.historyOfEmittedTxIdUtxoChanges.push(...notEmittedTxIds);

          boundCallback(notification);
        }
      };

      this.utxoNotificationCallback = wrappedWithFilter.bind(this);
      this.utxoNotificationSubscribeAddresses = addresses;

      this.rpc.addEventListener("utxos-changed", this.utxoNotificationCallback);

      this.rpc.subscribeUtxosChanged(this.utxoNotificationSubscribeAddresses);

      this.log("Successfully subscribed to UTXO changes");
    } catch (error) {
      this.log(
        `Error subscribing to UTXO changes: ${unknownErrorToErrorLike(error)}`,
        "error"
      );
      throw error;
    }
  }
}
