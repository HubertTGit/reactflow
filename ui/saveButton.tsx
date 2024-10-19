"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export const SaveButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="w-full rounded-md border bg-green-700 p-2 text-lg text-white"
      type="submit"
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
};
