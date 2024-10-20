"use server";

import { Edge, Node } from "@xyflow/react";
import { INodeTypeEnum, IPayload } from "./interface";
import { setEdges, setNodes } from "@/lib/db";
import { v4 as uuid } from "uuid";

/**
 * createNodeAction
 * @param formData FormData
 * @param payload Partial<IPayload> | null
 * @param currentNodes Node[]
 * @returns void
 */
export async function addNodeAction(
  formData: FormData,
  payload: Partial<IPayload> | null,
  currentNodes: Node[],
): Promise<Node[] | { error: unknown }> {
  if (!payload) {
    throw new Error("No payload");
  }

  const id = uuid();
  const label = formData.get("label");
  const color = formData.get("color") as string;
  const { type, position } = payload;

  const node: Node = {
    id,
    type,
    position: position ?? { x: 0, y: 0 },
    data: {
      label,
    },
  };

  if (color) {
    node.data.color = color;
  }

  if (type === INodeTypeEnum.mixer) {
    node.data.color1 = "#fff";
    node.data.color2 = "#fff";
    node.data.colorRange = 0.5;
  }

  const nodes = [...currentNodes, node];

  try {
    await setNodes(nodes);
    return nodes;
  } catch (error) {
    return {
      error,
    };
  }
}

/**
 * editNodeAction
 * @param formData FormData
 * @param payload Partial<IPayload> | null
 * @param nodes Node[]
 * @returns void
 */
export async function editNodeAction(
  formData: FormData,
  payload: Partial<IPayload> | null,
  nodes: Node[],
): Promise<Node[] | { error: unknown }> {
  if (!payload) {
    throw new Error("No payload");
  }

  const label = formData.get("label");
  const color = formData.get("color") as string;
  const { id } = payload;

  nodes.map((n) => {
    if (n.id === id) {
      if (color) {
        n.data.color = color;
      }

      if (label) {
        n.data.label = label;
      }
    }
  });

  try {
    await setNodes(nodes);
    return nodes;
  } catch (error) {
    return {
      error,
    };
  }
}

export async function saveAll(
  nodes: Node[],
  edges: Edge[],
): Promise<{ nodes: Node[]; edges: Edge[] } | { error: unknown }> {
  try {
    await setNodes(nodes);
    await setEdges(edges);

    return {
      nodes,
      edges,
    };
  } catch (error) {
    return {
      error,
    };
  }
}
