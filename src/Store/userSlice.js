import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name : "user",
    initialState: {
        userData : null,
        users : [],
    },
    reducers: {
        setuserData: (state,action) => {
            state.userData=action.payload
        },
        setusers: (state,action) => {
            state.users=action.payload
        }
    }
})

export const {setuserData,setusers}=userSlice.actions
export default userSlice.reducer