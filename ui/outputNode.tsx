"use client";

import { Handle, Position, Node } from "@xyflow/react";

export const OutputNode = ({ id, data }: Node) => {
  const label = data.label as string;
  const color = data.color as string;
  return (
    <div
      className="rounded-lg border-2 border-orange-400 bg-white p-2 text-sm"
      style={{ backgroundColor: color }}
    >
      <Handle type="target" position={Position.Top} />
      <div>{label}</div>
    </div>
  );
};
