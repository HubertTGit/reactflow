'use client';

import { saveAll } from '@/utils/actions';
import { TypeColorEnum } from '@/utils/constant';
import { INodeTypeEnum } from '@/utils/interface';
import { useReactFlow } from '@xyflow/react';
import clsx from 'clsx';
import { SaveButton } from './saveButton';

const onDragStart = (
  event: React.DragEvent<HTMLDivElement>,
  type: INodeTypeEnum
) => {
  event.dataTransfer.setData('widgetType', type);
};

export const NodeSelector = () => {
  const { getEdges, getNodes } = useReactFlow();

  return (
    <aside className="p-3 h-screen flex flex-col gap-4 items-center">
      {/* Draggable nodes */}
      <div>
        <h3 className="pb-4 text-center">Drag&drop a Node</h3>
        <div
          draggable
          onDragStart={(e) => onDragStart(e, INodeTypeEnum.input)}
          className={clsx([
            'p-3  border-2 mb-2 cursor-move rounded-md text-center bg-white',
            TypeColorEnum.inputBorderColor,
          ])}
        >
          Input
        </div>
        <div
          draggable
          onDragStart={(e) => onDragStart(e, INodeTypeEnum.output)}
          className={clsx([
            'p-3  border-2 mb-2 cursor-move rounded-md text-center bg-white',
            TypeColorEnum.outputBorderColor,
          ])}
        >
          Output
        </div>
        <div
          draggable
          onDragStart={(e) => onDragStart(e, INodeTypeEnum.mixer)}
          className={clsx([
            'p-3  border-2 mb-2 cursor-move rounded-md text-center border-dashed bg-white',
            TypeColorEnum.mixerBorderColor,
          ])}
        >
          Mixer
        </div>
      </div>
      {/* save layout */}
      <form
        className="w-full"
        action={async () => {
          await saveAll(getNodes(), getEdges());
          //revalidatePath('/');
        }}
      >
        <SaveButton />
      </form>
    </aside>
  );
};
