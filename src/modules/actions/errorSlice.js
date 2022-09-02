import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    initError: (state, action) => {
      state[action.payload] = false;
    },
    setError: (state, action) => {
      state[action.payload] = true;
    },
  },
});

const { actions, reducer } = errorSlice;

export const errorActions = actions;
export default reducer;
