import { serverUrl } from "@/App"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { setuserData } from "@/Store/userSlice"
import { useNavigate } from "react-router-dom"

const UserDashboard = () => {

 const [tasks,setTasks] = useState([])
 const [seconds, setSeconds] = useState(0);
 const [running, setRunning] = useState(false);
 const navigate = useNavigate()

 const getStatusColor = (status) => {
  if(status === "Pending") return "bg-yellow-500"
  if(status === "Started") return "bg-blue-500"
  if(status === "Completed") return "bg-green-500"
  return "bg-gray-400"
 }

 useEffect(()=>{

  const fetchMyTasks = async () => {

   try {

    const res = await axios.get(
      `${serverUrl}/api/task/mytasks`,
      {withCredentials:true}
    )

    setTasks(res.data.tasks)
    console.log(res.data)
   } catch (error) {
    console.log(error)
   }

  }

  fetchMyTasks()

 },[])


 const updateStatus = async (taskId,status) => {

  try {

   await axios.put(
    `${serverUrl}/api/task/status/${taskId}`,
    {status},
    {withCredentials:true}
   )

   setTasks(prev =>
    prev.map(task =>
      task._id === taskId ? {...task,status} : task
    )
   )

  } catch (error) {
   console.log(error)
  }

 }

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


  useEffect(() => {

    let interval;

    if (running) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);

  }, [running]);

  // time format
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const handleStart = () => {
    setRunning(true);
  };

  const handlePause = () => {
    setRunning(false);
  };

  const handleStop = () => {
    setRunning(false);
    setSeconds(0);
  };


 return (

  <div className="p-8">

   <div className="flex justify-between items-center">
    <div>
    <h1 className="text-2xl font-bold mb-6">
    My Tasks
   </h1>
    </div>
   <div>
    <button onClick={handleLogout} className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-md">
    + Log Out
  </button>
   </div>
   </div>

   <table className="w-full border">

    <thead className="bg-gray-100">

     <tr>
      <th className="p-3 text-left">Task</th>
      <th className="p-3 text-left">Project</th>
      <th className="p-3 text-left">Priority</th>
      <th className="p-3 text-left">Due Date</th>
      <th className="p-3 text-left">Status</th>
     </tr>

    </thead>


    <tbody>

     {tasks.map(task => (

      <tr key={task._id} className="border-t">

       <td className="p-3">
        {task.title}
       </td>

       <td className="p-3">
        {task.projectId?.projectName}
       </td>

       <td className="p-3">
        {task.priority}
       </td>

       <td className="p-3">
        {task.dueDate?.slice(0,10)}
       </td>

       <td className="p-3">

        <select
         value={task.status}
         onChange={(e)=>updateStatus(task._id,e.target.value)}
         className={`${getStatusColor(task.status)} text-white cursor-pointer px-2 py-1 rounded`}
        >

         <option>Pending</option>
         <option>Started</option>
         <option>Completed</option>

        </select>

       </td>

      </tr>

     ))}

    </tbody>

   </table>

   <div className="p-10 flex flex-col items-center">

      <h1 className="text-2xl font-bold mb-6">
        Task Timer
      </h1>

      <div className="text-4xl font-mono mb-6">
        {hours.toString().padStart(2,"0")}:
        {minutes.toString().padStart(2,"0")}:
        {secs.toString().padStart(2,"0")}
      </div>

      <div className="flex gap-4">

        <button
          onClick={handleStart}
          className="bg-green-600 text-white cursor-pointer px-4 py-2 rounded"
        >
          Start
        </button>

        <button
          onClick={handlePause}
          className="bg-yellow-500 text-white cursor-pointer px-4 py-2 rounded"
        >
          Pause
        </button>

        <button
          onClick={handleStop}
          className="bg-red-600 text-white cursor-pointer px-4 py-2 rounded"
        >
          Stop
        </button>

      </div>

    </div>

  </div>

 )

}

export default UserDashboard