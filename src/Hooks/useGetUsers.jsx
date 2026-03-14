import { serverUrl } from "@/App"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setusers } from "@/Store/userSlice"
const useGetUsers = () => {

 const dispatch = useDispatch()

 useEffect(()=>{

  const fetchUsers = async ()=>{

   try{

    const res = await axios.get(
      `${serverUrl}/api/user`,
      {withCredentials:true}
    )

    dispatch(setusers(res.data))

   }catch(error){
    console.log(error)
   }

  }

  fetchUsers()

 },[])

}

export default useGetUsers