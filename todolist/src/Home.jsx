import React from 'react'
import { useEffect,useState } from 'react'
import Create from './Create'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import axios from 'axios'

function Home() {
  const [todos,setTodos] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3001/get')
    .then(result=>setTodos(result.data))
    .catch(err=>console.log(err))
  },[])
  const handleEdit=(id)=>{
    axios.put('http://localhost:3001/update/'+id)
    .then(result=>{
      location.reload()
    })
    .catch(err=>console.log(err))
  }
  const handleDelete=(id)=>{
    axios.delete('http://localhost:3001/delete/'+id)
    .then(result=>{
      location.reload()
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className='home'>
      <h1>TodoList</h1>
      <Create/>
      {
        todos.length===0
        ?
        <h3>No Task</h3>
        :
        todos.map(todo => (
          <div className='task'>
            <div className='checkbox' onClick={()=>handleEdit(todo._id)}>
              <span className='fill'>{todo.done ? <BsFillCheckCircleFill/>:<BsCircleFill/>}</span>
              <span className= {todo.done ? "line_through":""}>{todo.task}</span>
            </div>
            <div>
              <span><BsFillTrashFill className='icon' onClick={()=>handleDelete(todo._id)}/></span>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Home