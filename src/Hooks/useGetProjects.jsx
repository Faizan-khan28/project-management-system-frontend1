import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setProjectData } from "@/Store/projectSlice"
import { serverUrl } from "@/App"

const useGetProjects = () => {

 const dispatch = useDispatch()

 useEffect(()=>{

  const fetchProjects = async () => {
    try {

      const res = await axios.get(
        `${serverUrl}/api/project`,
        {withCredentials:true}
      )

      dispatch(setProjectData(res.data))

    } catch (error) {
      console.log(error)
    }
  }

  fetchProjects()

 },[])

}

export default useGetProjects