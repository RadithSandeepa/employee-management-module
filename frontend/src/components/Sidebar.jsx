import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg flex flex-col justify-center items-center text-2xl`}
      >
        <ul className="space-y-6">
          <li>
            <Link to="/employees" className="hover:opacity-70 transition-opacity duration-500 ease-in-out">
              Employees
            </Link>
          </li>
          <li>
            <Link to="/users" className="hover:opacity-70 transition-opacity duration-500 ease-in-out">
              Users
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="hover:opacity-70 transition-opacity duration-500 ease-in-out">
             Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="relative w-10 h-8 flex flex-col justify-between items-center z-50 cursor-pointer"
      >
        <span
          className={`block h-1 w-10 rounded transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-3 bg-white" : "bg-black"
          }`}
        ></span>
        <span
          className={`block h-1 w-10 rounded transition-all duration-300 ${
            isOpen ? "opacity-0" : "bg-black"
          }`}
        ></span>
        <span
          className={`block h-1 w-10 rounded transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-4 bg-white" : "bg-black"
          }`}
        ></span>
      </button>
    </div>
  );
};

export default Sidebar;
