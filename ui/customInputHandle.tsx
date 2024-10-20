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

export const CustomInputHandle = ({
  id,
  nodeId,
  xPos,
}: CustomInputHandleProps) => {
  const { updateNodeData } = useReactFlow();
  const connections = useHandleConnections({
    type: "target",
    id,
  });

  const nodeData = useNodesData(connections?.[0]?.source);

  useEffect(() => {
    if (nodeData) {
      const colorKey = id === "color-1" ? "color1" : "color2";
      updateNodeData(nodeId, (prev) => ({
        ...prev.data,
        [colorKey]: nodeData.data.color,
      }));
    }
  }, [nodeData, nodeId, updateNodeData, id]);

  return (
    <>
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
