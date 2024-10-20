"use client";

import {
  Handle,
  Position,
  Node,
  useHandleConnections,
  useNodesData,
} from "@xyflow/react";
import { useEffect, useState } from "react";
import colorMixer from "@/utils/colorMixer";

/**
 * OutputNode component is responsible for rendering an output node in the flow.
 * It displays the mixed color from the two input nodes connected to it.
 *
 * @param id The unique identifier of the node.
 * @param data The data object containing node information.
 * @returns JSX.Element
 */
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
      const rangeColor = nodeData.data.colorRange as number;

      const mixed = colorMixer(color1, color2, rangeColor);

      setMixedColor(mixed);
    }
  }, [nodeData]);

  const label = data.label as string;
  return (
    <div
      /**
       * The output node component should have a background color of the mixed
       * color of the two input nodes connected to it.
       */
      style={{ backgroundColor: mixedColor }}
      className="rounded-lg border-2 border-orange-400 bg-white p-2 text-sm"
    >
      <Handle
        /**
         * The handle component should be rendered at the top of the output node
         * and should be connectable.
         */
        type="target"
        position={Position.Top}
        id={id}
        isConnectable={true}
      />
      <div className="font-heading">{label}</div>
    </div>
  );
};
