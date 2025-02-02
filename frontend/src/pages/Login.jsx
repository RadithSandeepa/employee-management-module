import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Trim values to prevent spaces as input
    const username = credentials.username.trim();
    const password = credentials.password.trim();

    // Validate inputs before making the API call
    if (!username || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        toast.success("Login successful!");
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
        toast.error("You are not allowed!");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      toast.error(`${err.response?.data?.message || "Oops! Something went wrong."}`);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-4 p-6 bg-transparent rounded-lg w-80">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="p-2 border border-gray-300 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="p-2 border border-gray-300 focus:outline-none"
        />
        <button disabled={loading} onClick={handleClick} className={`p-2 bg-gray-900 text-white font-semibold transition-all cursor-pointer ${
            loading ? "bg-gray-600 cursor-not-allowed" : "hover:scale-110 transition-all duration-200"
        }`}>
          Login
        </button>
        {/* {error && <span className="text-red-500 text-center">{error.message}</span>} */}
      </div>
    </div>
  );
};

export default Login