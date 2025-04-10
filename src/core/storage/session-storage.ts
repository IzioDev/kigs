import Storage from "./storage";

export interface ISession {
  activeAccount: number;
  publicKey: string;
  encryptedKey: string;
}

export interface ISessionStorage {
  session: ISession | undefined;
}

export default new (class SessionStorage extends Storage<ISessionStorage> {
  storage = window.sessionStorage;

  async get<key extends "session">(
    key: key,
    defaultValue: ISessionStorage[key]
  ): Promise<ISessionStorage[key]> {
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

  async set<key extends "session">(
    key: key,
    value: ISessionStorage[key]
  ): Promise<void> {
    const oldValue = this.storage.getItem(key);
    await this.storage.setItem(key, JSON.stringify(value));
    this.emit("storage:changed", { key, newValue: value, oldValue });
  }
})();
