import { FC } from "react";
import { ModuleTransactionStep1 } from "./module-transaction-step-1";

export const ModuleTransaction: FC = () => {
  return (
    <div className="h-full border-t border-white flex flex-row">
      <div className="py-8 md:py-16 flex justify-center items-center mx-auto">
        <div className="max-w-2xl markdown">
          <h2>Getting Some Kaspa</h2>

          <p>
            Being on the testnet has its perks, and my favorite is getting free
            funds! It's awesome because you can explore Kaspa's features without
            spending a dime.
          </p>
          <h2>Meet the Faucet</h2>

          <div className="py-8">
            <ModuleTransactionStep1 />
          </div>

          <p>
            The Faucet is a community-driven initiative where generous miners on
            the testnet deposit their mining rewards.{" "}
            <a
              href="https://faucet-tn10.kaspanet.io/"
              target="_blank"
              rel="noreferrer"
            >
              Head over to the Faucet
            </a>
            , enter your receive address, and request <code>1,000</code> TKAS.
            Once your wallet detects the incoming transaction, your balance
            should update. Now we can take a closer look at the UTXO.
          </p>

          <h2>What is UTXO composed of?</h2>

          <p>
            I've been throwing around the term UTXO, but don't worry—we'll dive
            into that next!
          </p>

          <p>
            The transaction ID is an unique identifier that helps you track your
            transaction later. The Block DAA score represents the number of
            blocks added to the chain (DAG) before the block containing your
            transaction. Think of it as your ticket number.
          </p>

          <p>
            The DAA score also helps determine if a UTXO is "mature enough" to
            be trusted. A mature UTXO has a DAA score at least 10 points higher
            than the latest integrated block. This is also known as having 10
            confirmations from the network. So, your UTXO is mature because it
            has at least 10 confirmations.
          </p>

          <h2>Kaspa Explorer</h2>

          <p>
            The Kaspa Explorer is yet another community-driven initiative that
            helps discovering the network activity, especially the accepted
            blocks and transactions, it is a very helpful tool to discover, take
            some times and familiar yourself with it.
          </p>

          <p>
            From there, you should notice that in order to Kaspa Network to
            process the transaction, the sender paid a fee (known as gas fee),
            this will be sent to the miner that included your transaction in the
            block they found, as a small reward.
          </p>

          <h2>Take a Breather</h2>

          <p>
            That's a lot to take in, right? Grab a snack, stretch your legs, and
            get ready—we're about to dive deep into UTXOs!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModuleTransaction;
