import React, {useContext} from 'react'
import Navbar from '../components/Navbar'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const Home = () => {

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout"); // Call backend to clear cookie
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className='min-h-screen flex flex-col'> 
        <Navbar /> 
        <div className='flex flex-grow items-center justify-center'>
          <p className="text-6xl md:text-5xl sm:text-4xl text-center">
            Employee Management System
          </p>
        </div>
    </div>
  )
}

export default Home