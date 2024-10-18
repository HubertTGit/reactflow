"use client";

import { Handle, Position, Node } from "@xyflow/react";

export const MixerNode = ({ id, data }: Node) => {
  const label = data.label as string;
  return (
    <div className="rounded-lg border-2 border-dashed border-blue-700 bg-white p-2 text-sm">
      <Handle type="target" position={Position.Top} />
      <div>{label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
