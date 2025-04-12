import { FC } from "react";
import { ModuleNetworkStep1Canvas } from "./module-network-step-1";
import { ModuleNetworkStep2 } from "./module-network-step-2";

export const ModuleNetwork: FC = () => {
  return (
    <div className="h-full flex flex-row">
      <div className="py-8 md:py-16 flex justify-center items-center mx-auto">
        <div className="max-w-2xl markdown">
          <h2>Decentralized Network</h2>

          <p>
            Welcome to the wild and wonderful world of Kaspa! Imagine Kaspa
            Network as a massive, interconnected web of{" "}
            <strong>decentralized </strong>
            <a href="https://nodes.com/" target="_blank" rel="noreferrer">
              nodes
            </a>
            —and guess who runs these nodes? People like you and me!
          </p>
          <p>
            These nodes are the superheroes of the Kaspa universe. They accept
            blocks and transactions, store them safely, and serve data to all
            sorts of client applications. Pretty cool, right?
          </p>

          <div className="h-[36rem]">
            <ModuleNetworkStep1Canvas />
          </div>
          <p>
            But here's where it gets even better: the Kaspa Network is
            <strong> permissionless</strong>. That means{" "}
            <strong>anyone </strong>
            can query it. So, if you've got a brilliant idea and want to build
            something on top of Kaspa, go for it! No one can stop you. Now,
            before you dive in and connect to a Node from the Network, there's
            something you should know. There are multiple networks running:
          </p>
          <ul>
            <li>
              <strong>Mainnet</strong>: Think of this as the 'real deal,' the
              production network that we all use.
            </li>
            <li>
              <strong>TestNet</strong>: These are like the rehearsal stages,
              multiple parallel test networks where you can experiment and test
              out Kaspa without any risks.
            </li>
          </ul>
          <p>
            So, are you ready to join the Kaspa adventure? Let's get started!
          </p>

          <h2>The Start of a Relationship</h2>

          <p>
            Alright, let's dive in! Kick things off by clicking that shiny
            "connect" button. This will send a friendly request to a public
            Kaspa node, your new best friend in the blockDAG world.
          </p>

          <div className="py-6 2xl:py-12">
            <ModuleNetworkStep2 />
          </div>

          <p>
            Once you're connected, it's time to get acquainted with your peer!
            Don't be shy, make it talk.
          </p>

          <p>
            Now, let's make sure the node you're connected to is all synced up.
            We want it to be ready to serve us the freshest, most complete info
            out there. (More on that later!)
          </p>

          <p>
            Oh, and before we forget, let's chat about the Mempool. Think of it
            as a cozy waiting room where submitted transactions hang out until
            our awesome miners pick them up and include them in the next
            block(s).
          </p>

          <p>
            Fun fact: Kaspa is designed to pump out 10 blocks per second! We say
            "designed" because it cleverly adjusts the mining difficulty. If
            miners take a coffee break, Kaspa makes it easier for the remaining
            miners to keep the block party going. The goal? Keep that block rate
            humming along at 10 per second.
          </p>

          <p>
            But wait, something's not adding up, right? Did you notice the block
            count? With Kaspa cranking out 10 blocks per second, a little math
            should tell you this node doesn't have much history. You're right!
            It should have about 30 hours' worth. Unlike other "chains," a
            default Kaspa node runs as a pruned node. Don't worry, it's still
            fully capable! Instead of storing terrabytes of data forever, it
            uses a smart pruning algorithm. In a nutshell, after some time, it
            compacts all that extra history (anything over 30 hours) and creates
            a proof. This way, our nodes can still verify the past without
            needing to remember every little detail.
          </p>

          <p>
            If you run a node, you'll love this feature. True decentralization
            means being able to run a Kaspa node on regular consumer-grade
            hardware. Isn't that awesome?
          </p>

          <p>
            Now that you found and connected to a node, it's time for me to help
            you create your first Kaspa Wallet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModuleNetwork;
