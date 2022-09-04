import { createSlice } from '@reduxjs/toolkit';

import { FILTER_DATA } from '../../components/device/DeviceListFileterContents';

const ALL = 'all';
const LAUNCH = 'launch';
const PURCHASE = 'purchase';
const PRICE = 'price';
const ETC = '기타';
const SAMSUNG = '삼성';
const APPLE = '애플';

const initialState = {
  devices: null,
  price: null,
  comparison: [],
  simple: null,
  launchingDevices: null,
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    getDevice: (state, action) => {},
    getDevicesSuccess: (state, action) => {
      const { payload, networkType } = action.payload;
      state.devices = payload?.devices;
      if (payload?.devices && networkType)
        state.devices = state.devices.map((device) => ({
          ...device,
          networkType: parseInt(networkType),
        }));
    },
    getDevicePrice: (state, action) => {},
    getDevicePriceSuccess: (state, action) => {
      const { payload } = action.payload;
      state.price = payload?.devices;
    },
    updateComparison: (state, action) => {
      const { id } = action.payload;
      const isExist = state.comparison.find((d) => d.id === id);
      if (isExist) {
        state.comparison = state.comparison.filter((d) => d.id !== id);
      } else {
        state.comparison.push(action.payload);
      }
    },
    updateComparisonDevicePrice: (state, action) => {
      const { deviceId, price } = action.payload;
      const idx = state.comparison.findIndex((d) => d.id === deviceId);
      if (typeof idx === 'number') {
        state.comparison[idx] = {
          ...state.comparison[idx],
          ...price,
        };
      }
    },
    removeComparison: (state, action) => {
      state.comparison = state.comparison.filter((d) => d.id !== action.payload);
    },
    removeComparisonAll: (state, action) => {
      state.comparison = [];
    },
    getDeviceSimple: (state, action) => {},
    getDeviceSimpleSuccess: (state, action) => {
      state.simple = action.payload?.devices;
    },
    getLaunchingDevices: (state, action) => {},
    getLaunchingDevicesSuccess: (state, action) => {
      state.launchingDevices = action.payload?.launchingDevices;
    },
  },
});

const { actions, reducer } = devicesSlice;

// export actions
export const devicesActions = actions;

export const filteredDevices = (
  rdevices,
  launchingDevices,
  devicePrice,
  price,
  company,
  storage,
  f_sortby,
  f_sortbyDir,
  excludeSoldout,
  search,
) => {
  if (!rdevices || !launchingDevices || !devicePrice) return null;
  let devices = [...rdevices, ...launchingDevices];
  if (excludeSoldout) {
    // 출시 예정 단말기 제외
    devices = devices.filter(
      (device) => !device?.isLaunching && !device.colors.every((color) => color?.stock === 0),
    );
  }
  if (company && Array.isArray(company) && !!company.length && !company.includes(ALL)) {
    let temp = devices.filter((device) => company.includes(device?.company));
    let etc = company.includes(ETC)
      ? devices.filter((device) => ![SAMSUNG, APPLE].includes(device?.company))
      : [];
    devices = [...temp, ...etc];
  }
  if (storage && Array.isArray(storage) && !!storage.length && !storage.includes(ALL)) {
    devices = devices.filter((device) => storage.includes(device?.storage));
  }

  let devicesWithPrice = devices.reduce((acc, cur, idx) => {
    const find = devicePrice.find((d) => d.deviceId === cur.id);
    if (find && !cur?.isLaunching) return [...acc, { ...cur, ...find }];
    return [...acc, { ...cur, ddevicePrice: 0, dplanPrice: 0 }];
  }, []);

  if (price && Array.isArray(price)) {
    let min = price[0] || FILTER_DATA.price_range.config.MIN,
      max = price[1] || FILTER_DATA.price_range.config.MAX;
    devicesWithPrice = devicesWithPrice.filter(
      (device) =>
        device?.ddevicePrice + device?.dplanPrice >= min &&
        device?.ddevicePrice + device?.dplanPrice <= max,
    );
  }

  if (!f_sortby || f_sortby === LAUNCH) {
    // 출시일 순
    devicesWithPrice.sort((a, b) =>
      f_sortbyDir
        ? new Date(b.launchedDate) - new Date(a.launchedDate)
        : new Date(a.launchedDate) - new Date(b.launchedDate),
    );
  } else if (f_sortby === PURCHASE) {
    // 실구매가 순
    devicesWithPrice.sort((a, b) =>
      f_sortbyDir
        ? a.ddevicePrice + a.dplanPrice - (b.ddevicePrice + b.dplanPrice)
        : b.ddevicePrice + b.dplanPrice - (a.ddevicePrice + a.dplanPrice),
    );
  } else if (f_sortby === PRICE) {
    devicesWithPrice.sort((a, b) => (f_sortbyDir ? a.price - b.price : b.price - a.price));
  }

  // TODO - regex로 수정
  if (search) {
    devicesWithPrice = devicesWithPrice.filter((device) =>
      device.name
        .replaceAll(' ', '')
        .toLowerCase()
        .includes(search.replaceAll(' ', '').toLowerCase()),
    );
  }
  return devicesWithPrice;
};

export const filteredSimple = (state, company) =>
  state.devices.simple?.filter((device) => {
    if (company === ETC) return ![SAMSUNG, APPLE].includes(device.company);
    return device.company === company;
  });
export default reducer;
