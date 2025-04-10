import { memo, NamedExoticComponent, useEffect, useState } from "react";
import {
  Handle,
  Position,
  NodeProps,
  Node,
  useNodeConnections,
} from "@xyflow/react";

export type KaspaNodeCustomNode = Node<{ label: string }, "kaspaNode">;

export const KaspaNodeCustomNode: NamedExoticComponent<
  NodeProps<KaspaNodeCustomNode>
> = memo(({ id, isConnectable, data }) => {
  const nodeConnection = useNodeConnections();

  const [handleState, setHandleState] = useState<{
    isSource: boolean;
    isTarget: boolean;
  }>({ isSource: true, isTarget: true });

  useEffect(() => {
    let isSource = nodeConnection.findIndex((nc) => nc.source === id) !== -1;
    let isTarget = nodeConnection.findIndex((nc) => nc.target === id) !== -1;

    setHandleState({
      isSource: Boolean(isSource),
      isTarget: Boolean(isTarget),
    });
  }, [id, nodeConnection]);

  return (
    <div className="flex items-center justify-center w-16 h-16 rounded-full border border-white">
      <Handle
        hidden={!handleState.isTarget}
        type="target"
        position={Position.Left}
        isConnectable={true}
      />

      <p className="font-rubik text-center">{data.label}</p>

      <Handle
        hidden={!handleState.isSource}
        type="source"
        position={Position.Right}
        isConnectable={true}
      />
    </div>
  );
});
