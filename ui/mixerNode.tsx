"use client";

import { Handle, Position, Node, useReactFlow } from "@xyflow/react";
import { CustomInputHandle } from "./customInputHandle";
import { useCallback } from "react";

export const MixerNode = ({ id, data }: Node) => {
  const { updateNodeData } = useReactFlow();
  const label = data.label as string;
  const color1 = data.color1 as string;
  const color2 = data.color2 as string;
  const colorRange = data.colorRange as number;

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
      <CustomInputHandle
        xPos={50}
        id="color-1"
        onChangeInfo={(value) => {
          updateNodeData(id, (prev) => ({
            ...prev.data,
            color1: value?.data?.color,
          }));
        }}
      />
      <CustomInputHandle
        xPos={100}
        id="color-2"
        onChangeInfo={(value) => {
          updateNodeData(id, (prev) => ({
            ...prev.data,
            color2: value?.data?.color,
          }));
        }}
      />

      <div className="mb-2 text-center font-heading">{label}</div>
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
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
