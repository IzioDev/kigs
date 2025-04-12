import { FC } from "react";

import { ModuleWalletStep1 } from "./module-wallet-step-1";

export const ModuleWallet: FC = () => {
  return (
    <div className="h-full flex flex-row">
      <div className="py-8 md:py-16 flex justify-center items-center mx-auto">
        <div className="max-w-2xl markdown">
          <h2>Warning</h2>

          <p>
            Heads up! Everything you create on this application is for learning
            purposes only. Please don't use it for personal transactions.
          </p>
          <h2>Your First Wallet</h2>
          <p>
            Exciting times ahead! You're about to create your very first wallet.
            At its core, a wallet is essentially a 12-word or 24-word mnemonic,
            also known as a seed phrase. Think of it as the master key to your
            crypto kingdom.
          </p>

          <p>
            <strong>Important:</strong> Keep this mnemonic safe! If someone else
            gets their hands on it, they can access (and potentially steal) all
            your funds.
          </p>

          <p>
            Once you've created your wallet, jot down that mnemonic and store it
            somewhere secure. You'll need it to import your wallet later if
            necessary.
          </p>
          <div className="py-8">
            <ModuleWalletStep1 />
          </div>

          <h2>Hot vs. Cold Wallets</h2>

          <p>There are two types of wallets: hot and cold.</p>

          <ul>
            <li>
              <strong>Hot Wallet:</strong> That's me! I store your keys, making
              it super convenient for quick access. However, this convenience
              comes with a trade-off—it's less secure than a cold wallet.
            </li>
            <li>
              <strong>Cold Wallet:</strong>Often referred to as a hardware
              wallet, a cold wallet stays offline. It's the safer option since
              it's not connected to the internet.
            </li>
          </ul>

          <h2>Your Receive Address</h2>

          <p>
            You should now see your receive address. Notice that we didn't
            connect to a node for these operations. That means no one else knows
            about your wallet creation yet—it's just between you and me.
          </p>

          <h2>Checking Your Balance</h2>

          <p>
            Let's see how much you've got! To check your balance, we'll need to
            connect to a node. Nodes keep track of your receive address's
            current state (UTXO—more on that later). Time to fill it, right?
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModuleWallet;
