'use client';

import { editNodeAction } from '@/utils/actions';
import { SubmitButton } from './submitButton';
import { NodeFormProps } from './createNode';
import { INodeTypeEnum } from '@/utils/interface';
import clsx from 'clsx';

export const EditNodeForm = ({
  payload,
  nodes,
  closeDialog,
}: NodeFormProps) => {
  const { type, isEdit } = payload!;

  return (
    <form
      action={async (frm) => {
        await editNodeAction(frm, payload, nodes);

        //closeDialog();
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
          defaultValue={payload?.label}
          required
        />
      </div>
      {type === INodeTypeEnum.input && (
        <div className="flex gap-2 items-center mb-4">
          <label>Color</label>
          <input
            className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
            type="color"
            name="color"
            required
            defaultValue={payload?.color}
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
