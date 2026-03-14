import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({

  name: "task",

  initialState: {
    tasks: []
  },

  reducers: {

    setTaskData: (state, action) => {
      state.tasks = action.payload
    },

    addTask: (state, action) => {
      state.tasks.push(action.payload)
    }

  }

})

export const { setTaskData, addTask } = taskSlice.actions

export default taskSlice.reducer