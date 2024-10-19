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

export const MixerNode = ({ id, data }: Node) => {
  const { updateNodeData } = useReactFlow();
  const { label, color1, color2 } = data;

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
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
