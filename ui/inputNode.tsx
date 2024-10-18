'use client';

import { Handle, Position, Node } from '@xyflow/react';
import React from 'react';

export const InputNode = ({ id, data }: Node) => {
  return (
    <div className="p-3 rounded-lg border-2 border-blue-700">
      <div>{id}</div>
      <div>{data.toString()}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
