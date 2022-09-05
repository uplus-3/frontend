import { createSlice, createSelector } from '@reduxjs/toolkit';

/**
 * 담당자 : 김수현
 */
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
  let networkType = '5g';
  if (state['4g']?.some((plan) => plan.id === planId)) {
    networkType = '4g';
  }

  let st = planId - 1;
  let ed = planId + 1;

  // planId 처음과 끝 예외처리
  if (planId === 1) {
    st = 0;
    ed = 2;
  } else if (planId === state[networkType]?.length) {
    st = state[networkType]?.length - 2;
    ed = state[networkType]?.length;
  }

  return state[networkType]
    ?.filter((plan) => plan.id >= st && plan.id < ed + 1)
    .sort((a, b) => b.price - a.price);
};

export const getPlanInfo = (state, planId) => {
  return (
    state['5g']?.find((plan) => plan.id === planId) ||
    state['4g']?.find((plan) => plan.id === planId)
  );
};
export default reducer;
