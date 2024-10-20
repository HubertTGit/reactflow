"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { INodeTypeEnum } from "@/utils/interface";

export type SubmitButtonProp = {
  isEdit?: boolean;
  type: INodeTypeEnum | undefined;
};

/**
 * A submit button that handles form submission and displays the button label as either 'Submit' or 'Update'
 * based on the `isEdit` prop.
 * The button is disabled when the form is pending and displays a spinner.
 * The button's background color is determined by the `type` prop:
 *   - input: green
 *   - output: orange
 *   - mixer: blue
 * @param {SubmitButtonProp} props - The component's props.
 * @param {boolean} [props.isEdit=false] - Whether the form is in edit mode.
 * @param {INodeTypeEnum} props.type - The type of node being created or edited.
 * @returns {JSX.Element} The submit button component.
 */
export const SubmitButton = ({ isEdit = false, type }: SubmitButtonProp) => {
  const { pending } = useFormStatus();
  const buttonLabel = isEdit ? "Update" : "Submit";

  return (
    <button
      disabled={pending}
      className={clsx(
        "rounded-md border border-b-red-600 bg-green-400 p-2 text-white disabled:bg-gray-500",
        {
          "bg-green-600": type === INodeTypeEnum.input,
          "bg-orange-400": type === INodeTypeEnum.output,
          "bg-blue-700": type === INodeTypeEnum.mixer,
        },
      )}
    >
      {pending ? "Saving..." : buttonLabel}
    </button>
  );
};
