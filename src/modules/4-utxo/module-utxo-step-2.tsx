import { FC, useEffect, useState } from "react";
import { BasicFlow } from "../../core/containers/BasicFlow";
import { Edge, Node } from "@xyflow/react";
import { useWindowSize } from "../../core/hooks/use-window-size";

type ModuleUtxoStep1Props = {};

const initialNodes: Node[] = [
  {
    id: "i1",
    data: {
      label: "Input #1",
      address: "kaspa:your_address",
      amount: 5,
    },
    type: "kaspaUtxo",
    position: { x: 0, y: 0 },
  },
  {
    id: "i2",
    data: {
      label: "Input #2",
      address: "kaspa:your_address",
      amount: 5,
    },
    type: "kaspaUtxo",
    position: { x: 0, y: 0 },
  },
  {
    id: "i3",
    data: {
      label: "Input #4",
      address: "kaspa:your_address",
      amount: 5,
    },
    type: "kaspaUtxo",
    position: { x: 0, y: 0 },
  },
  {
    id: "i4",
    data: {
      label: "Input #4",
      address: "kaspa:your_address",
      amount: 5,
    },
    type: "kaspaUtxo",
    position: { x: 0, y: 0 },
  },
  {
    id: "o1",
    data: {
      label: "Output #1",
      address: "kaspa:your_address",
      amount: 5,
    },
    type: "kaspaUtxo",
    position: { x: 100, y: 0 },
  },
  {
    id: "o2",
    data: {
      label: "Output #2",
      address: "kaspa:cashier_address",
      amount: 15,
    },
    type: "kaspaUtxo",
    position: { x: 200, y: 0 },
  },
];
const initialEdges: Edge[] = [
  { id: "i1-o1", source: "i1", target: "o1", animated: true },
  { id: "i2-o1", source: "i2", target: "o1", animated: true },
  { id: "i3-o2", source: "i3", target: "o2", animated: true },
  { id: "i4-o2", source: "i4", target: "o2", animated: true },
];

export const ModuleUtxoStep2: FC<ModuleUtxoStep1Props> = ({}) => {
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
