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

/**
 * CreateNodeForm
 * @description A form to create a new node
 * @param props payload: Partial<IPayload> | null, nodes: Node[], closeDialog: (evt?: React.MouseEvent<HTMLButtonElement>) => void
 * @returns JSX.Element
 */
export const CreateNodeForm = ({
  payload,
  nodes,
  closeDialog,
}: NodeFormProps) => {
  // get setNodes from useReactFlow hook
  const { setNodes } = useReactFlow();
  // if payload is null, return null
  if (!payload) {
    return null;
  }

  // extract isEdit and type from payload
  const { isEdit, type } = payload;

  // form action to add a new node
  const formAction = async (frm: FormData) => {
    // call addNodeAction and update nodes
    const updated = (await addNodeAction(frm, payload, nodes!)) as Node[];
    // set nodes to the updated array
    setNodes(updated);
    // close the dialog
    closeDialog();
  };

  return (
    <form
      // action to add a new node
      action={formAction}
    >
      <div className="mb-4 flex items-center gap-2">
        <label>Label</label>
        <input
          // input field for label
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
            // input field for color
            className="block h-10 w-14 cursor-pointer rounded-lg border border-gray-200 bg-white p-1 disabled:pointer-events-none disabled:opacity-50"
            type="color"
            name="color"
            required
          />
        </div>
      )}

      <div className="flex gap-2">
        <SubmitButton
          // submit button with isEdit and type
          isEdit={isEdit}
          type={type}
        />

        <button
          // cancel button
          onClick={closeDialog}
          className="rounded-md border p-2 disabled:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
