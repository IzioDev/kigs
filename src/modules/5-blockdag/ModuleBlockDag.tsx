import { FC } from "react";
import { ModuleBlockDagStep1 } from "./module-blockdag-step-1";
import { ModuleBlockDagStep2 } from "./module-blockdag-step-2";
import { ModuleBlockDagStep3 } from "./module-blockdag-step-3";
import { ModuleBlockDagStep4 } from "./module-blockdag-step-4";

export const ModuleBlockDag: FC = () => {
  return (
    <div className="h-full flex flex-row">
      <div className="py-8 md:py-16 flex justify-center items-center mx-auto">
        <div className="max-w-2xl markdown">
          <h2>BlockDAG and Mining</h2>

          <p>
            DAG stands for Block Directed Acyclic Graph. Unlike a traditional
            chain where each element points to a single predecessor, a DAG is
            more flexible. It allows elements to point to multiple predecessors,
            enabling the creation of parallel blocks, hence the acceptance of
            "orphan blocks." Think of it as a family tree where everyone can
            have multiple parents!
          </p>

          <h3>BlockDAG Example</h3>

          <div className="h-[24rem]">
            <ModuleBlockDagStep1 />
          </div>

          <ul>
            <li>
              <strong>A (Genesis):</strong> The origin of all blocks, the
              grandparent of the DAG.
            </li>
            <li>
              <strong>B and C:</strong> Parallel blocks, like siblings born at
              the same time.
            </li>
            <li>
              <strong>D and C:</strong>
              The leafs or tips, the youngest members who aren't referenced by
              any other blocks yet.
            </li>
          </ul>

          <h3>Block Creation</h3>

          <div className="h-[18rem]">
            <ModuleBlockDagStep2 />
          </div>

          <p>
            Miners compete to find a block by solving a challenge that requires
            brute-forcing combinations until one works. It's like a high-stakes
            guessing game where the odds are adjusted to keep winning
            occurrences stable (<code>n</code> per seconds), as mentioned in
            Module 1.
          </p>

          <p>
            When a miner wins, they reference the current tips (leafs) of the
            DAG. The more accurate their references, the higher their chances of
            getting rewarded. The network broadcasts these tips to miners, but
            sometimes network delays occur and miner might miss a tip or two.
          </p>

          <h3>Blue Team vs. Red Team</h3>

          <ul>
            <li>
              <strong>Blue Blocks:</strong> Honest blocks recognized by the
              network nodes. They're part of the larger, highly connected set of
              blocks.
            </li>
            <li>
              <strong>Red Blocks:</strong>Dishonest blocks that aren't part of
              the highly connected set.
            </li>
          </ul>

          <div className="h-[18rem]">
            <ModuleBlockDagStep3 />
          </div>

          <p>
            Since a block's honesty can't be determined at creation, all blocks
            are added to the DAG. Their color is decided after at least one
            block reference them.
          </p>

          <h2>Virtual Chain & Ordering</h2>

          <p>
            Within the DAG, there's a "selected chain" where certain blocks take
            precedence over their parallel counterparts. This forms the Virtual
            Block Chain.
          </p>
          <p>To build this chain, imagine you're a time-traveling observer:</p>

          <ol>
            <li>
              <strong>Start at the Future:</strong>Look at all current leafs and
              pick the one with the highest amount of blue work. This is your
              first selected parent.
            </li>
            <li>
              <strong>Jump to the Past:</strong>Move to this block and examine
              its parents. Again, choose the one with the highest amount of blue
              work.
            </li>
            <li>
              <strong>Repeat:</strong>Keep doing this, and voilà! You've created
              the Virtual Chain.
            </li>
          </ol>

          <div className="h-[20rem]">
            <ModuleBlockDagStep4 />
          </div>

          <p>
            The first few blocks in this chain are selected with low confidence.
            If you wait a second and rebuild the chain, the path might change.
          </p>

          <h3>Reorganizations (Reorgs)</h3>
          <p>
            Near the tip of the DAG, when the path changes between two Virtual
            Chain calculations, it's called a reorganization. This is why we
            wait for confirmations to trust a transaction. The more
            confirmations, the more confident we are.
          </p>

          <p>
            <strong>Rule of Thumb for Confirmations:</strong>
          </p>
          <ul>
            <li>
              <strong>Highly Sensitive Transactions:</strong> Aim for 50
              confirmations.
            </li>
            <li>
              <strong>Day-to-Day Transactions:</strong> 10 confirmations should
              do the trick.
            </li>
          </ul>

          <h3>Mining Rewards</h3>
          <p>
            Above, we stated that the more a miner reference current leafs, the
            higher their chances of getting rewarded. Can you try to guess why?
          </p>

          <p>
            A miner that refuse to reference some of the leaf has higher chance
            of being part of a red set, hence, not getting rewarded by the
            Network. They are incentivize to reference all of the leafs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModuleBlockDag;
