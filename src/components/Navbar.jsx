import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "@/App";

export default function Navbar() {

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {

      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true
      })

      dispatch(setuserData(null))
      navigate("/login")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <nav className="w-full py-4 bg-gray-900 text-white shadow-md">
        <div className="px-6 py-3 flex items-center justify-between">

          <h1 onClick={()=> navigate("/")} className="text-xl font-bold text-blue-400">
            ProjectManager
          </h1>

          <div className="hidden md:flex items-center gap-8">
            <Link to={"/"} className="hover:text-blue-400">Dashboard</Link>
            <Link to={"/project"} className="hover:text-blue-400">Projects</Link>
            <Link to={"/task"} className="hover:text-blue-400">Tasks</Link>
          </div>

          <GiHamburgerMenu className="md:hidden text-2xl" onClick={()=> setOpen(true)} />

        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >

        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold">Menu</h2>

          <ImCross onClick={()=> setOpen(false)} />
        </div>

        <div className="flex flex-col gap-6 p-6">

          <a href="#" className="hover:text-blue-400">
            Dashboard
          </a>

          <a href="#" className="hover:text-blue-400">
            Projects
          </a>

          <a href="#" className="hover:text-blue-400">
            Tasks
          </a>

        </div>
      </div>
    </>
  );
}