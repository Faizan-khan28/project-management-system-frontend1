import { serverUrl } from "@/App";
import { setTaskData } from "@/Store/taskSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const CreateTask = () => {

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [dueDate,setDueDate] = useState("")
  const [priority,setPriority] = useState("")
  const [status,setStatus] = useState("")
  const [projectId,setProjectId] = useState("")
  const [assignedTo,setAssignedTo] = useState([])

  const { userData,users } = useSelector(state => state.user);
  const {projectData} = useSelector(state=>state.project)
  console.log(users)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleTask = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/task`,
        {
          projectId,title,description,dueDate,priority,status,assignedTo 
        },
        { withCredentials:true }
      )
      console.log(result.data)
      dispatch(setTaskData(result.data.task))
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Task
        </h2>

        <div className="flex flex-col gap-4">
          <select
           value={projectId}
           onChange={(e)=> setProjectId(e.target.value)}
           className="border px-4 py-2 rounded-md"
          >

           <option value="">Select Project</option>

           {
            projectData && projectData.map((project)=> (
              <option key={project._id} value={project._id}>
              {project.projectName}
            </option>
            ))
           }

          </select>


          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            className="border px-4 py-2 rounded-md"
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            className="border px-4 py-2 rounded-md"
          />


          <input
            type="date"
            value={dueDate}
            onChange={(e)=> setDueDate(e.target.value)}
            className="border px-4 py-2 rounded-md"
          />

          <select
           value={priority}
           onChange={(e)=> setPriority(e.target.value)}
           className="border px-4 py-2 rounded-md"
          >

            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>

          </select>


          <select
           value={status}
           onChange={(e)=> setStatus(e.target.value)}
           className="border px-4 py-2 rounded-md"
          >

            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Started">Started</option>
            <option value="Completed">Completed</option>

          </select>

          <select
           multiple
           className="border px-4 py-2 rounded-md"
           onChange={(e)=> setAssignedTo(
             [...e.target.selectedOptions].map(o => o.value)
           )}
          >

            {
              users && users.map((user)=> (
                <option key={user._id} value={user._id}>
                {user.name}
              </option>
              ))
            }

          </select>


          <button
            type="button"
            onClick={handleTask}
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Create Task
          </button>

        </div>

      </div>

    </div>
  );
};

export default CreateTask;