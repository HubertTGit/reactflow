import clsx from "clsx";
import React, { forwardRef } from "react";
import { EditNodeForm } from "./editNodeForm";
import { CreateNodeForm } from "./createNodeForm";
import { INodeTypeEnum, IPayload } from "@/utils/interface";
import { Node } from "@xyflow/react";

export type DialogComponentProps = {
  payload: Partial<IPayload> | null;
  nodes: Node[];
  closeModalHandler: (evt?: React.MouseEvent<HTMLButtonElement>) => void;
};

const DialogComponent = forwardRef<HTMLDialogElement, DialogComponentProps>(
  ({ payload, nodes, closeModalHandler }: DialogComponentProps, ref) => {
    return (
      <dialog
        ref={ref}
        className={clsx(
          "min-w-20 rounded-lg border-2 bg-white p-3 backdrop:bg-black/25 backdrop:backdrop-blur-sm",
          {
            "border-green-600": payload?.type === INodeTypeEnum.input,
            "border-orange-400": payload?.type === INodeTypeEnum.output,
            "border-blue-700": payload?.type === INodeTypeEnum.mixer,
            "border-dashed": payload?.type === INodeTypeEnum.mixer,
          },
        )}
      >
        <div>
          <h1 className="font-heading mb-3 text-lg">{payload?.type}</h1>
          {payload?.isEdit ? (
            <EditNodeForm
              payload={payload}
              closeDialog={closeModalHandler}
              nodes={nodes}
            />
          ) : (
            <CreateNodeForm
              payload={payload}
              closeDialog={closeModalHandler}
              nodes={nodes}
            />
          )}
        </div>
      </dialog>
    );
  },
);

DialogComponent.displayName = "DialogComponent";

export default DialogComponent;
