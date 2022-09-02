import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  '5g': null,
  '4g': null,
  company: [],
  error: null,
};

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    getPlanList: (state, action) => {},
    getPlanListSuccess: (state, action) => {
      const { payload, networkType } = action.payload;
      console.log(action.payload);
      state[`${networkType}g`] = payload?.planList;
    },
    getPlanFailure: (state, action) => {
      const { error } = action;
      state.error = error;
    },
    getCompanyList: (state, action) => {},
    getCompanyListSuccess: (state, action) => {
      const { payload } = action.payload;
      state.company = payload?.company;
    },
  },
});

const { actions, reducer } = planSlice;

export const planActions = actions;
export default reducer;
