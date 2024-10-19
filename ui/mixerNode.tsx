"use client";

import {
  Handle,
  Position,
  Node,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import { CustomInputHandle } from "./customInputHandle";
import { useCallback, useEffect, useState } from "react";

export const MixerNode = ({ id, data }: Node) => {
  const { updateNodeData } = useReactFlow();
  const { label, color1, color2, colorRange } = data;

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

      <div className="font-heading mb-2 text-center">{label}</div>
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
          value={colorRange}
          min="0"
          max="1"
          step="0.01"
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
