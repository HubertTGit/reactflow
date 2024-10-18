'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';
import { INodeTypeEnum } from '@/utils/interface';

export type SubmitButtonProp = {
  isEdit?: boolean;
  type: INodeTypeEnum | undefined;
};

export const SubmitButton = ({ isEdit = false, type }: SubmitButtonProp) => {
  const { pending } = useFormStatus();
  const buttonLabel = isEdit ? 'Update' : 'Submit';

  return (
    <button
      disabled={pending}
      className={clsx(
        'p-2 border rounded-md border-b-red-600 bg-green-400 text-white disabled:bg-gray-500',
        {
          'bg-green-600 ': type === INodeTypeEnum.input,
          'bg-orange-400 ': type === INodeTypeEnum.output,
          'bg-blue-700 ': type === INodeTypeEnum.mixer,
        }
      )}
    >
      {pending ? 'Saving...' : buttonLabel}
    </button>
  );
};
