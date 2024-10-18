'use server';

import { nodespath } from '@/utils/constant';
import { Node } from '@xyflow/react';
import { promises as fs } from 'fs';
import { IPayload } from './interface';

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
      color,
    },
  };

  if (color) {
    node.style = {
      backgroundColor: color,
    };
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
  const color = formData.get('color');
  const { type, position, id } = payload;

  const node: Node = {
    id: id as string,
    type,
    position: position ?? { x: 0, y: 0 },
    data: {
      label,
      color,
    },
  };

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
