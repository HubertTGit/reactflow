'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

export const SaveButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="p-2 border rounded-md bg-green-700 text-white text-lg w-full"
      type="submit"
    >
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
};
