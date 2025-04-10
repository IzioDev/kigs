export const modules = [
  {
    title: "Network",
    description:
      "What is a network in the context of Kaspa. You'll learn about nodes, decentralization and connectivity.",
    component: () => import("./1-network/ModuleNetwork"),
    path: "network",
  },
  {
    title: "Wallet",
    description:
      "Learn about wallets, cold vs hot, what they are, how they interract with the network, and your first Kaspa receive address!",
    component: () => import("./2-wallet/ModuleWallet"),
    path: "wallet",
  },
  {
    title: "Transaction",
    description:
      "Get your first transaction, and inspect what it's composed of. Finally see it on the Kaspa Explorer.",
    component: () => import("./3-transaction/ModuleTransaction"),
    path: "transaction",
  },
  {
    title: "UTXO",
    description:
      "Unspent Transaction are essensial to all transactions circulating on the Kaspa Network. They also have participate in transaction mass, that cannot be exceeded",
    component: () => import("./4-utxo/ModuleUtxo"),
    path: "utxo",
  },
  {
    title: "BlockDAG & Mining",
    description:
      "We start with a simple BlockDAG introduction and try to mention some of the GhostDAG protocol specificies the most simple way.",
    component: () => import("./5-blockdag/ModuleBlockDag"),
    path: "blockdag",
  },
  {
    title: "MultiSig Wallet",
    description: "WIP",
    component: () => import("./empty-module"),
    path: "multisig-wallet",
  },
  {
    title: "Accounts",
    description: "WIP - multi receive addresses, change address,",
    component: () => import("./empty-module"),
    path: "accounts",
  },
  {
    title: "Transaction Payload",
    description: "WIP",
    component: () => import("./empty-module"),
    path: "transaction-payload",
  },
];
