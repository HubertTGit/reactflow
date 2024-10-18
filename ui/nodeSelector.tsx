'use client';

import { TypeColorEnum } from '@/utils/constant';
import { INodeTypeEnum } from '@/utils/interface';
import clsx from 'clsx';

const onDragStart = (
  event: React.DragEvent<HTMLDivElement>,
  type: INodeTypeEnum
) => {
  event.dataTransfer.setData('widgetType', type);
};

export const NodeSelector = () => {
  return (
    <aside className="p-3">
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
    </aside>
  );
};
