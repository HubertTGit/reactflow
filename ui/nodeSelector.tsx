"use client";

import { saveAll } from "@/utils/actions";
import { TypeColorEnum } from "@/utils/constant";
import { INodeTypeEnum } from "@/utils/interface";
import { useReactFlow } from "@xyflow/react";
import clsx from "clsx";
import { SaveButton } from "./saveButton";

const onDragStart = (
  event: React.DragEvent<HTMLDivElement>,
  type: INodeTypeEnum,
) => {
  event.dataTransfer.setData("widgetType", type);
};

export const NodeSelector = () => {
  const { getEdges, getNodes } = useReactFlow();

  return (
    <aside className="flex h-screen flex-col items-center gap-4 p-3">
      {/* Draggable nodes */}
      <div>
        <h3 className="font-heading pb-4 text-center">
          Drag&drop <br />a Node
        </h3>
        <div
          draggable
          onDragStart={(e) => onDragStart(e, INodeTypeEnum.input)}
          className={clsx([
            "mb-2 cursor-move rounded-md border-2 bg-white p-3 text-center",
            TypeColorEnum.inputBorderColor,
          ])}
        >
          Input
        </div>

        <div
          draggable
          onDragStart={(e) => onDragStart(e, INodeTypeEnum.mixer)}
          className={clsx([
            "mb-2 cursor-move rounded-md border-2 border-dashed bg-white p-3 text-center",
            TypeColorEnum.mixerBorderColor,
          ])}
        >
          Mixer
        </div>
        <div
          draggable
          onDragStart={(e) => onDragStart(e, INodeTypeEnum.output)}
          className={clsx([
            "mb-2 cursor-move rounded-md border-2 bg-white p-3 text-center",
            TypeColorEnum.outputBorderColor,
          ])}
        >
          Output
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
