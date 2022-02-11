import React ,{useState,FormEvent,ChangeEvent} from 'react'
import { nanoid } from 'nanoid'
import InputForm from '../components/InputForm'
let t=0;
export default function NewItem({setTodoList}) {
    
  const [inputText,setInputText] =useState<string>('')
  const [loading,setLoading] =useState<boolean>(false)
  const handleAddItem = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(inputText!==null &&  inputText.length!==0)
       {
        setTodoList(prevTodo=> [...prevTodo,{
          id:nanoid(),
        name:inputText,
      status:false}])
        
      setInputText('')
       }
  }
  const addRandomItem :()=>void = () =>{
    
    const now=Date.now()
    
    if((now-t)>1000){
      setLoading(true)
    fetch('https://random-data-api.com/api/food/random_food')
    .then(res=>res.json())
    .then(t=>
     {
      setTodoList(prevTodo=> [...prevTodo,{
        id:nanoid(),
      name:t.dish,
    status:false}]) 
    setLoading(false)
     }
    
    )
   
    t=now
      }
  }
  const handleInput = (e:ChangeEvent<HTMLInputElement>) =>{
   
    setInputText(e.target.value)
  }
  return (
    <>
    <button type='button' onClick={addRandomItem} className='bg-white shadow-lg shadow-neutral-900/30 border-1 transition  text-neutral-50 px-3 text-lg font-semibold hover:bg-neutral-100  active:bg-neutral-300  rounded-lg'  >
     {loading? (
  
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
): ( <div className=" h-8 w-8 flex justify-center items-center">🎲</div>)}
  </button>
        <InputForm data={inputText} OnInput={handleInput} OnAdd={handleAddItem}/>
  
    </>
  )
}
