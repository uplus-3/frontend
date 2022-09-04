import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import devicesSlice from './actions/devicesSlice';
import planSlice from './actions/planSlice';
import loadingSlice from './actions/loadingSlice';
import errorSlice from './actions/errorSlice';
import { devicesSaga } from './sagas/devicesSaga';
import { planSaga } from './sagas/planSaga';

// Root Reducer
// Reducer Combine
const rootReducer = combineReducers({
  devices: devicesSlice,
  plan: planSlice,
  loading: loadingSlice,
  error: errorSlice,
});

export function* rootSaga() {
  // all 은 여러 사가를 동시에 실행시켜준다.
  yield all([devicesSaga(), planSaga()]);
}

export default rootReducer;
