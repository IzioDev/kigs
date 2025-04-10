import { FC } from "react";
import { useConnection } from "@xyflow/react";

export const ConnectionLine: FC<{
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}> = ({ fromX, fromY, toX, toY }) => {
  const { fromHandle } = useConnection();

  return (
    <g>
      <path
        fill="none"
        stroke={fromHandle?.id ?? undefined}
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="white"
        r={3}
        stroke={fromHandle?.id ?? undefined}
        strokeWidth={1.5}
      />
    </g>
  );
};
