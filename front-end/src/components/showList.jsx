import React, { use } from 'react'
import './showList.css'
import { useState, useEffect } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import { API } from './api'

const ShowList = () => {

    const [tasks, setTasks] = useState()

    useEffect(() => {
        if (!localStorage.getItem('login')) {
            alert("Please log in to view your tasks")
            window.location.href = '/login'
        }
        fetchTask()
    }, [])

    const fetchTask = async () =>{
        const response = await fetch(API.tasks,{
            //credentials: 'include'
        
             headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
        
        })
        const fetchData = await response.json()
        console.log(fetchData)
        setTasks(fetchData.taskData)
    }
    
    
    const handleDelete = async (id) => {    
        const deletedItem= await fetch(`${API.deleteTask}/${id}`, {
            method: 'DELETE',
            //credentials: 'include',
             headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
        })
        fetchTask()
    }

return (
    <div className="task-list-container">
        {tasks && tasks.map((task, index) => (
            <div key={task._id} className="task-item">
                {/* badge + title */}
                <div className="card-header">
                    <span className="badge">{index + 1}</span>
                    <h3>{task.title}</h3>
                </div>
                <p className="description">{task.description}</p>
                {/* delete icon floating top-right */}
                <MdDeleteForever
                    className="delete-icon"
                    onClick={() => handleDelete(task._id)}
                />
                <div className="actions">
                    <Link className="update-btn" to={`/updateTask/${task._id}`}>Update</Link>
                </div>
            </div>
        ))}
        {tasks && tasks.length === 0 && <h1>No tasks available..</h1>}
    </div>
  )

}
export default ShowList
