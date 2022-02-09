import React from 'react';

export default function InputForm({OnInput,data,OnAdd}) {
  return <form onSubmit={OnAdd} className='flex justify-center '>  
  
  <input value={data} type="text" onChange={OnInput} placeholder='Read a Book' className='font-bold italic text-neutral-800 placeholder:text-neutral-400'/>
  <button type='submit' className='bg-orange-500 border border-neutral-800 text-neutral-50 px-3 text-lg font-semibold hover:bg-orange-600 transition active:bg-orange-700  rounded-r-lg'  >
    Add  Item
  </button></form>;
}
