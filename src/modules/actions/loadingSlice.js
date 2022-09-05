import { createSlice } from '@reduxjs/toolkit';

/**
 * 담당자 : 김수현
 */
const initialState = {};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state, action) => {
      state[action.payload] = true;
    },
    finishLoading: (state, action) => {
      state[action.payload] = false;
    },
  },
});

const { actions, reducer } = loadingSlice;

export const loadingActions = actions;
export default reducer;
