import { call, put, takeLatest } from 'redux-saga/effects';
import { devicesActions } from '../actions/devicesSlice';
import { getDeviceList } from '../../lib/api/device';
import { loadingActions } from '../actions/loadingSlice';
import { errorActions } from '../actions/errorSlice';

import { getDevicePriceList } from '../../lib/api/device';

// Devices 데이터를 가져오는 Saga (api 호출)
export function* getDevicesSaga(action) {
  const { getDevicesSuccess } = devicesActions;
  const { startLoading, finishLoading } = loadingActions;
  const { initError, setError } = errorActions;
  const { planType, discountType, networkType } = action.payload;
  yield put(startLoading('devices'));
  yield put(initError('devices'));
  try {
    const res = yield call(getDeviceList, {
      planType,
      discountType,
      networkType,
    });
    yield put(
      getDevicesSuccess({
        payload: res.data,
        networkType,
      }),
    );
  } catch (e) {
    console.log(e);
    yield put(setError('devices'));
  } finally {
    yield put(finishLoading('devices'));
  }
}

export function* getDevicePricesSaga(action) {
  const { getDevicePriceSuccess } = devicesActions;
  const { startLoading, finishLoading } = loadingActions;
  const { initError, setError } = errorActions;
  const { discountType, installmentPeriod, networkType, planId } = action.payload;
  yield put(startLoading('price'));
  yield put(initError('price'));
  try {
    const res = yield call(getDevicePriceList, {
      discountType,
      installmentPeriod,
      networkType,
      planId,
    });
    yield put(
      getDevicePriceSuccess({
        payload: res.data,
      }),
    );
  } catch (e) {
    yield put(setError('price'));
  } finally {
    yield put(finishLoading('price'));
  }
}

// Main Saga
export function* devicesSaga() {
  const { getDevice, getDevicePrice } = devicesActions;

  // getDevices action이 실행되면, 마지막으로 호출된 요청만 실행되며 실행내용은 getDeviceSaga 함수이다.
  yield takeLatest(getDevice, getDevicesSaga);
  yield takeLatest(getDevicePrice, getDevicePricesSaga);
  // yield takeLatest(setFilterValue, getDevicesSaga);
}
