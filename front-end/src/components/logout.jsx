import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from './api'

const Logout = () => {
    const navigate = useNavigate()  

useEffect(() => {
    localStorage.removeItem('login')
    alert("You have been logged out successfully..naviting to login page")
    window.dispatchEvent(new Event("LocalStorageChanged"))
    
    navigate('/login')
}, [])
}

export default Logout
