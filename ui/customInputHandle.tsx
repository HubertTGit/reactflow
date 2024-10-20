import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  Node,
  useReactFlow,
} from "@xyflow/react";
import React, { useEffect } from "react";

export type CustomInputHandleProps = {
  id: string;
  xPos: number;
  nodeId: string;
  onChangeInfo?: (updated: Pick<Node, "id" | "type" | "data"> | null) => void;
};

/**
 * CustomInputHandle component is responsible for rendering a handle
 * which connects to other nodes in the flow. It updates the connected
 * node's data with specific color information.
 */
export const CustomInputHandle = ({
  id,
  nodeId,
  xPos,
}: CustomInputHandleProps) => {
  const { updateNodeData } = useReactFlow();

  // Establish connections for the target handle based on the provided id
  const connections = useHandleConnections({
    type: "target",
    id,
  });

  // Retrieve data from the connected node
  const nodeData = useNodesData(connections?.[0]?.source);

  useEffect(() => {
    // Determine which color key to update based on the handle's id
    const colorKey = id === "color-1" ? "color1" : "color2";
    console.log(nodeData);
    if (nodeData) {
      // Update the connected node's data with the new color value
      updateNodeData(nodeId, (prev) => ({
        ...prev.data,
        [colorKey]: nodeData.data.color,
      }));
    } else {
      // Update the connected node's with reset color
      updateNodeData(nodeId, (prev) => ({
        ...prev.data,
        [colorKey]: "#fff",
      }));
    }
  }, [nodeData, nodeId, updateNodeData, id]);

  return (
    <>
      {/* Render a handle component with dynamic positioning and connection ability */}
      <Handle
        type="target"
        position={Position.Top}
        id={id}
        style={{ left: xPos }}
        isConnectable={connections?.length <= 1}
      />
    </>
  );
};
