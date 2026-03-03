import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from './api'

const Login = () => {
        const [loginData, setloginData] = useState()
        const Navigate = useNavigate()  

        useEffect(() => {
          if(localStorage.getItem('login')){
            alert("You are already logged in..naviting to home page")
            Navigate('/')
          }
        }, [])
        
            const handleLogin =async ()=>{
                const response = await fetch(API.login, {
                    method: 'POST',
                    body: JSON.stringify(loginData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const result = await response.json()
                console.log(result)
                if (result.success) {
                  document.cookie = `token=${result.token}`
                  localStorage.setItem('token', result.token)
                  localStorage.setItem('login',loginData.email)
                  window.dispatchEvent(new Event("LocalStorageChanged"))
                  Navigate('/')
                }
                else{
                    alert("Invalid credentials...user not found") 
                }
                
            }
    
  return (
    <>
    <h1>Login</h1>
        <div className='add-task-container'>    
        
        
        <label htmlFor="taskName">Email</label>
        <input type="email" placeholder="enter your mail" name="Email" id="taskName" value={loginData?.email || ""}
        onChange={(e) => setloginData({...loginData, email:e.target.value})} />

        <label htmlFor="taskName">Password</label> 
        <input type="password" name="password" id="password" value={loginData?.password || ""}
        onChange={(e) => setloginData({...loginData, password:e.target.value})} />
        
        <button onClick={handleLogin} type='submit'>Log In</button>
        <Link to={'/signup'}>SignUp</Link>
    </div>
    </>
  )
}

export default Login
