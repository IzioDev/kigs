import { EventEmitter } from "eventemitter3";
import SessionStorage from "./storage/session-storage";
import {
  RpcClient,
  Transaction,
  Resolver,
  NetworkId,
  IFeerateBucket,
} from "kaspa-wasm";

export type PriorityBuckets = Record<
  "slow" | "standard" | "fast",
  { feeRate: number; seconds: number }
>;

export default class Node extends EventEmitter {
  networkId: string = "TESTNET-10";

  constructor(public readonly kaspa: RpcClient) {
    super();

    this.registerEvents();
    this.listen();
  }

  get connected() {
    return this.kaspa.isConnected;
  }

  async getPriorityBuckets() {
    const { estimate } = await this.kaspa.getFeeEstimate({});

    const getBucketEstimate = (bucket: IFeerateBucket) => ({
      feeRate: bucket.feerate,
      seconds: bucket.estimatedSeconds,
    });

    return {
      slow: getBucketEstimate(estimate.lowBuckets[0]),
      standard: getBucketEstimate(estimate.normalBuckets[0]),
      fast: getBucketEstimate(estimate.priorityBucket),
    };
  }

  async submit(transactions: string[]) {
    const submittedIds: string[] = [];

    for (const transaction of transactions) {
      const { transactionId } = await this.kaspa.submitTransaction({
        transaction: Transaction.deserializeFromSafeJSON(transaction),
      });

      submittedIds.push(transactionId);
    }

    return submittedIds;
  }

  async reconnect(nodeAddress: string) {
    await this.kaspa.disconnect();

    if (!nodeAddress.startsWith("ws")) {
      if (!this.kaspa.resolver) this.kaspa.setResolver(new Resolver());
      this.kaspa.setNetworkId(new NetworkId(nodeAddress));
    }

    await this.kaspa.connect({
      url: nodeAddress.startsWith("ws") ? nodeAddress : undefined,
    });

    const { isSynced, hasUtxoIndex, networkId } =
      await this.kaspa.getServerInfo();

    if (!isSynced || !hasUtxoIndex) {
      await this.kaspa.disconnect();

      throw Error("Node is not synchronized or lacks UTXO index.");
    }

    if (this.networkId !== networkId) {
      this.emit("network", networkId);
      this.networkId = networkId;
    }
  }

  private registerEvents() {
    this.kaspa.addEventListener("connect", () => {
      this.emit("connection", true);
      this.emit("network", "testnet-10");
    });

    this.kaspa.addEventListener("disconnect", () => {
      this.emit("connection", false);
    });
  }

  private listen() {
    SessionStorage.subscribeChanges(async (key, newValue) => {
      if (key !== "session" || newValue) return;
    });
  }
}
