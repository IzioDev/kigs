import { FC } from "react";
import { ModuleUtxoStep1 } from "./module-utxo-step-1";
import { ModuleUtxoStep2 } from "./module-utxo-step-2";

export const ModuleUtxo: FC = () => {
  return (
    <div className="h-full flex flex-row">
      <div className="py-8 md:py-16 flex justify-center items-center mx-auto">
        <div className="max-w-2xl markdown">
          <h2>Unspent Transaction Output (UTXO)</h2>

          <p>
            Kaspa uses a UTXO-based model for accounting. Think of it like
            handling cash: you give the cashier $20, and they hand you back two
            $10 bills. Your original $20 has now transformed into two shiny new
            $10 outputs, both unspent and ready for action!
          </p>

          <div className="h-[18rem]">
            <ModuleUtxoStep1 />
          </div>

          <h2>Calculating Wallet Balance</h2>

          <p>
            Your wallet balance is the sum of all unspent transaction outputs
            (UTXOs) assigned to your address—like counting coins in a piggy
            bank!
          </p>

          <p>
            Network nodes (computers) can track every every UTXO, so your wallet
            connects to a node to retrieve the list of your UTXO and calculates
            your balance from them.
          </p>

          <h2>What's a Kaspa Transaction?</h2>

          <p>
            A Kaspa transaction is like a magical mix of one or more UTXO inputs
            and one or more UTXO outputs. Imagine you're at a store, and you
            hand over four $5 bills to the cashier to buy a $15 item. Those are
            your UTXO inputs. In return, the cashier gives you one $5 bill—it is
            your UTXO output. Magic!
          </p>

          <div className="h-[28rem]">
            <ModuleUtxoStep2 />
          </div>

          <h2>Transaction Storage Mass</h2>

          <p>
            Each transaction has a <code>storage mass</code> calculated using
            the{" "}
            <a href="https://github.com/kaspanet/kips/blob/master/kip-0009.md">
              KIP-9
            </a>{" "}
            algorithm. We won't dive into the nitty-gritty details, but just
            know there's a limit to how many UTXO inputs and outputs can fit
            into a single transaction. The storage mass limit is{" "}
            <code>100k grams</code> on Kaspa.
          </p>

          <h2>Transaction UTXO limit</h2>

          <p>
            While it's theoretically possible to have an infinite number of
            UTXOs on a wallet address, it's not very practical and even might
            not work for some use-cases.
          </p>

          <p>
            Let's say you have 100 UTXOs of 1 Kaspa each, and you want to send
            them all to your friend Bob. As is, you cannot do it, as this would
            break storage mass limit rule.
          </p>

          <h2>Compounding to the rescue</h2>

          <p>You'll need to break it down into three transactions:</p>

          <ol>
            <li>
              <strong>First Transaction:</strong> 50 inputs of 1 Kaspa each,
              resulting in 1 output of 50 Kaspa back to you.
            </li>
            <li>
              <strong>Second Transaction:</strong> Another 50 inputs of 1 Kaspa
              each, resulting in 1 output of 50 Kaspa back to you.
            </li>
            <li>
              <strong>Final Transaction:</strong> 1 input of 100 Kaspa, with 1
              output sent to Bob.
            </li>
          </ol>

          <p>
            Transactions 1 and 2 are called compounding transactions. They help
            "compress" your UTXOs, making the final transaction possible. Think
            of it like a suitcase: you can’t stuff infinite clothes into it!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModuleUtxo;
