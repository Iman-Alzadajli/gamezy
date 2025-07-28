// settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  counter: 0,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decreaseCount: (state) => {
      state.counter -= 1;
    },
    resetCounter: (state) => {
      state.counter = 0;
    }
  },
});

export const { increment, decreaseCount, resetCounter } = settingsSlice.actions;
export default settingsSlice.reducer;
