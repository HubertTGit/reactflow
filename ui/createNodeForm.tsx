"use client";

import { addNodeAction } from "@/utils/actions";
import { SubmitButton } from "./submitButton";
import { Node, useReactFlow } from "@xyflow/react";
import { INodeTypeEnum, IPayload } from "@/utils/interface";
import clsx from "clsx";

export type NodeFormProps = {
  payload: Partial<IPayload> | null;
  nodes: Node[];
  closeDialog: (evt?: React.MouseEvent<HTMLButtonElement>) => void;
};

export const CreateNodeForm = ({
  payload,
  nodes,
  closeDialog,
}: NodeFormProps) => {
  const { setNodes } = useReactFlow();
  if (!payload) {
    return null;
  }

  const { isEdit, type } = payload;

  return (
    <form
      action={async (frm) => {
        const updated = (await addNodeAction(frm, payload, nodes!)) as Node[];
        setNodes(updated);
        closeDialog();
      }}
    >
      <div className="mb-4 flex items-center gap-2">
        <label>Label</label>
        <input
          className={clsx(
            "rounded-md border border-gray-300 p-1 outline-none focus:ring-2",
            {
              "focus:ring-green-600": type === INodeTypeEnum.input,
              "focus:ring-orange-400": type === INodeTypeEnum.output,
              "focus:ring-blue-600": type === INodeTypeEnum.mixer,
            },
          )}
          type="text"
          name="label"
          required
        />
      </div>
      {type === INodeTypeEnum.input && (
        <div className="mb-4 flex items-center gap-2">
          <label className="text-md text-gray-800">Color</label>
          <input
            className="block h-10 w-14 cursor-pointer rounded-lg border border-gray-200 bg-white p-1 disabled:pointer-events-none disabled:opacity-50"
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
          className="rounded-md border p-2 disabled:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
