import { createSlice } from "@reduxjs/toolkit";
const projectSlice = createSlice({
    name : "project",
    initialState: {
        projectData : [],
    },
    reducers: {
        setProjectData: (state,action) => {
            state.projectData=action.payload
        },
        addProject: (state, action) => {
         state.projectData.push(action.payload);
       },
    }
})

export const {setProjectData,addProject}=projectSlice.actions
export default projectSlice.reducer