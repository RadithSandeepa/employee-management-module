import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from "react-router-dom";

const Home = () => {
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
            </div>   
        </div>
    </div>
  )
}

export default Home