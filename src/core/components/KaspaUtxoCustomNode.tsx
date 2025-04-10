import { memo, NamedExoticComponent, useEffect, useState } from "react";
import {
  Handle,
  Position,
  NodeProps,
  Node,
  useNodeConnections,
} from "@xyflow/react";

export type KaspaUtxoCustomNode = Node<
  { label: string; amount: number; address: string },
  "kaspaUtxo"
>;

export const KaspaUtxoCustomNode: NamedExoticComponent<
  NodeProps<KaspaUtxoCustomNode>
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
    <div className="flex items-center justify-center rounded-md border border-white">
      <Handle
        hidden={!handleState.isTarget}
        type="target"
        position={Position.Left}
        isConnectable={true}
      />

      <div className="">
        {data.label ? (
          <div className="border-b border-white">
            <p className="text-center">{data.label}</p>
          </div>
        ) : null}
        <p className="px-4 text-center">{data.address}</p>
        <p className="px-4 text-center">amount: {data.amount}</p>
      </div>

      <Handle
        hidden={!handleState.isSource}
        type="source"
        position={Position.Right}
        isConnectable={true}
      />
    </div>
  );
});
