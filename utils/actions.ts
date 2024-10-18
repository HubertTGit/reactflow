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

  if (type === INodeTypeEnum.input) {
    node.className = `${TypeColorEnum.inputBorderColor} border-2`;
  }

  if (type === INodeTypeEnum.output) {
    node.className = `${TypeColorEnum.outputBorderColor} border-2`;
  }

  if (type === INodeTypeEnum.mixer) {
    node.className = `${TypeColorEnum.mixerBorderColor} border-2 border-dashed`;
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
  const { type, position, id } = payload;

  const node: Node = {
    id: id as string,
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

  if (type === INodeTypeEnum.input) {
    node.className = `${TypeColorEnum.inputBorderColor} border-2`;
  }

  if (type === INodeTypeEnum.output) {
    node.className = `${TypeColorEnum.outputBorderColor} border-2`;
  }

  if (type === INodeTypeEnum.mixer) {
    node.className = `${TypeColorEnum.mixerBorderColor} border-2 border-dashed`;
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
