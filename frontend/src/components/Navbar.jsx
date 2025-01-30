import React from 'react'

const Navbar = () => {
  return (
    <div className="text-black p-4 flex justify-between items-center">
      {/* Left Side - EMS Header */}
      <h1 className="text-xl font-bold">EMS</h1>

      {/* Right Side - Profile Link */}
      <a href="#" className="text-black hover:underline">
        Profile
      </a>
    </div>
  )
}

export default Navbar