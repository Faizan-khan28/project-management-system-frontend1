import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Signup from "./pages/Signup"
import CreateProject from "./admin/Projects"
import CreateTask from "./admin/Tasks"
import useGetCurrentUser from "./Hooks/useGetCurrentUser"
export const serverUrl = "http://localhost:5000"
import { useSelector } from "react-redux"
import Home from "./pages/Home"
import useGetProjects from "./Hooks/useGetProjects"

function App() {
  useGetCurrentUser()
  useGetProjects()

   const {userData} = useSelector(state=> state.user);

  return (
    <>
    <Routes>
      <Route path="/" element={userData ? <Home/> : <Navigate to={"/signup"} />}/>
      <Route path="/signup" element={!userData ? <Signup/> : <Navigate to={"/"} />}/>
      <Route path="/login" element={!userData ? <Login/> : <Navigate to={"/"} />} />
      <Route path="/project" element={userData? <CreateProject/> : <Navigate to={"/signup"}/>}/>
      <Route path="/task" element={userData ? <CreateTask/> : <Navigate to={"/signup"}/> } />
    </Routes>
    </>
  )
}

export default App
