import { create } from "zustand";
import { KaspaClient } from "./service/kaspa-client";

interface KaspaState {
  kaspaClientInstance: KaspaClient;
  isConnected: boolean;
  init: () => Promise<void>;
  clear: () => Promise<void>;
}

export const useKaspaStore = create<KaspaState>((set, g) => {
  const kaspaClientInstance = new KaspaClient("testnet-10");

  return {
    kaspaClientInstance,
    isConnected: false,
    async init() {
      await g().kaspaClientInstance.connect();

      set({ isConnected: true });
    },
    async clear() {
      await g().kaspaClientInstance.disconnect();
    },
  };
});
