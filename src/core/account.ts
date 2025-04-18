import { EventEmitter } from "eventemitter3";
import {
  UtxoContext,
  UtxoProcessor,
  PublicKeyGenerator,
  type UtxoEntryReference,
} from "kaspa-wasm";
import type Node from "./node";
import Addresses from "./addresses";
import SessionStorage from "./storage/session-storage";
import Transactions from "./transaction";
import { unstable_batchedUpdates } from "react-dom";
import { useKaspaStore } from "./kaspa-store";

export interface UTXO {
  amount: number;
  transaction: string;
  mature: boolean;
}

export default class Account extends EventEmitter {
  processor: UtxoProcessor;
  addresses: Addresses;
  context: UtxoContext;
  transactions: Transactions;

  constructor(node: Node) {
    super();

    this.processor = new UtxoProcessor({
      rpc: node.kaspa,
      networkId: node.networkId,
    });
    this.context = new UtxoContext({ processor: this.processor });

    this.addresses = new Addresses(this.context, node.networkId);
    this.transactions = new Transactions(
      node.kaspa,
      this.context,
      this.addresses
    );

    node.on("network", async (networkId: string) => {
      await this.addresses.changeNetwork(networkId);

      if (this.processor.isActive) {
        await this.processor.stop();
        this.processor.setNetworkId(networkId);
        await this.processor.start();
      } else {
        this.processor.setNetworkId(networkId);
      }
    });

    this.registerProcessor();
    this.listen();
  }

  get balance() {
    return Number(this.context.balance?.mature ?? 0) / 1e8;
  }

  get UTXOs() {
    const mapUTXO = (utxo: UtxoEntryReference, mature: boolean) => ({
      amount: Number(utxo.amount) / 1e8,
      transaction: utxo.outpoint.transactionId,
      mature,
    });

    const pendingUTXOs = this.context
      .getPending()
      .map((utxo) => mapUTXO(utxo, false));
    const matureUTXOs = this.context
      .getMatureRange(0, this.context.matureLength)
      .map((utxo) => mapUTXO(utxo, true));

    // @ts-ignore
    return [...pendingUTXOs, ...matureUTXOs];
  }

  async scan(steps = 50, count = 20) {
    const scanAddresses = async (isReceive: boolean, startIndex: number) => {
      let foundIndex = 0;

      for (let index = 0; index < steps; index++) {
        const addresses = await this.addresses.derive(
          isReceive,
          startIndex,
          startIndex + count
        );
        const { entries } = await this.processor.rpc.getUtxosByAddresses(
          addresses
        );
        const entryIndex = addresses.findIndex((address) =>
          entries.some((entry) => entry.address?.toString() === address)
        );

        if (entryIndex !== -1) {
          foundIndex = startIndex + entryIndex + 1;
        }

        startIndex += count;
      }

      return foundIndex;
    };

    const receiveCount = await scanAddresses(
      true,
      this.addresses.receiveAddresses.length
    );
    const changeCount = await scanAddresses(
      false,
      this.addresses.changeAddresses.length
    );

    if (receiveCount !== 0 || changeCount !== 0) {
      await this.addresses.increment(receiveCount, changeCount);
    }
  }

  private registerProcessor() {
    this.processor.addEventListener("utxo-proc-start", async () => {
      await this.context?.clear();
      await this.context?.trackAddresses(this.addresses.allAddresses);

      this.emit("balance", this.balance);
    });

    this.processor.addEventListener("pending", async (event) => {
      // @ts-ignore
      const utxos = event.data.data.utxoEntries;
      // @ts-ignore
      if (
        utxos.some(
          // @ts-ignore
          (utxo) =>
            utxo.address?.toString() ===
            this.addresses.receiveAddresses[
              this.addresses.receiveAddresses.length - 1
            ]
        )
      ) {
        // TBD: switch to hasAddress
        await this.addresses.increment(1, 0);
      }
    });

    this.processor.addEventListener("balance", () => {
      this.emit("balance", this.balance);
    });
  }

  private listen() {
    SessionStorage.get("session", undefined).then(async (value) => {
      console.log(value);
      if (value) {
        await this.addresses.import(
          PublicKeyGenerator.fromXPub(value.publicKey),
          value.activeAccount
        );
        await this.transactions.import(value.encryptedKey, value.activeAccount);
        await this.processor.start();
      }
    });

    SessionStorage.subscribeChanges(async (key, newValue) => {
      console.log({ key, newValue });

      if (key !== "session") return;

      if (newValue) {
        await this.addresses.import(
          PublicKeyGenerator.fromXPub(newValue.publicKey),
          newValue.activeAccount
        );
        await this.transactions.import(
          newValue.encryptedKey,
          newValue.activeAccount
        );
        await this.processor.start();
      } else {
        this.addresses.reset();
        this.transactions.reset();
        await this.processor.stop();
        await this.context?.clear();
      }

      unstable_batchedUpdates(() => {
        useKaspaStore.getState().setAccount(this);
      });
    });
  }
}
