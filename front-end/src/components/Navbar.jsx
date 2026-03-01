import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { useState } from 'react'
import { API } from './api'

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("login")
 );

 useEffect(() => {
  const handleStorageChange = () => {
    setIsLoggedIn(!!localStorage.getItem("login"));
  }
  window.addEventListener("LocalStorageChanged", handleStorageChange);

  return () => {
    window.removeEventListener("LocalStorageChanged", handleStorageChange);
  };

 }, [])

  return (
    <nav className="navbar">
    <div className="logo">TODO</div>
        
        <ul className='nav-links'>

          {isLoggedIn ? (
            <>
              <li><Link to="/">List</Link></li>
            <li><Link to="/addTask">Add Task</Link></li>
             <li><Link to="/logout">Logout</Link></li>
            </>
          ) : null            }
            </ul>
      
    
    </nav>
  )
}

export default Navbar
