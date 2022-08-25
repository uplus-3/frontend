import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import devicesSlice from './actions/devicesSlice';
import { devicesSaga } from './sagas/devicesSaga';

// Root Reducer
// Reducer Combine
const rootReducer = combineReducers({
  devices: devicesSlice,
});

export function* rootSaga() {
  // all 은 여러 사가를 동시에 실행시켜준다.
  yield all([devicesSaga()]);
}

export default rootReducer;
