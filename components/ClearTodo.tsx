import React from 'react';

export default function ClearTodo({setTodoList}) {
  const handleClear:()=>void = () =>{
    setTodoList([])
  }
  return (
  <button className='bg-red-500 border  text-neutral-50 px-3 text-sm py-2 font-semibold hover:bg-red-600 transition active:bg-red-700 rounded-lg' onClick={handleClear}>
  Clear All
</button>
  );
}
