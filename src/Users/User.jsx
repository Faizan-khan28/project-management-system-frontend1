import { serverUrl } from "@/App"
import axios from "axios"
import React, { useEffect, useState } from "react"

const UserDashboard = () => {

 const [tasks,setTasks] = useState([])

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


 return (

  <div className="p-8">

   <h1 className="text-2xl font-bold mb-6">
    My Tasks
   </h1>


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
         className={`${getStatusColor(task.status)} text-white px-2 py-1 rounded`}
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

  </div>

 )

}

export default UserDashboard