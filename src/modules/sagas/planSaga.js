import { call, put, delay, takeLatest } from 'redux-saga/effects';
import { planActions } from '../actions/planSlice';
import { loadingActions } from '../actions/loadingSlice';
import { getPlans } from '../../lib/api/plan';

// Plan데이터 호출
export function* getPlanSaga(action) {
  const { startLoading, finishLoading } = loadingActions;
  const { getPlanListSuccess, getPlanFailure } = planActions;
  yield put(startLoading('plan'));
  try {
    const res = yield call(getPlans, {
      networkType: action.payload,
    });
    yield put(
      getPlanListSuccess({
        payload: res.data,
        networkType: action.payload,
      }),
    );
  } catch (e) {
    console.log(e);
    yield put(
      getPlanFailure({
        payload: e,
        error: true,
      }),
    );
  } finally {
    yield put(finishLoading('plan'));
  }
}

export function* planSaga() {
  const { getPlanList } = planActions;

  yield takeLatest(getPlanList, getPlanSaga);
}
