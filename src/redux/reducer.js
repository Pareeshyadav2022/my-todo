import { createSlice } from "@reduxjs/toolkit";
 
export const counterSlice = createSlice({
  
  name: "counter",
  initialState: {
    newTempArr: [],
    value: [],
  },
  reducers: {
   
    addTasks: (state, action) => {
      state.value = [...state.value, action.payload];
    },

    updateTask: (state, action) => {
      state.value[action.payload.index].task = action.payload.task;
    },

    deleteTask: (state,action) => {
      const newTempArr = state.value.filter(x=>x.id!==action.payload);
      state.value = newTempArr;
    },

  },
});

export const { addTasks, updateTask, deleteTask } = counterSlice.actions;

export default counterSlice.reducer;
