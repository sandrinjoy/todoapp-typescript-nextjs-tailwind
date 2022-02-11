import Head from 'next/head'
import { ChangeEvent, useState,useEffect }  from 'react'
import Image from 'next/image'


import TodoItem from '../components/todoItem/TodoItem'
import NewItem from '../components/NewItem';
import ClearTodo from '../components/ClearTodo';

export interface Itodo {
  id: string;
  name: string;
  status:boolean;
}
type Filters=('All' | 'Done' | 'Undone');


const FILTER_MAP={
  All: ():Function=> boolean =>true,
  Done:todo=>todo.status,
  Undone:todo=>!todo.status
}
const FILTER_NAMES=Object.keys(FILTER_MAP)

export default function IndexPage() {

  const [todoList,setTodoList] =useState<Itodo[] | []>([])
  const [filter,setFilter]=useState<Filters>('All')
  const handleFilter:(e:Filters)=>void=(e)=>{
    setFilter(e)     
  }
  const handleRemoveItem:(id:string)=>void = (id) =>{
        setTodoList(todoList.filter(item =>item['id']!==id))

  }
  const handleEditItem:(id:string,text:string)=>void = (id,text) =>{
    let temp = [...todoList]
        temp.map((item,index)=>{
          if(item.id===id){
            item.name= text
          }
        })
        setTodoList(temp)

  }
  const handleComplete:(e:ChangeEvent<HTMLInputElement>,id:string)=>void = (e,id) =>{
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
  const  renderFilters:()=>JSX.Element[] = () => {
    return FILTER_NAMES.map((x:Filters,index:number)=>{
    return  (
        <button type='button' key={index} name={x} onClick={()=>handleFilter(x)} className={filter!==x?'font-semibold text-sm px-5 py-2 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100':'text-sm font-semibold py-2  px-5 text-neutral-50 bg-indigo-500 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100'}>
         {x} ({todoList?.filter(FILTER_MAP[x]).length})
        </button>
      )
    })
  }
  const  renderList :()=>JSX.Element[]= () => {
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
    <header className='bg-neutral-50 shadow-lg border  w-8/12 mx-auto my-5'>
    <div className='flex justify-center items-center py-5 mb-5 gap-1 px-5'>
    <Image src='/logo.svg' width={100} height={100}  className='rounded-full'/>
    <div className="text-4xl md:text-7xl font-light text-center my-5 text-indigo-600">
  <h1 className="  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 py-5">
  Todo App
  </h1>
</div>
    
    </div>
    <h2 className='text-xl md:text-3xl font-light text-center my-5 text-indigo-600 '>Simple &amp; convinient.</h2>
</header>
  <div className="flex justify-center px-5 gap-1">
   <NewItem setTodoList={setTodoList}/>
  </div>
  <div className='flex justify-center flex-wrap items-center gap-1 my-3 px-5'>
 {renderFilters()}
 <ClearTodo  setTodoList={setTodoList}/>
</div>
  <div className='flex flex-col justify-center items-center px-3 '>
    {renderList()}
  </div>
</>
  )
}
