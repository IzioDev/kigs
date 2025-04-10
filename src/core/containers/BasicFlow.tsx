import {
  useReactFlow,
  useNodesState,
  useEdgesState,
  ReactFlow,
  Edge,
  Node,
  ReactFlowProvider,
} from "@xyflow/react";
import { FC, useEffect } from "react";
import { KaspaNodeCustomNode } from "../components/KaspaNodeCustomNode";
import { useWindowSize } from "../hooks/use-window-size";
import Dagre from "@dagrejs/dagre";
import { KaspaUtxoCustomNode } from "../components/KaspaUtxoCustomNode";
import { KaspaBlockCustomNode } from "../components/KaspaBlockCustomNode";

export type BasicFlowOption = {
  layout?: {
    ranksep?: number;
    nodesep?: number;
    edgesep?: number;
    direction?: "TB" | "BT" | "LR" | "RL";
  };
};

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  options: BasicFlowOption
) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: options?.layout?.direction ?? "LR",
    ranksep: options?.layout?.ranksep ?? 50,
    nodesep: options?.layout?.nodesep ?? 70,
    edgesep: options?.layout?.edgesep ?? 70,
  });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => {
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    });
  });

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const nodeTypes = {
  kaspaNode: KaspaNodeCustomNode,
  kaspaUtxo: KaspaUtxoCustomNode,
  kaspaBlock: KaspaBlockCustomNode,
};

const BasicFlowInner: FC<{
  initialEdges: Edge[];
  initialNodes: Node[];
  options?: BasicFlowOption;
}> = ({ initialEdges, initialNodes, options }) => {
  const { fitView } = useReactFlow();

  const [w, h] = useWindowSize();

  const layouted = getLayoutedElements(initialNodes, initialEdges, {
    ...(options ?? {}),
  });

  const [nodes, setNodes, onNodesChange] = useNodesState([...layouted.nodes]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([...layouted.edges]);

  useEffect(() => {
    fitView({ maxZoom: 2 });
  }, [w, h]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      fitViewOptions={{ maxZoom: 2 }}
      edgesFocusable={false}
      nodesDraggable={false}
      nodesConnectable={false}
      nodesFocusable={false}
      draggable={false}
      panOnDrag={false}
      elementsSelectable={false}
      zoomOnDoubleClick={false}
      zoomOnScroll={false}
      preventScrolling={false}
      proOptions={{ hideAttribution: true }}
    ></ReactFlow>
  );
};

export const BasicFlow: FC<{
  options?: BasicFlowOption;
  initialEdges: Edge[];
  initialNodes: Node[];
}> = ({ initialEdges, initialNodes, options }) => {
  return (
    <ReactFlowProvider>
      <BasicFlowInner
        options={options}
        initialEdges={initialEdges}
        initialNodes={initialNodes}
      />
    </ReactFlowProvider>
  );
};
