//import React, { useState } from "react";
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: [{ id: new Date().valueOf(), task: "Todo 1" }],
  },
  reducers: {
    addTasks: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    updateTask: (state, action) => {
      state.value[action.payload.index].task = action.payload.task;
    },
    deleteTask: (state, action) => {
      delete state.value[action.payload.index].task;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTasks, updateTask, deleteTask } = counterSlice.actions;

export default counterSlice.reducer;
