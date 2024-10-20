import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  Node,
} from "@xyflow/react";
import React, { useEffect } from "react";

export type CustomInputHandleProps = {
  id: string;
  xPos: number;
  onChangeInfo: (updated: Pick<Node, "id" | "type" | "data"> | null) => void;
};

export const CustomInputHandle = ({
  id,
  onChangeInfo,
  xPos,
}: CustomInputHandleProps) => {
  const connections = useHandleConnections({
    type: "target",
    id,
  });

  const nodeData = useNodesData(connections?.[0]?.source);

  useEffect(() => {
    if (nodeData) {
      onChangeInfo(nodeData);
    }
  }, [nodeData, onChangeInfo]);

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
