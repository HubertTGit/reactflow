"use client";

import React from "react";
import { useFormStatus } from "react-dom";

/**
 * SaveButton component is responsible for rendering a save button.
 * It displays the button text based on the pending state.
 *
 * @returns JSX.Element
 */
export const SaveButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      /**
       * The save button should have a full width, rounded border, green background,
       * padding of 2, large text size, and white text color.
       */
      className="w-full rounded-md border bg-green-700 p-2 text-lg text-white"
      type="submit"
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
};
