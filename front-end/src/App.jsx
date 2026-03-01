import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/addTask'
import ShowList from './components/showList'
import UpdateTask from './components/update'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Logout from './components/logout'
function App() {
  

// const [isLoggedIn, setIsLoggedIn] = useState(
//   !!localStorage.getItem("login")
// );

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<ShowList/>} />
      <Route path="/addTask" element={<AddTask/>} />
      <Route path="/updateTask/:id" element={<UpdateTask/>} />
            <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Logout/>} />




    </Routes>
     
    </>
  )
}

export default App
