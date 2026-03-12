import AdminDashboard from "@/admin/Admin";
import UserDashboard from "@/Users/User";
import { useSelector } from "react-redux"

const Home = () => {

    const {userData} = useSelector(state=> state.user);
  return (
    <div>
        {userData.role=="user" && <UserDashboard/>}
        {userData.role=="admin" && <AdminDashboard/>}
    </div>
  )
}

export default Home