import { serverUrl } from "@/App";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setuserData } from "@/Store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Signup = () => {
 const [name , setName] = useState("")
 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")
 const [role,setRole] = useState("user")
 const [loding , setLoding] = useState(false)
 const navigate = useNavigate()
  
 const roles = ["user","admin"]

 const dispatch = useDispatch()


 const handleSignup = async (e) => {
   e.preventDefault() 
    setLoding(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`,{
        name,email,password,role
      },{withCredentials:true})
      console.log(result)
      dispatch(setuserData(result.data))
      console.log(result)
      setLoding(false)
    } catch (error) {
      if(error.response) {
        console.log(error.response.data.message)
      }
      console.log(error)
      setLoding(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            onChange={(e)=> setName(e.target.value)}
            value={name}
            placeholder="Enter Your Full Name"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
            type="email"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            placeholder="Enter Your Email"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            placeholder="Enter Password"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          
           {roles.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 border cursor-pointer rounded-md py-2 text-xs sm:text-sm font-medium capitalize transition
                ${
                  role === r
                    ? "bg-blue-500 text-white border-blue-400"
                    : "text-blue-400 border-blue-400"
                }`}
            >
              {r}
            </button>
          ))}

          <button
            type="button"
            onClick={handleSignup}
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? 
          <span onClick={()=> navigate("/login")} className="text-blue-600 cursor-pointer ml-1">
            Login
          </span>
        </p>

      </div>

    </div>
  );
};

export default Signup;