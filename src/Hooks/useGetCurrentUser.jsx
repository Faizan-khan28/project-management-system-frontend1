import axios from "axios"
import { serverUrl } from "@/App"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setuserData } from "@/Store/userSlice"

const useGetCurrentUser = () => {
   const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setuserData(result.data))
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
}

export default useGetCurrentUser