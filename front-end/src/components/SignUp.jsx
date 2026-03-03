import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { API } from './api'
const SignUp = () => {
    const [signupData, setSignupData] = useState()
    const navigate = useNavigate()
    useEffect(() => {
         if(localStorage.getItem('login')){
            alert("You are already logged in...please log out to create new account")
            navigate('/')
          }
    }, [])
    const handleSignUp =async ()=>{
        const response = await fetch(API.SignUp, {
            method: 'POST',
            body: JSON.stringify(signupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json()
        if(result.success){
        document.cookie = `token=${result.token}`
        localStorage.setItem('token', result.token)
        //localStorage.setItem('signup',signupData.email)
        navigate('/login')
    }
    }


  return (
       <>
        <><h1>Sign Up</h1></>
        <div className='add-task-container'>    
        <label htmlFor="taskName">Name</label>
        <input type="text" placeholder='Task Name' id="taskName" value={signupData?.name || ""}  
        onChange={(e) => setSignupData({...signupData, name:e.target.value})}/>
        
         <label htmlFor="taskName">Email</label>
        <input type="email" placeholder="enter your mail" name="Email" id="taskName" value={signupData?.email || ""}
        onChange={(e) => setSignupData({...signupData, email:e.target.value})} />

        <label htmlFor="taskName">Password</label>
        <input type="password" name="password" id="password"  value={signupData?.password || ""}
        onChange={(e) => setSignupData({...signupData, password:e.target.value})} />
        
        <button onClick={handleSignUp} type='submit'>Sign Up</button>
                <Link to={'/login'}>Log In</Link>

    </div>
    </>
  )
}

export default SignUp
