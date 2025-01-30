import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-4 p-6 bg-transparent rounded-lg w-80">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:border-gray-500"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:border-gray-500"
        />
        <button disabled={loading} onClick={handleClick} className={`p-2 bg-gray-900 text-white font-semibold transition-all cursor-pointer ${
            loading ? "bg-gray-600 cursor-not-allowed" : "hover:bg-gray-700"
        }`}>
          Login
        </button>
        {error && <span className="text-red-500 text-center">{error.message}</span>}
      </div>
    </div>
  );
};

export default Login