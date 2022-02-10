import React,{ChangeEvent, useState} from 'react'
import {Itodo} from '../../pages/index'
interface IProps {
  item:Itodo;
  OnRemove:(id:string)=>void;
  OnComplete:(e: ChangeEvent<HTMLInputElement>,x:string)=>void
  OnEdit:(id: string, text: string) => void;
}


 const TodoItem: React.FC<IProps>= ({item,OnRemove,OnComplete,OnEdit}) =>{

    const [inputText,setInputText] =useState<string>(item.name)
    const handleItemText =(e:ChangeEvent<HTMLInputElement>)=>{
            setInputText(e.target.value)
    }
  return (
    <div  className='my-2  mx-auto flex flex-col justify-center items-center  pb-5  border-b '>
    <div className={item.status?`flex justify-center items-center  gap-3 italic font-semibold text-green-500`:`flex justify-center items-center gap-3  `}>  
        <input type='checkbox' checked={item.status} onChange={(e)=>OnComplete(e,item.id)} className=''/>
           <span className='font-semibold text-lg'>{item.name}</span></div>
      <div className=' flex gap-10 mt-3'>
      <div>

         
      </div>
     
      <div className='flex justify-center gap-3 ' >
      <input className='font-bold italic text-neutral-800 placeholder:text-neutral-400 px-8  w-full  shadow-lg border  border-neutral-200  focus:outline-none items-center' type='text' defaultValue={item.name} onChange={handleItemText}/>
      <button className=''  onClick={()=>OnEdit(item.id,inputText)}>
         
         🛠️ 
       </button>
      </div>
      <button className='  '  onClick={()=>OnRemove(item.id)}>
         ❌
       </button>
      </div>
     
       </div>
  );
}
export default TodoItem