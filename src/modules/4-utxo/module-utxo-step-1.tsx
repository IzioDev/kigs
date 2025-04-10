import { FC, useEffect, useState } from "react";
import { BasicFlow } from "../../core/containers/BasicFlow";
import { Edge, Node } from "@xyflow/react";
import { useWindowSize } from "../../core/hooks/use-window-size";

type ModuleUtxoStep1Props = {};

const initialNodes: Node[] = [
  {
    id: "i",
    data: {
      label: "Input",
      address: "kaspa:your_address",
      amount: 20,
    },
    type: "kaspaUtxo",
    position: { x: 0, y: 0 },
  },
  {
    id: "o1",
    data: {
      label: "Output #1",
      address: "kaspa:your_address",
      amount: 10,
    },
    type: "kaspaUtxo",
    position: { x: 100, y: 0 },
  },
  {
    id: "o2",
    data: {
      label: "Output #2",
      address: "kaspa:cashier_address",
      amount: 10,
    },
    type: "kaspaUtxo",
    position: { x: 200, y: 0 },
  },
];
const initialEdges: Edge[] = [
  { id: "i-o1", source: "i", target: "o1", animated: true },
  { id: "i-o2", source: "i", target: "o2", animated: true },
];

export const ModuleUtxoStep1: FC<ModuleUtxoStep1Props> = ({}) => {
  const [w, h] = useWindowSize();

  const [seps, setSeps] = useState<{ node: number }>({ node: 110 });

  useEffect(() => {
    if (h <= 1280) {
      setSeps({ node: 180 });
    }
  }, [h]);

  return (
    <BasicFlow
      options={{ layout: { ranksep: 230, nodesep: seps.node } }}
      initialEdges={initialEdges}
      initialNodes={initialNodes}
    />
  );
};
