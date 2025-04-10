import { create } from "zustand";
import { Encoding, NetworkId, Resolver, RpcClient } from "kaspa-wasm";
import Wallet from "./wallet";
import Account from "./account";
import Node from "./node";

interface KaspaState {
  kaspaClient: RpcClient;
  walletStorage: Wallet;
  node: Node;
  account: Account;
  init: () => Promise<void>;
  clear: () => Promise<void>;
  setWalletStorage: (w: Wallet) => void;
  setAccount: (a: Account) => void;
}

export const useKaspaStore = create<KaspaState>((set, g) => {
  const kaspaClient = new RpcClient({
    resolver: new Resolver(),
    networkId: new NetworkId("testnet-10"),
    encoding: Encoding.Borsh,
  });

  const node = new Node(kaspaClient);
  const account = new Account(node);

  return {
    kaspaClient,
    walletStorage: new Wallet(() => void 0),
    account: account,
    node: node,
    async init() {
      return new Promise(async (res, rej) => {
        const client = g().kaspaClient;

        if (!client.isConnected) {
          await client.connect({ blockAsyncConnect: true });
        }

        res();
      });
    },
    async clear() {
      await g().kaspaClient.disconnect();
    },
    async getWalletStatus() {
      return g().walletStorage.status;
    },
    setWalletStorage(w: Wallet) {
      set({ walletStorage: w });
    },
    setAccount(a: Account) {
      set({ account: a });
    },
  };
});
