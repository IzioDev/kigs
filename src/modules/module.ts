import ModuleNetwork from "./1-network/ModuleNetwork";
import ModuleWallet from "./2-wallet/ModuleWallet";
import ModuleTransaction from "./3-transaction/ModuleTransaction";
import ModuleUtxo from "./4-utxo/ModuleUtxo";
import ModuleBlockDag from "./5-blockdag/ModuleBlockDag";
import EmptyModule from "./empty-module";

export type Module = {
  title: string;
  description: string;
  component: React.FC;
  path: string;
};

export const modules: Module[] = [
  {
    title: "Network",
    description:
      "What is a network in the context of Kaspa. You'll learn about nodes, decentralization and connectivity.",
    component:  ModuleNetwork,
    path: "network",
  },
  {
    title: "Wallet",
    description:
      "Learn about wallets, cold vs hot, what they are, how they interract with the network, and your first Kaspa receive address!",
    component: ModuleWallet,
    path: "wallet",
  },
  {
    title: "Transaction",
    description:
      "Get your first transaction, and inspect what it's composed of. Finally see it on the Kaspa Explorer.",
    component: ModuleTransaction,
    path: "transaction",
  },
  {
    title: "UTXO",
    description:
      "Unspent Transaction are essensial to all transactions circulating on the Kaspa Network. They also have participate in transaction mass, that cannot be exceeded",
    component: ModuleUtxo,
    path: "utxo",
  },
  {
    title: "BlockDAG & Mining",
    description:
      "We start with a simple BlockDAG introduction and try to mention some of the GhostDAG protocol specificies the most simple way.",
    component: ModuleBlockDag,
    path: "blockdag",
  },
  {
    title: "MultiSig Wallet",
    description: "WIP",
    component: EmptyModule,
    path: "multisig-wallet",
  },
  {
    title: "Accounts",
    description: "WIP - multi receive addresses, change address,",
    component: EmptyModule,
    path: "accounts",
  },
  {
    title: "Transaction Payload",
    description: "WIP",
    component: EmptyModule,
    path: "transaction-payload",
  },
];
