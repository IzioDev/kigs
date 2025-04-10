import Storage from "./storage";

export interface IWallet {
  encryptedKey: string;
  accounts: IAccount[];
}

export interface IAccount {
  name: string;
  receiveCount: number;
  changeCount: number;
}

export interface ILocalStorage {
  wallet: IWallet | undefined;
}

export default new (class LocalStorage extends Storage<ILocalStorage> {
  storage = window.localStorage;

  async get<key extends "wallet">(
    key: key,
    defaultValue: ILocalStorage[key]
  ): Promise<ILocalStorage[key]> {
    if (typeof key !== "string") throw new Error("key must be a string");
    try {
      const result = await this.storage.getItem(key as string);

      if (!result) {
        return defaultValue;
      }

      return JSON.parse(result);
    } catch (err) {
      return defaultValue;
    }
  }

  async set<key extends "wallet">(
    key: key,
    value: ILocalStorage[key]
  ): Promise<void> {
    const oldValue = this.storage.getItem(key);
    await this.storage.setItem(key, JSON.stringify(value));
    this.emit("storage:changed", { key, newValue: value, oldValue });
  }
})();
