"use server";

import { Edge, Node } from "@xyflow/react";
import { IPayload } from "./interface";
import { setEdges, setNodes } from "@/lib/db";

/**
 * createNodeAction
 * @param formData FormData
 * @param payload Partial<IPayload> | null
 * @param nodes Node[]
 * @returns void
 */
export async function addNodeAction(
  formData: FormData,
  payload: Partial<IPayload> | null,
  nodes: Node[],
) {
  if (!payload) {
    return;
    throw new Error("No payload");
  }

  const id = crypto.randomUUID();
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

  const all = [...nodes, node];

  try {
    await setNodes(all);

    //revalidatePath('/');
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
) {
  if (!payload) {
    return;
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

    //revalidatePath('/');
  } catch (error) {
    return {
      error,
    };
  }
}

export async function saveAll(nodes: Node[], edges: Edge[]) {
  try {
    await setNodes(nodes);
    await setEdges(edges);

    //revalidatePath('/');
  } catch (error) {
    return {
      error,
    };
  }
}
