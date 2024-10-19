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

      const spec1 = new Spectrum("hex", color1);
      const spec2 = new Spectrum("hex", color2);

      const mixed = colorMix(spec1, spec2, 0.5);

      setMixedColor(mixed.hex);
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
      <div>{label}</div>
    </div>
  );
};
