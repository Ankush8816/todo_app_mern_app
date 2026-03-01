import React from 'react'
import { Form } from 'react-router-dom'
import './addTask.css'
import { useNavigate } from 'react-router-dom'
import { API } from './api'


const AddTask = () => {
    const [task, setTask] = React.useState()

    const navigate = useNavigate()
        const handleSubmit = async (e) => {
            e.preventDefault()
            //console.log(task)
             const response = await fetch(API.addtasks, {
                    method: 'POST',
                        credentials: 'include',
                    body: JSON.stringify(task),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    
                })
             navigate('/')
            const result = await response.json()
            //console.log(result)
           
        }
  return (

    <>
    <h1>Add New Task</h1>
        <div className='add-task-container'>    
        <label htmlFor="taskName">Task Name</label>
        <input type="text" placeholder='Task Name' id="taskName"  
        onChange={(e) => setTask({...task, title:e.target.value})}/>
        
        <label htmlFor="taskDescription">Task Description</label>
        <input type="text"  placeholder='Description' id="taskDescription" value={task?.description || ''} 
        onChange={(e) => setTask({...task, description:e.target.value})}/>
        
        <button onClick={handleSubmit} type='submit'>Add Task</button>
    </div>
    </>
  )
}

export default AddTask