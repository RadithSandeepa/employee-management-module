import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
import Sidebar from './Sidebar';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="text-black p-4 flex justify-between items-center">
      {/* Left Side - EMS Header */}
      <Sidebar />
      {/* Right Side - Profile Link */}
      <Link to={`/${user._id}`} className="text-black hover:opacity-70 transition-opacity duration-500 ease-in-out">
        Profile
      </Link>
    </div>
  )
}

export default Navbar