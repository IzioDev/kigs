import { memo, NamedExoticComponent, useEffect, useState } from "react";
import {
  Handle,
  Position,
  NodeProps,
  Node,
  useNodeConnections,
} from "@xyflow/react";

export type KaspaBlockCustomNode = Node<
  {
    label: string;
    isBlue?: boolean;
    isRed?: boolean;
    isFuture?: boolean;
    isSelected?: boolean;
  },
  "kaspaBlock"
>;

export const KaspaBlockCustomNode: NamedExoticComponent<
  NodeProps<KaspaBlockCustomNode>
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
    <div
      className={`min-w-12 min-h-12 flex items-center border justify-center rounded-md ${
        data?.isBlue ? "bg-blue-work" : ""
      } ${data?.isRed ? "bg-red-work" : ""} ${
        data?.isFuture ? "border-dotted" : ""
      } ${data?.isSelected ? "border-dag-selected" : "border-white"}`}
    >
      <Handle
        hidden={!handleState.isTarget}
        type="target"
        position={Position.Left}
        isConnectable={true}
      />

      <p className="text-center py-0">{data.label}</p>

      <Handle
        hidden={!handleState.isSource}
        type="source"
        position={Position.Right}
        isConnectable={true}
      />
    </div>
  );
});
