import EventEmitter from "eventemitter3";

export default abstract class AbstractStorage<
  IStorage extends Record<string, any> = Record<string, any>
> extends EventEmitter {
  abstract storage: Storage;

  abstract get<key extends keyof IStorage>(
    key: key,
    defaultValue: IStorage[key]
  ): Promise<IStorage[key]>;

  abstract set<key extends keyof IStorage>(
    key: key,
    value: IStorage[key]
  ): Promise<void>;

  async remove<key extends keyof IStorage>(key: key): Promise<void> {
    const oldValue = this.storage.getItem(key as string);
    await this.storage.removeItem(key as string);

    this.emit("storage:changed", { key, newValue: null, oldValue });
  }

  async clear(): Promise<void> {
    await this.storage.clear();
  }

  async getAll(): Promise<IStorage> {
    const result = await this.storage.get(null);
    return Object.fromEntries(
      Object.entries(result).map(([key, value]) => [
        key,
        // @TODO: shouldn't need to type cast here
        JSON.parse(value as string),
      ])
    ) as IStorage;
  }

  subscribeChanges<key extends keyof IStorage>(
    callback: (
      key: key,
      newValue: IStorage[key] | undefined,
      oldValue: IStorage[key] | undefined
    ) => void
  ): void {
    this.addListener("storage:changed", ({ key, newValue, oldValue }) => {
      callback(
        // @ts-ignore
        key as string,
        newValue ? newValue : undefined,
        oldValue ? oldValue : undefined
      );
    });
  }
}
