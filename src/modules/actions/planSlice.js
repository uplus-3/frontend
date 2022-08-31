import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  '5g': null,
  '4g': null,
  error: null,
};

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    getPlanList: (state, action) => {},
    getPlanListSuccess: (state, action) => {
      const { payload, networkType } = action.payload;
      state[`${networkType}g`] = payload?.planList;
    },
    getPlanFailure: (state, action) => {
      const { error } = action;
      state.error = error;
    },
  },
});

const { actions, reducer } = planSlice;

export const planActions = actions;
export default reducer;
