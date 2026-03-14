import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { serverUrl } from "@/App";
import { setuserData } from "@/Store/userSlice";
import { useSelector } from "react-redux";

const AdminDashboard = () => {

  const {projectData} = useSelector(state=>state.project)
  console.log(projectData)
  const {userData} = useSelector(state=>state.user)
  const {tasks} = useSelector(state=>state.task)
  const firstLetter = userData?.name?.charAt(0).toUpperCase()
   const navigate = useNavigate()
   const dispatch = useDispatch()

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

  const getStatusColor = (status) => {
  if (status === "Pending") return "text-yellow-500";
  if (status === "Active") return "text-blue-500";
  if (status === "Completed") return "text-green-500";
};


  return (
    <div className="min-h-screen bg-gray-100 flex">

      <div className="flex-1">

        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

          <h2 className="text-xl font-semibold">
            Admin Dashboard
          </h2>

          <div className="flex items-center gap-4">

           <button onClick={()=> navigate("/project")} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
             + Create Project
           </button>

           <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
             + Log Out
           </button>

            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
             {firstLetter}
            </div>
          </div>

        </div>


        <div className="p-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-gray-500">Total Projects</h3>
              <p className="text-2xl font-bold">{projectData.length}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-gray-500">Total Tasks</h3>
              <p className="text-2xl font-bold">{tasks.length}</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-gray-500">Team Members</h3>
              <p className="text-2xl font-bold">{projectData.members}</p>
            </div>

          </div>


          <div className="bg-white shadow rounded-lg p-6">


            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>
                  <tr className="border-b">
                    <th className="py-2">Project Name</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>View Task</th>
                    <th>Create Task</th>
                  </tr>
                </thead>

                <tbody>

                  {
                    projectData && projectData.map((project)=> (
                      <tr key={project._id} className="border-b">
                       <td className="py-2">{project.projectName}</td>
                       <td className={`${getStatusColor(project.status)} text-white text-sm`}>{project.status}</td>
                       <td>{project.startDate}</td>
                       <td>{project.endDate}</td>
                       <td>
                         <button
                         onClick={()=> navigate(`/project/${project._id}`)}
                          className=" bg-blue-600 py-1 px-2 rounded-xl text-white"
                         >
                          View Tasks
                         </button>
                        </td>
                        <td>
                          <button className=" bg-blue-600 py-1 px-2 rounded-xl text-white" onClick={()=>navigate(`/create-task/${project._id}`)}>
                           Create Task
                          </button>
                        </td>
                     </tr>
                    ))
                  }
                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;