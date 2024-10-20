"use client";

import { saveAll } from "@/utils/actions";
import { TypeColorEnum } from "@/utils/constant";
import { INodeTypeEnum } from "@/utils/interface";
import { useReactFlow } from "@xyflow/react";
import clsx from "clsx";
import { SaveButton } from "./saveButton";

/**
 * NodeSelector is a component that provides a list of draggable nodes
 * with which the user can interact with the ReactFlow graph.
 * @returns JSX.Element
 */
export const NodeSelector = () => {
  const { getEdges, getNodes } = useReactFlow();

  /**
   * Helper function to handle dragstart event.
   * @param event drag event
   * @param type type of the node to be dragged
   */
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    type: INodeTypeEnum,
  ) => {
    event.dataTransfer.setData("widgetType", type);
  };

  return (
    <aside className="flex h-screen flex-col items-center gap-4 p-3">
      {/* Draggable nodes */}
      <div>
        <h3 className="pb-4 text-center font-heading">
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
          // save all nodes and edges to the database
          // using saveAll function from actions.ts
          await saveAll(getNodes(), getEdges());
        }}
      >
        <SaveButton />
      </form>
    </aside>
  );
};
