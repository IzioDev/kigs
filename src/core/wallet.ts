import { EventEmitter } from "eventemitter3";
import LocalStorage from "./storage/local-storage";
import SessionStorage from "./storage/session-storage";
import {
  Mnemonic,
  encryptXChaCha20Poly1305,
  XPrv,
  PublicKeyGenerator,
  decryptXChaCha20Poly1305,
} from "kaspa-wasm";
import { unstable_batchedUpdates } from "react-dom";
import { useKaspaStore } from "./kaspa-store";

export enum Status {
  Uninitialized = "UNINITIALIZED",
  Locked = "LOCKED",
  Unlocked = "UNLOCKED",
}

export default class Wallet extends EventEmitter {
  status: Status = Status.Uninitialized;

  constructor(readyCallback: () => void) {
    super();

    this.sync().then(() => readyCallback());
    this.listen();
  }

  private async sync() {
    const wallet = await LocalStorage.get("wallet", undefined);

    if (!wallet) {
      this.status = Status.Uninitialized;
    } else {
      const session = await SessionStorage.get("session", undefined);

      this.status = session ? Status.Unlocked : Status.Locked;
    }
  }

  async create(password: string) {
    const { phrase } = Mnemonic.random(24);
    await this.import(phrase, password);

    return phrase;
  }

  async import(mnemonic: string, password: string) {
    if (!Mnemonic.validate(mnemonic)) throw Error("Invalid mnemonic");

    await LocalStorage.set("wallet", {
      encryptedKey: encryptXChaCha20Poly1305(mnemonic, password),
      accounts: [
        {
          name: "Wallet",
          receiveCount: 1,
          changeCount: 1,
        },
      ],
    });

    await this.unlock(0, password);
  }

  async unlock(id: number, password: string) {
    const mnemonic = new Mnemonic(await this.export(password));
    const extendedKey = new XPrv(mnemonic.toSeed());
    const publicKey = await PublicKeyGenerator.fromMasterXPrv(
      extendedKey,
      false,
      BigInt(id)
    );

    await SessionStorage.set("session", {
      activeAccount: id,
      publicKey: publicKey.toString(),
      encryptedKey: encryptXChaCha20Poly1305(extendedKey.toString(), password),
    });
  }

  async export(password: string) {
    const wallet = await LocalStorage.get("wallet", undefined);

    if (!wallet) throw Error("Wallet is not initialized");

    return decryptXChaCha20Poly1305(wallet.encryptedKey, password);
  }

  async lock() {
    await SessionStorage.remove("session");
  }

  async reset() {
    await SessionStorage.clear();
    await LocalStorage.remove("wallet");
  }

  private listen() {
    SessionStorage.subscribeChanges(async (key, newValue) => {
      console.log(newValue, key);
      if (key !== "session") return;

      this.status = newValue ? Status.Unlocked : Status.Locked;
      unstable_batchedUpdates(() => {
        useKaspaStore.getState().setWalletStorage(this);
      });
      this.emit("status", this.status);
    });

    LocalStorage.subscribeChanges(async (key, newValue) => {
      console.log(newValue, key);
      if (key !== "wallet") return;

      this.status = newValue ? Status.Unlocked : Status.Uninitialized;
      unstable_batchedUpdates(() => {
        useKaspaStore.getState().setWalletStorage(this);
      });
      console.log({ status: this.status });
      this.emit("status", this.status);
    });
  }
}
