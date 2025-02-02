import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="text-black p-4 flex justify-between items-center">
      {/* Left Side - EMS Header */}
      <h1 className="text-xl font-bold">EMS</h1>

      {/* Right Side - Profile Link */}
      <Link to={`/${user._id}`} className="text-black hover:underline">
        Profile
      </Link>
    </div>
  )
}

export default Navbar