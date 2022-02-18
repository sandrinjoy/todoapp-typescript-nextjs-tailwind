import React,{ChangeEvent, useState,useEffect} from 'react'
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
    const handleSubmit = (event:any) =>{
      if (event.keyCode === 13) {
        event.preventDefault();
        event.target.blur();
      }
    }
    useEffect(() => {
      OnEdit(item.id,inputText)
    }, [inputText])
    
  return (
    <div  className='my-2  mx-auto flex flex-col justify-center items-center  pb-5  border-b '>
    <div className='flex justify-center items-center  gap-3'>  
        <input type='checkbox' checked={item.status} onChange={(e)=>OnComplete(e,item.id)} className='p-3 border-green-500'/>
        <input  className={item.status? 
        `font-semibold text-green-600   placeholder:text-neutral-400 px-8  w-full  shadow-sm border-none    focus:outline-none `:
          `font-semibold  text-neutral-800 placeholder:text-neutral-400 px-8  w-full  shadow border-none    focus:outline-none `} type='text' defaultValue={item.name} onChange={handleItemText} onKeyUp={handleSubmit}/>
           
        <button className='  '  onClick={()=>OnRemove(item.id)}>
         {item.status?'❎': '❌'}
       </button>
           </div>
      <div className=' flex gap-10 mt-3'>
      <div>

         
      </div>
     
      <div className='flex justify-center gap-3 ' >
     
     
      </div>
     
      </div>
     
       </div>
  );
}
export default TodoItem