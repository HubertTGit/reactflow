"use client";

import {
  Handle,
  Position,
  Node,
  useHandleConnections,
  useNodesData,
} from "@xyflow/react";
import { useEffect, useState } from "react";
import Spectrum, { colorMix } from "@snipshot/spectrum";
import { MixerNode } from "./mixerNode";
import colorMixer from "@/utils/colorMixer";

export const OutputNode = ({ id, data }: Node) => {
  const connections = useHandleConnections({
    type: "target",
    id,
  });

  const nodeData = useNodesData(connections?.[0]?.source);
  const [mixedColor, setMixedColor] = useState<string>("#fff");

  useEffect(() => {
    if (nodeData?.data?.color1 && nodeData?.data?.color2) {
      const color1 = nodeData.data.color1 as string;
      const color2 = nodeData.data.color2 as string;

      const mixed = colorMixer(color1, color2, 0.5);

      setMixedColor(mixed);
    }
  }, [nodeData]);

  const { label } = data;
  return (
    <div
      className="rounded-lg border-2 border-orange-400 bg-white p-2 text-sm"
      style={{ backgroundColor: mixedColor }}
    >
      <Handle
        type="target"
        position={Position.Top}
        id={id}
        isConnectable={true}
      />
      <div className="font-heading">{label}</div>
    </div>
  );
};
