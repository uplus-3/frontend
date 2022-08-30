import { call, put, delay, takeLatest } from 'redux-saga/effects';
import { devicesActions } from '../actions/devicesSlice';
import { getDeviceList } from '../../lib/api/device';

// Devices 데이터를 가져오는 Saga (api 호출)
export function* getDevicesSaga(action) {
  const { getDevicesSuccess } = devicesActions;
  try {
    const res = yield call(getDeviceList, {
      discountType: -1,
      installmentPeriod: 24,
      networkType: 5,
      plan: -1,
    });
    yield put(getDevicesSuccess(res.data));
  } catch (e) {
    console.log(e);
  }
}

// Main Saga
export function* devicesSaga() {
  const { getDevice, setFilterValue } = devicesActions;

  // getDevices action이 실행되면, 마지막으로 호출된 요청만 실행되며 실행내용은 getDeviceSaga 함수이다.
  yield takeLatest(getDevice, getDevicesSaga);
  yield takeLatest(setFilterValue, getDevicesSaga);
}
