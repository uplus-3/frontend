import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state, action) => {
      state = {
        ...state,
        [action.payload]: true,
      };
    },
    finishLoading: (state, action) => {
      state = {
        ...state,
        [action.payload]: false,
      };
    },
  },
});

const { actions, reducer } = loadingSlice;

export const loadingActions = actions;
export default reducer;
