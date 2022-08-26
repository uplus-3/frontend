import { put, takeLatest } from 'redux-saga/effects';
import { devicesActions } from '../actions/devicesSlice';

// Devices 데이터를 가져오는 Saga (api 호출)
export function* getDevicesSaga(action) {
  const { getDevicesSuccess } = devicesActions;
  yield put(getDevicesSuccess());
}

// Main Saga
export function* devicesSaga() {
  const { getDevices } = devicesActions;

  // getDevices action이 실행되면, 마지막으로 호출된 요청만 실행되며 실행내용은 getDeviceSaga 함수이다.
  yield takeLatest(getDevices, getDevicesSaga);
}
