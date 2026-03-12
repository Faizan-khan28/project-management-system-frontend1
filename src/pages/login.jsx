import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setuserData } from "@/Store/userSlice";
import { useDispatch } from "react-redux";


const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const dispatch = useDispatch()

  const handleLogin = async () => {
    setLoding(true)
    if(!password) {
    alert("Please Enter Password")
    }
    if(!email) {
    alert("Please Enter Email")
    }
    try {
      const result = await axios.post(`${serverUrl}/api/auth/login`,{
        email,password,
      },{withCredentials:true})
      dispatch(setuserData(result.data))
      console.log(result)
      setLoding(false)
    } catch (error) {
      console.log(error)
      setLoding(false)
    }
  }

  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Project Manager
        </h2>

        <form className="flex flex-col gap-4">

          <input
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            placeholder="Enter Your Email"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Enter Your Password"
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            onClick={handleLogin}
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? <span onClick={()=>navigate("/signup")} className="text-blue-600 cursor-pointer">Register</span>
        </p>

      </div>

    </div>
  );
};

export default Login;