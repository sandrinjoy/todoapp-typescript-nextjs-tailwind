import Layout from '../components/Layout'

import TodoItem from '../components/todoItem/TodoItem'
import { ChangeEvent, FormEvent, useState,useEffect }  from 'react'
import InputForm from '../components/todoItem/InputForm'
import { nanoid } from 'nanoid'

export interface Itodo {
  id: string;
  name: string;
  status:boolean;
}
type Filters=('All' | 'Done' | 'Undone');
const FILTER_MAP={
  All:()=>true,
  Done:todo=>todo.status,
  Undone:todo=>!todo.status
}
const FILTER_NAMES=Object.keys(FILTER_MAP)

export default function IndexPage() {


  const [todoList,setTodoList] =useState<Itodo[] | []>([])
  const [filter,setFilter]=useState<Filters>('All')
  const [inputText,setInputText] =useState<string>('')

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
  const handleFilter=(e:Filters)=>{
    setFilter(e)     
  }


  const handleClear = () =>{
    
    setInputText('')
    setTodoList([])
  }
  const handleInput = (e:ChangeEvent<HTMLInputElement>) =>{
   
    setInputText(e.target.value)
  }
  const handleRemoveItem = (id:string) =>{
        setTodoList(todoList.filter(item =>item['id']!==id))

  }
  const handleEditItem = (id:string,text:string) =>{
    let temp = [...todoList]
        temp.map((item,index)=>{
          if(item.id===id){
            item.name= text
          }
        })
        setTodoList(temp)

  }
  const handleComplete = (e:ChangeEvent<HTMLInputElement>,id:string) =>{
    let temp = [...todoList]
        temp.map((item,index)=>{
          if(item.id===id){
            if(e.target.checked){
              item.status= true
            }
            else{
              item.status= false
            }
          }
        })
        setTodoList(temp)

  }
  const  renderFilters = () :JSX.Element[]=> {
    return FILTER_NAMES.map((x:Filters)=>{
    return  (
        <input type='button' value={x} name={x} onClick={()=>handleFilter(x)} className=' h-10 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100'>
         
        </input>
      )
    })
  }
  const  renderList = () :JSX.Element[] => {
    return todoList
      ?.filter(FILTER_MAP[filter])
      ?.map((x: Itodo)=>{
        return <div key={x.id}>
        <TodoItem item={x}  OnRemove={handleRemoveItem} OnEdit={handleEditItem} OnComplete={handleComplete}/>
  
        </div>
      })
  
      
  }
  return ( 
  <Layout title="Home | Next.js + TypeScript Example">
  <h1 className='text-7xl font-bold text-center my-5'>Next Todo </h1>
 
  <div className="flex justify-center ">
<InputForm data={inputText} OnInput={handleInput} OnAdd={handleAddItem}/>
  <button className='bg-red-600 text-neutral-50 px-3 text-lg hover:bg-red-400 active:bg-red-500' onClick={handleClear}>
    Clear
  </button>
  </div>
  <div className='flex justify-center items-center gap-5 my-3'>
 {renderFilters()}
</div>
  <div>
  <div  className='my-2 grid  grid-cols-2 w-8/12 mx-auto'>
  <div className='flex justify-items-end gap-3'> 
  <span>name</span> 
  </div>
  <div>
   <div className=' grid  grid-cols-3 gap-4'>
     <span>Done</span>
     <span>Delete</span>
     <span>Edit</span>
     </div>
    </div>
    </div>
    {renderList()}
  </div>
</Layout>
  )
}
