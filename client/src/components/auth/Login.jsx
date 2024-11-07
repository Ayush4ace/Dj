import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_USER_END_POINT } from "../../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const loading = useSelector((store) => store.auth.loading); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${API_USER_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
    console.log(input);
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 required"
            />
          </div>
          <div className="my-2">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="role"
              id="student"
              value="student"
              checked={input.role === "student"}
              onChange={changeEventHandler}
              className="mr-2"
            />
            <label htmlFor="student" className="mr-4">
              Student
            </label>

            <input
              type="radio"
              name="role"
              id="recruiter"
              value="recruiter"
              checked={input.role === "recruiter"}
              onChange={changeEventHandler}
              className="mr-2"
            />
            <label htmlFor="recruiter">Recruiter</label>
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-green-500'}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0016 0H4z" />
                </svg>
                Please wait...
              </span>
            ) : (
              "Login"
            )}
          </button>
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-800">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
