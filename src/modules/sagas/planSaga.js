import { call, put, takeEvery } from 'redux-saga/effects';
import { planActions } from '../actions/planSlice';
import { loadingActions } from '../actions/loadingSlice';
import { getPlans } from '../../lib/api/plan';

/**
 * 담당자 : 김수현
 */
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

  yield takeEvery(getPlanList, getPlanSaga);
}
