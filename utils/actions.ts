'use server';

import { edgespath, nodespath, TypeColorEnum } from '@/utils/constant';
import { Edge, Node } from '@xyflow/react';
import { promises as fs } from 'fs';
import { INodeTypeEnum, IPayload } from './interface';

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
  nodes: Node[]
) {
  if (!payload) {
    return;
    throw new Error('No payload');
  }

  const id = crypto.randomUUID();
  const label = formData.get('label');
  const color = formData.get('color') as string;
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
    node.style = {
      backgroundColor: color,
    };

    node.data.color = color;
  }

  const all = [...nodes, node];

  try {
    await fs.writeFile(nodespath, JSON.stringify(all));

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
  nodes: Node[]
) {
  if (!payload) {
    return;
    throw new Error('No payload');
  }

  const label = formData.get('label');
  const color = formData.get('color') as string;
  const { id } = payload;

  nodes.map((n) => {
    if (n.id === id) {
      if (color) {
        n.style = {
          backgroundColor: `color-mix(${color}, #000000)`,
        };
        n.data.color = `color-mix(${color}, #000000)`;
      }

      if (label) {
        n.data.label = label;
      }
    }
  });

  try {
    await fs.writeFile(nodespath, JSON.stringify(nodes));

    //revalidatePath('/');
  } catch (error) {
    return {
      error,
    };
  }
}

export async function saveAll(nodes: Node[], edges: Edge[]) {
  try {
    await fs.writeFile(nodespath, JSON.stringify(nodes));
    await fs.writeFile(edgespath, JSON.stringify(edges));

    //revalidatePath('/');
  } catch (error) {
    return {
      error,
    };
  }
}
