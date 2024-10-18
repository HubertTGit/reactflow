'use client';

import { addNodeAction } from '@/utils/actions';
import { SubmitButton } from './submitButton';
import { Node } from '@xyflow/react';
import { INodeTypeEnum, IPayload } from '@/utils/interface';
import clsx from 'clsx';

export type NodeFormProps = {
  payload: Partial<IPayload> | null;
  nodes: Node[];
  closeDialog: (evt: React.MouseEvent<HTMLButtonElement>) => void;
};

export const CreateNodeForm = ({
  payload,
  nodes,
  closeDialog,
}: NodeFormProps) => {
  if (!payload) {
    return null;
  }

  const { isEdit, type } = payload;

  return (
    <form
      action={async (frm) => {
        await addNodeAction(frm, payload, nodes!);

        //closeDialog!();
      }}
    >
      <div className="flex gap-2 items-center mb-4">
        <label>Label</label>
        <input
          className={clsx(
            'border border-gray-300 rounded-md p-1 outline-none focus:ring-2',
            {
              'focus:ring-green-600 ': type === INodeTypeEnum.input,
              'focus:ring-orange-400 ': type === INodeTypeEnum.output,
              'focus:ring-blue-600 ': type === INodeTypeEnum.mixer,
            }
          )}
          type="text"
          name="label"
          required
        />
      </div>
      {type === INodeTypeEnum.input && (
        <div className="flex gap-2 items-center mb-4">
          <label className="text-md text-gray-800">Color</label>
          <input
            className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
            type="color"
            name="color"
            required
          />
        </div>
      )}

      <div className="flex gap-2">
        <SubmitButton isEdit={isEdit} type={type} />

        <button
          onClick={closeDialog}
          className="p-2 border rounded-md disabled:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
