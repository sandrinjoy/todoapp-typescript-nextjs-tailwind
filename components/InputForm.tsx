import React from 'react';

export default function InputForm({OnInput,data,OnAdd}) {
  return <form onSubmit={OnAdd} className='flex justify-center gap-1 '>  
  
  <input value={data} type="text" onChange={OnInput} placeholder='Read a Book' className='font-bold italic text-neutral-800 placeholder:text-neutral-400 px-8  w-full  shadow-lg border  border-neutral-200  focus:outline-none items-center'/>
  <button type='submit' className='bg-orange-500 border border-neutral-200 border-l-0 shadow-lg text-neutral-50 px-3 text-normal py-3  font-semibold hover:bg-orange-600 transition active:bg-orange-700  rounded-r-lg'  >
    Add  Item
  </button></form>;
}
