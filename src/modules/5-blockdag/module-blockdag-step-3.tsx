import { FC, useEffect, useState } from "react";
import { BasicFlow } from "../../core/containers/BasicFlow";
import { Edge, Node } from "@xyflow/react";
import { useWindowSize } from "../../core/hooks/use-window-size";
import { KaspaBlockCustomNode } from "../../core/components/KaspaBlockCustomNode";

type ModuleBlockDagStep2Props = {};

const initialNodes: KaspaBlockCustomNode[] = [
  {
    id: "a",
    data: {
      label: "A",
      isBlue: true,
    },
    type: "kaspaBlock",
    position: { x: 0, y: 0 },
  },
  {
    id: "b",
    data: {
      label: "B",
      isBlue: true,
    },
    type: "kaspaBlock",
    position: { x: 0, y: 0 },
  },
  {
    id: "c",
    data: {
      label: "C",
      isRed: true,
    },
    type: "kaspaBlock",
    position: { x: 0, y: 0 },
  },
  {
    id: "d",
    data: {
      label: "D",
      isBlue: true,
    },
    type: "kaspaBlock",
    position: { x: 0, y: 0 },
  },
  {
    id: "e",
    data: {
      label: "E",
      isBlue: true,
    },
    type: "kaspaBlock",
    position: { x: 0, y: 0 },
  },
  {
    id: "f",
    data: {
      label: "F",
    },
    type: "kaspaBlock",
    position: { x: 0, y: 0 },
  },
  {
    id: "g",
    data: {
      label: "G",
    },
    type: "kaspaBlock",
    position: { x: 0, y: 0 },
  },
];

const initialEdges: Edge[] = [
  { id: "a-b", source: "b", target: "a", animated: true },
  { id: "a-c", source: "c", target: "a", animated: true },
  { id: "b-d", source: "d", target: "b", animated: true },
  { id: "e-b", source: "e", target: "b", animated: true },
  { id: "f-d", source: "f", target: "d", animated: true },
  {
    id: "f-e",
    source: "f",
    target: "e",
    animated: true,
  },
  { id: "g-c", source: "g", target: "c", animated: true },
  { id: "f-v", source: "v", target: "f", animated: true },
];

const freshlyMinedExampleNodes: Node[] = [
  ...initialNodes,
  {
    id: "v",
    data: {
      label: "V",
      isFuture: true,
    },
    type: "kaspaBlock",
    position: { x: 0, y: 0 },
  },
].map((n) => {
  const conds = [n.id === "f", n.id === "e", n.id === "b", n.id === "a"];

  if (conds.some(Boolean)) {
    return {
      ...n,
      data: {
        ...n.data,
        isSelected: true,
      },
    };
  }

  return n;
});

const freshlyMinedExampleEdges: Edge[] = [...initialEdges].map((e) => {
  const conds = [
    e.source === "f" && e.target === "e",
    e.source === "e",
    e.source === "b",
    e.source === "v",
  ];

  if (conds.some(Boolean)) {
    return {
      ...e,
      style: {
        stroke: "#00ff40",
      },
    };
  }

  return e;
});

export const ModuleBlockDagStep3: FC<ModuleBlockDagStep2Props> = ({}) => {
  const [w, h] = useWindowSize();

  const [seps, setSeps] = useState<{ node: number }>({ node: 110 });

  useEffect(() => {
    if (h <= 1280) {
      setSeps({ node: 180 });
    }
  }, [h]);

  return (
    <BasicFlow
      options={{ layout: { ranksep: 160, nodesep: seps.node } }}
      initialEdges={initialEdges}
      initialNodes={initialNodes}
    />
  );
};
