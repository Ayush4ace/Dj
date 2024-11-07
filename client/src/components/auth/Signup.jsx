import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_USER_END_POINT } from "../../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";


const Signup = () => {
    const[input, setInput] = useState({
        fullName: "",
        email: "",
        password: "",
        phoneNo:"",
        role:"",
        file: ""
    });

    const navigate = useNavigate()
    const {loading} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const changeEventHandler = (e)=>{
        
        setInput({...input, [e.target.name]: e.target.value});

    }

    const changeFileHandler = (e)=>{
        setInput({...input, file:e.target.files?.[0]});
    }

    const sumbitHandler = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("password", input.password);
        formData.append("phoneNo", input.phoneNo);
        formData.append("role", input.role)
        if(input.file){
          formData.append("file", input.file);
        }
        console.log([...formData]);
        try {
          dispatch(setLoading(true));
          const res = await axios.post(`${API_USER_END_POINT}/register`, formData, {
            headers:{
              "Content-Type": "multipart/form-data"
            },
            withCredentials: true
          });

          if(res.data.success){
            navigate("/login")
          }
        } catch (error) {
          console.error(error);
        }
        finally{
          dispatch(setLoading(false));
        }
        
    }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={sumbitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Signup</h1>
          <div className="my-2">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="fullname"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullname"
              placeholder="zoro"
              value={input.fullName}
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 required"
            />
          </div>
          <div className="my-2">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="zoro@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 required"
            />
          </div>
          <div className="my-2">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 required"
            />
          </div>
          <div className="my-2">
            <label className="block text-sm font-medium mb-2" htmlFor="phoneNo">
              Phone No.
            </label>
            <input
              type="number"
              name="phoneNo"
              id="phoneNo"
              value={input.phoneNo}
              onChange={changeEventHandler}
              placeholder="phoneNo"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 required"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="radio"
                name="role"
                id="student"
                value="student"
                checked={input.role === 'student'}
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
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="mr-2"
              />
              <label htmlFor="recruiter">Recruiter</label>
              
            </div>
            <div className="flex items-center gap-2 ">
                <div className="my-4 ">
                  <label htmlFor="profileImage">Profile Image</label>
                  <input
                    type="file"
                    name="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={changeFileHandler}
                  />
                </div>
              </div>
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-green-500 rounded"> Signup </button>
          <span className="text-sm"> Already have an account? <Link to="/login" className="text-blue-800">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
