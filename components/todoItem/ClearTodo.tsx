import React from 'react';

export default function ClearTodo({OnRemove}) {
  return (
    <button className='bg-red-600 text-neutral-50 px-3 text-lg hover:bg-red-400 active:bg-red-500' onClick={OnRemove}>
    Clear
  </button>
  );
}
