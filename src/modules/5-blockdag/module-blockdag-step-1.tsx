import { FC, useEffect, useState } from "react";
import { BasicFlow } from "../../core/containers/BasicFlow";
import { Edge, Node } from "@xyflow/react";
import { useWindowSize } from "../../core/hooks/use-window-size";

type ModuleBlockDagStep1Props = {};

const initialNodes: Node[] = [
  {
    id: "a",
    data: {
      label: "A",
    },
    type: "kaspaBlock",
    position: { x: 0, y: 0 },
  },
  {
    id: "b",
    data: {
      label: "B",
    },
    type: "kaspaBlock",
    position: { x: 0, y: 0 },
  },
  {
    id: "c",
    data: {
      label: "C",
    },
    type: "kaspaBlock",
    position: { x: 0, y: 0 },
  },
  {
    id: "d",
    data: {
      label: "D",
    },
    type: "kaspaBlock",
    position: { x: 0, y: 0 },
  },
];

const initialEdges: Edge[] = [
  { id: "a-b", source: "b", target: "a", animated: true },
  { id: "a-c", source: "c", target: "a", animated: true },
  { id: "b-d", source: "d", target: "b", animated: true },
];

const freshlyMinedExampleNodes: Node[] = [
  ...initialNodes,
  {
    id: "e",
    data: {
      label: "E",
      isFuture: true,
    },
    type: "kaspaBlock",
    position: { x: 0, y: 0 },
  },
];

const freshlyMinedExampleEdges: Edge[] = [
  ...initialEdges,
  { id: "e-d", source: "e", target: "d", animated: true },
  { id: "e-c", source: "e", target: "c", animated: true },
];

export const ModuleBlockDagStep1: FC<ModuleBlockDagStep1Props> = ({}) => {
  const [w, h] = useWindowSize();

  const [seps, setSeps] = useState<{ node: number; edgesep: number }>({
    node: 110,
    edgesep: 230,
  });

  useEffect(() => {
    if (h <= 1280) {
      setSeps({ node: 120, edgesep: 120 });
    }
  }, [h]);

  return (
    <BasicFlow
      options={{
        layout: {
          nodesep: seps.node,
          edgesep: seps.edgesep,
          ranksep: 220,
          direction: "LR",
        },
      }}
      initialEdges={initialEdges}
      initialNodes={initialNodes}
    />
  );
};
