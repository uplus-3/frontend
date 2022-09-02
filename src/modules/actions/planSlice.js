import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  '5g': [],
  '4g': [],
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
export const getRecommendedPlan = (state, planId) => {
  let planIdx = planId - 1;
  let networkType = '5g';
  if (state['4g']?.some((plan) => plan.id === planId)) {
    networkType = '4g';
    planIdx -= state['5g']?.length;
  }
  let st = planIdx - 1;
  let ed = planIdx + 1;

  // planId 처음과 끝 예외처리
  if (planIdx === 0) {
    st = 0;
    ed = 2;
  } else if (planIdx === state[networkType]?.length - 1) {
    st = state[networkType]?.length - 3;
    ed = state[networkType]?.length - 1;
  }

  return state[networkType]?.slice(st, ed + 1);
};

export const getPlanInfo = (state, planId) => {
  return (
    state['5g']?.find((plan) => plan.id === planId) ||
    state['4g']?.find((plan) => plan.id === planId)
  );
};
export default reducer;
