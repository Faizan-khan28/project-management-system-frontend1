import { serverUrl } from "@/App";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setProjectData } from "@/Store/projectSlice";
import { useNavigate } from "react-router-dom";


const CreateProject = () => {
  const [projectName,setProjectName] = useState("")
  const [Description,setDescription] = useState("")
  const [startDate,setStartDate] = useState("")
  const [endDate,setEndDate] = useState("")
  const [status,setStatus] = useState("Status")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleProjects = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(`${serverUrl}/api/project`,{
        projectName,Description,startDate,endDate,status
      },{withCredentials:true})
      console.log(result)
      dispatch(setProjectData(result.data.project))
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create New Project
        </h2>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Project Name"
            onChange={(e)=> setProjectName(e.target.value)}
            value={projectName}
            className="border px-4 py-2 rounded-md"
          />

          <textarea
            placeholder="Project Description"
            onChange={(e)=> setDescription(e.target.value)}
            value={Description}
            className="border px-4 py-2 rounded-md"
          />

          <div className="flex justify-center items-center">
           <div>
             <label className="text-center">Start Date</label>
            <input
            type="date"
            onChange={(e)=> setStartDate(e.target.value)}
            value={startDate}
            className="border px-4 py-2 rounded-md"
          />
           </div>
          <div>
            <label className="text-center">End Date</label>
          <input
            type="date"
            onChange={(e)=> setEndDate(e.target.value)}
            value={endDate}
            className="border px-4 py-2 rounded-md"
          />
          </div>
          </div>

          <select
           onChange={(e)=>setStatus(e.target.value)}
           value={status}
           className="border px-4 py-2 rounded-md">
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>

          <button
            type="button"
            onClick={handleProjects}
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Create Project
          </button>

        </div>

      </div>

    </div>
  );
};

export default CreateProject;