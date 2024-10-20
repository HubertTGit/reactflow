"use client";

import { Handle, Position, Node } from "@xyflow/react";

/**
 * InputNode component is responsible for rendering an input node in the flow.
 * It displays the label and color of the node.
 *
 * @param id The unique identifier of the node.
 * @param data The data object containing node information.
 * @returns JSX.Element
 */
export const InputNode = ({ data }: Node) => {
  // Extract label and color from data object
  const label = data.label as string;
  const color = data.color as string;

  return (
    // Render the input node with label and color
    <div
      className="rounded-lg border-2 border-green-600 p-2 font-heading text-sm"
      style={{ backgroundColor: color }}
    >
      <div>{label}</div>
      {/* Handle component for connecting edges */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
