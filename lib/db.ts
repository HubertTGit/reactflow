import { redis } from "./redis";
import { Edge, Node } from "@xyflow/react";

export const getNodes = async (): Promise<Node[]> => {
  const value = await redis.get("nodes");

  if (!value) {
    throw new Error("No nodes found");
  }

  return value as Node[];
};

export const getEdges = async (): Promise<Edge[]> => {
  const value = await redis.get("edges");

  if (!value) {
    throw new Error("No edges found");
  }

  return value as Edge[];
};

export async function setNodes(value: Node[]) {
  await redis.set("nodes", JSON.stringify(value));
}
export async function setEdges(value: Edge[]) {
  await redis.set("edges", JSON.stringify(value));
}
