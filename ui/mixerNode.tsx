"use client";

import { Handle, Position, Node, useReactFlow } from "@xyflow/react";
import { CustomInputHandle } from "./customInputHandle";
import { useCallback } from "react";

/**
 * A custom node component for a color mixer.
 * @param {Node} props The node data.
 * @returns {JSX.Element} The mixer node component.
 */
export const MixerNode = ({ id, data }: Node) => {
  const { updateNodeData } = useReactFlow();
  const label = data.label as string;
  const color1 = data.color1 as string;
  const color2 = data.color2 as string;
  const colorRange = data.colorRange as number;

  /**
   * A callback function to update the color range of the node.
   * @param {React.ChangeEvent<HTMLInputElement>} event The range input event.
   */
  const onRangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateNodeData(id, (prev) => ({
        ...prev.data,
        colorRange: +event.target.value,
      }));
    },
    [updateNodeData, id],
  );

  return (
    <div className="w-[150px] rounded-lg border-2 border-dashed border-blue-700 bg-white p-2 text-sm">
      {/* A custom input handle component */}
      <CustomInputHandle xPos={50} id="color-1" nodeId={id} />
      <CustomInputHandle xPos={100} id="color-2" nodeId={id} />

      {/* The label of the node */}
      <div className="mb-2 text-center font-heading">{label}</div>

      {/* The color preview of the node */}
      <div className="flex items-center justify-center gap-2">
        {color1 && (
          <div
            style={{ backgroundColor: color1 }}
            className="h-10 w-10 rounded-full"
          ></div>
        )}
        {color2 && (
          <div
            style={{ backgroundColor: color2 }}
            className="h-10 w-10 rounded-full"
          ></div>
        )}
      </div>

      {/* The color range slider */}
      <div className="mt-3">
        <input
          type="range"
          className="nodrag"
          onChange={onRangeHandler}
          defaultValue={colorRange}
          min="0"
          max="1"
          step="0.01"
        />
      </div>

      {/* The output handle */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
