import Head from 'next/head'
import TodoItem from '../components/todoItem/TodoItem'
import { ChangeEvent, FormEvent, useState,useEffect }  from 'react'
import InputForm from '../components/InputForm'
import { nanoid } from 'nanoid'
import Image from 'next/image'
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
        <button type='button'  name={x} onClick={()=>handleFilter(x)} className={filter!==x?'font-semibold h-20 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100':'font-semibold h-20 px-5 text-neutral-50 bg-indigo-500 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100'}>
         {x} ({todoList?.filter(FILTER_MAP[x]).length})
        </button>
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
  <>  
          <Head>
<title>Todo App - Typescript Edition </title>
<meta name="title" content="Todo - Typescript Edition."/>
<meta name="description" content="A todo app built to experiment my typescript skills."/>
<meta name="keyword" content="todo, typescript, open source, source code, tailwind, nextjs, "/>
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
<link rel="manifest" href="/site.webmanifest"></link>
      
      </Head>  
    <header>
    <div className='flex justify-center items-center my-5 gap-1 px-5'>
    <Image src='/logo.svg' width={100} height={100}  className='rounded-full'/>
    <h1 className='text-4xl md:text-7xl font-bold text-center my-5 text-indigo-600 '>TODO</h1>
    </div>
</header>
  
 
  <div className="flex justify-center px-5">
<InputForm data={inputText} OnInput={handleInput} OnAdd={handleAddItem}/>
  
  </div>
  <div className='flex justify-center items-center gap-1 my-3 px-5'>
 {renderFilters()}
 <button className='bg-red-500 border  text-neutral-50 px-3 text-lg font-semibold hover:bg-red-600 transition active:bg-red-700 h-20 rounded-lg' onClick={handleClear}>
    Clear All
  </button>
</div>
  <div className='flex flex-col justify-center items-center px-3'>
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
</>
  )
}
