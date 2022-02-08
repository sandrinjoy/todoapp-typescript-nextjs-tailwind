import React from 'react';

export default function InputForm({OnInput,data,OnAdd}) {
  return <form onSubmit={OnAdd} className='flex justify-center'>  
  
  <input value={data} type="text" onChange={OnInput}/>
  <button type='submit' className='bg-neutral-900 text-neutral-50 px-3 text-lg hover:bg-neutral-700 active:bg-neutral-800' >
    Add  Item
  </button></form>;
}
