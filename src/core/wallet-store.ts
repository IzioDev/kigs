import { create } from "zustand";
import { Address, Mnemonic, UtxoEntryReference } from "kaspa-wasm";
import EventEmitter from "eventemitter3";
import {
  AccountServiceEvents,
  AccountService,
} from "./service/account-service";
import { KaspaClient } from "./service/kaspa-client";
import { UnlockedWallet, WalletStorage } from "./utils/wallet-storage";

type WalletState = {
  doesExists: boolean;
  unlockedWallet: UnlockedWallet | null;
  address: Address | null;
  balance: number | null;
  rpcClient: KaspaClient | null;
  isAccountServiceRunning: boolean;
  isAccountServiceReady: boolean;

  // wallet storage
  create: (mnemonic: Mnemonic, password: string) => Promise<void>;
  unlock: (password: string) => Promise<void>;
  lock: () => void;

  // wallet x accounts
  start: (
    rpcClient: KaspaClient,
    unlockedWallet: UnlockedWallet
  ) => Promise<{ receiveAddress: Address }>;
  stop: () => void;

  sendTransaction: (
    address: Address,
    amount: bigint,
    password: string
  ) => Promise<string>;

  getMatureUtxos: () => UtxoEntryReference[];

  /// warning: this will remove all data from the store
  flush: () => void;

  // allow other store to subscribe to account service events
  onAccountServiceEvent: <
    T extends EventEmitter.EventNames<AccountServiceEvents>
  >(
    event: T,
    listener: EventEmitter.EventListener<AccountServiceEvents, T>
  ) => void;
};

type TypedAccountServiceMap<
  T extends EventEmitter.EventNames<AccountServiceEvents>
> = Record<T, EventEmitter.EventListener<AccountServiceEvents, T>[]>;

export const useWalletStore = create<WalletState>((set, g) => {
  const _walletStorage = new WalletStorage();

  let _accountService: AccountService | null = null;

  let _accountServiceRegisteredCallbacks: TypedAccountServiceMap<
    keyof AccountServiceEvents
  > = {
    balance: [],
    ready: [],
  };

  return {
    doesExists: _walletStorage.isInitialized(),
    unlockedWallet: null,
    address: null,
    balance: null,
    rpcClient: null,
    isAccountServiceRunning: false,
    isAccountServiceReady: false,
    create: async (mnemonic: Mnemonic, password: string) => {
      _walletStorage.create(mnemonic, password);
      set({ doesExists: true });
      await g().unlock(password);
    },
    unlock: async (password: string) => {
      const unlockedWallet = await _walletStorage.getDecrypted(password);

      set({ unlockedWallet });
    },
    lock: () => {
      set({ unlockedWallet: null, address: null, balance: null });
    },
    start: async (rpcClient: KaspaClient) => {
      const { unlockedWallet } = g();
      if (!unlockedWallet) {
        throw new Error("Wallet not unlocked");
      }

      _accountService = new AccountService(rpcClient, unlockedWallet);

      // register potentially already registered callbacks
      Object.entries(_accountServiceRegisteredCallbacks).forEach(
        ([event, callbacks]) => {
          callbacks.forEach((callback) => {
            _accountService!.on(event as keyof AccountServiceEvents, callback);
          });
        }
      );

      await _accountService.start();

      _accountService.on("balance", (balance) => {
        set({ balance });
      });

      _accountService.on("ready", () => {
        console.log("Account service ready");
        set({ isAccountServiceReady: true });
      });

      set({
        rpcClient,
        address: _accountService.receiveAddress,
        isAccountServiceRunning: true,
      });

      return { receiveAddress: _accountService.receiveAddress! };
    },
    sendTransaction(toAddress, amount, password) {
      if (!_accountService) {
        throw Error("Account service not initialized.");
      }
      return _accountService.createTransaction(
        { address: toAddress, amount, payload: "" },
        password
      );
    },
    getMatureUtxos() {
      if (!_accountService) {
        throw Error("Account service not initialized.");
      }
      return _accountService.getMatureUtxos();
    },
    stop: () => {
      if (_accountService) {
        _accountService.stop();

        // unregister listeners
        for (const [event, cbs] of Object.entries(
          _accountServiceRegisteredCallbacks
        )) {
          for (const cb of cbs) {
            _accountService.off(event as keyof AccountServiceEvents, cb);
          }
        }
        _accountServiceRegisteredCallbacks = {
          balance: [],
          ready: [],
        };

        _accountService = null;
      }

      set({ rpcClient: null, address: null, isAccountServiceRunning: false });
    },
    flush: () => {
      _walletStorage.reset();
      set({
        doesExists: false,
      });

      g().lock();
    },
    onAccountServiceEvent: (event, callback) => {
      const currentCbs = _accountServiceRegisteredCallbacks[event];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      currentCbs.push(callback);

      if (_accountService) {
        _accountService.on(event, callback);
      }
    },
  };
});
