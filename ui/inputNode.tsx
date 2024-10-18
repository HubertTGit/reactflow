'use client';

import { Handle, Position, Node } from '@xyflow/react';

export const InputNode = ({ id, data }: Node) => {
  const label = data.label as string;
  const color = data.color as string;
  return (
    <div
      className="p-2 rounded-lg border-2 border-green-600 text-sm"
      style={{ backgroundColor: color }}
    >
      <div>{label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
