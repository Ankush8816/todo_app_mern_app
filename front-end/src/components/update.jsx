import React, { useState, useEffect } from 'react'
import { Form, useParams } from 'react-router-dom'
import './addTask.css'
import { useNavigate} from 'react-router-dom'
import { API } from './api'


const UpdateTask = () => {
    const [task, setTask] = useState()
    
    const {id} = useParams();
    const navigate = useNavigate()

    useEffect ( () => {
      getUpdatedData()
    }, [])
    

    const getUpdatedData = async() =>{
        const responce =  await fetch(`${API.UpdateTask}/${id}`,
        {
            credentials: 'include'
        })
        const result = await responce.json()
        console.log(result)
        setTask(result.taskData)
    }    

    const handleUpdateTask = async() => {
        const responce =  await fetch("http://localhost:5000/update-task/",{
                    method: 'PUT',
                     credentials: 'include',
                    body: JSON.stringify(task),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                navigate('/')
        }
        
  return (
    <>
        <div className='add-task-container'>    
        <label htmlFor="taskName">Task Name</label>
        <input type="text" placeholder='Task Name' id="taskName" value={task?.title || ''} 
        onChange={(e) => setTask({...task, title:e.target.value})}/>
        
        <label htmlFor="taskDescription">Task Description</label>
        <input type="text" placeholder='Description' id="taskDescription" value={task?.description || ''} 
        onChange={(e) => setTask({...task, description:e.target.value})}/>
        
        <button onClick={handleUpdateTask} type='submit'>Update Task</button>
    </div>
    </>
  )
}

export default UpdateTask