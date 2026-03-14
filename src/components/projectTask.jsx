import { serverUrl } from "@/App";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProjectTask = () => {

  const { projectId } = useParams()
  const navigate = useNavigate()

  const [tasks,setTasks] = useState([])

  const getStatusColor = (status) => {
    if(status === "Pending") return "bg-yellow-500"
    if(status === "Started") return "bg-blue-500"
    if(status === "Completed") return "bg-green-500"
    return "bg-gray-400"
  }

  useEffect(()=>{

    const fetchTasks = async ()=>{
      try {
        const res = await axios.get(
          `${serverUrl}/api/task/${projectId}`,
          {withCredentials:true}
        )
        setTasks(res.data.tasks)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }

    }

    fetchTasks()

  },[projectId])


  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Project Tasks
        </h1>

        <button
          onClick={()=>navigate(`/create-task/${projectId}`)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Task
        </button>

      </div>


      <table className="w-full border">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-3 text-left">Task</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Priority</th>
            <th className="p-3 text-left">Assigned Users</th>
            <th className="p-3 text-left">Due Date</th>
          </tr>

        </thead>


        <tbody>

          {tasks.map(task => (

            <tr key={task._id} className="border-t">

              <td className="p-3">
                {task.title}
              </td>

              <td className="p-3">
                <span className={`${getStatusColor(task.status)} text-white px-2 py-1 rounded`}>
                  {task.status}
                </span>
              </td>

              <td className="p-3">
                {task.priority}
              </td>

              <td className="p-3">

                {task.assignedTo.map(user => (
                  <span
                   key={user._id}
                   className="bg-gray-200 px-2 py-1 rounded mr-2"
                  >
                    {user.name}
                  </span>
                ))}

              </td>

              <td className="p-3">
                {task.dueDate?.slice(0,10)}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default ProjectTask