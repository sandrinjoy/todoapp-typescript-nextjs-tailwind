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
    <div  className='my-2 grid  grid-cols-2 w-8/12 mx-auto'>
    <div className={item.status?`flex justify-items-end gap-3 italic font-semibold text-green-500`:`flex justify-items-end gap-3  `}>   <span>{item.name}</span></div>
      <div className=' grid  grid-cols-3 gap-4'>
      <div>
      <input type='checkbox' checked={item.status} onChange={(e)=>OnComplete(e,item.id)} className='w-full'>
         
         
         </input>
      </div>
      <button className='  '  onClick={()=>OnRemove(item.id)}>
         ❌
       </button>
      <div className='grid  grid-cols-2 ' >
      <input type='text' defaultValue={item.name} onChange={handleItemText}/>
      <button className='px-3 '  onClick={()=>OnEdit(item.id,inputText)}>
         
         🛠️ 
       </button>
      </div>
      </div>
       </div>
  );
}
export default TodoItem