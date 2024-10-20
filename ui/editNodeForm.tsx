"use client";

import { editNodeAction } from "@/utils/actions";
import { SubmitButton } from "./submitButton";
import { NodeFormProps } from "./createNodeForm";
import { INodeTypeEnum } from "@/utils/interface";
import clsx from "clsx";
import { useReactFlow, Node } from "@xyflow/react";

/**
 * EditNodeForm component is responsible for rendering a form to edit a node.
 * It calls editNodeAction when the form is submitted and updates the nodes.
 * It also closes the dialog when submitted or canceled.
 *
 * @param payload The payload of the node to be edited, contains the id, type, position, label, color and isEdit flag.
 * @param nodes The list of nodes in the flow.
 * @param closeDialog The function to close the dialog.
 */
export const EditNodeForm = ({
  payload,
  nodes,
  closeDialog,
}: NodeFormProps) => {
  const { type, isEdit } = payload!;
  const { setNodes } = useReactFlow();

  /**
   * Form action to edit a node.
   * It calls editNodeAction and updates the nodes then closes the dialog.
   * @param frm The form event.
   */
  const formAction = async (frm: FormData) => {
    const updated = (await editNodeAction(frm, payload, nodes)) as Node[];
    setNodes(updated);
    closeDialog();
  };

  return (
    <form action={formAction}>
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
          defaultValue={payload?.label}
          required
        />
      </div>
      {type === INodeTypeEnum.input && (
        <div className="mb-4 flex items-center gap-2">
          <label>Color</label>
          <input
            className="block h-10 w-14 cursor-pointer rounded-lg border border-gray-200 bg-white p-1 disabled:pointer-events-none disabled:opacity-50"
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
          className="rounded-md border p-2 disabled:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
