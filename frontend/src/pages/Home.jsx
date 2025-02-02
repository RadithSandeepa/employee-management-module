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
        <div>
            <div className="flex-1 flex flex-col items-center justify-center gap-4 h-[80vh]">
            <Link
            to="/employees"
            className="text-black text-xl font-semibold hover:text-gray-700 cursor-pointer"
            >
            Employees
            </Link>
            <Link
            to="/users"
            className="text-black text-xl font-semibold hover:text-gray-700 cursor-pointer"
            >
            Users
            </Link>
            <button
              onClick={handleLogout}
              className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
            >
              Logout
            </button>
            </div>   
        </div>
    </div>
  )
}

export default Home