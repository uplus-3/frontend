import { createSlice } from '@reduxjs/toolkit';

import { FILTER_DATA, SORT_TYPE } from '../../components/device/DeviceListFileterContents';

const ALL = 'all';
const LAUNCH = 'launch';
const PURCHASE = 'purchase';
const PRICE = 'price';

const initialState = {
  devices: null,
  price: null,
  comparison: [],

  // TODO - 삭제
  filter: {
    plan: null,
    discount: null,
    price: null,
    company: null,
    storage: null,
  },
  options: {
    search: null,
    soldout: false,
    origin_price: false,
    sort: {
      direction: true,
      by: 'launch',
    },
  },
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    getDevice: (state, action) => {
      console.log('get devices!', action.payload);
    },
    getDevicesSuccess: (state, action) => {
      const { payload, networkType } = action.payload;
      console.log('get devices success!', payload?.devices);
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
      // const
    },
    removeComparison: (state, action) => {
      state.comparison = state.comparison.filter((d) => d.id !== action.payload);
    },
    removeComparisonAll: (state, action) => {
      state.comparison = [];
    },
    initFilterValue: (state, action) => {
      state.filter = action.payload;
    },
    setFilterValue: (state, action) => {
      const { type, value } = action.payload;
      console.log('fSLice', type, value);
      // const type_name = `${type}_type`; // PLNA_TYPE, DISCOUNT_TYPE, COMPANY_TYPE, STORAGE_TYPE
      // if (type === FILTER_DATA.plan_type.name || type === FILTER_DATA.discount_type.name) {
      //   state.filter[type] = value;
      // } else if (type === FILTER_DATA.company_type.name || type === FILTER_DATA.storage_type.name) {
      //   // 없으면 add, 이미 존재하면 delete
      //   // 전체(all)의 경우 존재하지만 선택했다면 변화없음
      //   // 전체(all) 이외에 모든 checkbox가 선택되었다면 all만 add
      //   // 전체(all) 이외에 모든 checkbox가 미선택되었다면 all만 add
      //   let exist = state.filter[type]; // 기존에 담긴 datas
      //   const isChecked = exist.includes(value); // 이미 선택된 값인지 확인
      //   if (isChecked && value !== ALL) {
      //     // 이미 선택되었는데, 전체를 선택한 경우라면 변화없음
      //     exist = exist.filter((v) => v !== value);
      //     // 지웠는데 모든 값이 지워졌다면 all 추가
      //     if (!exist.length) exist.push(ALL);
      //   }

      //   if (!isChecked) {
      //     if (value === ALL) {
      //       // 전체를 선택했다면 모든 값 지우고 all add
      //       exist = [ALL];
      //     } else {
      //       exist = exist.filter((v) => v !== ALL);
      //       exist.push(value);
      //       if (exist.length === FILTER_DATA[type_name].data.length - 1) {
      //         // 전체 이외 모든 체크박스가 선택되었다면 all add
      //         exist.splice(0, exist.length);
      //         exist.push(ALL);
      //       }
      //     }
      //   }
      //   state.filter[type] = exist;
      // } else if (type === FILTER_DATA.price_range.name) {
      //   // 가격 범위
      //   state.filter[type] = value;
      // }
    },
  },
});

const { actions, reducer } = devicesSlice;

// export actions
export const devicesActions = actions;

export const filteredDevices = (
  state,
  price,
  company,
  storage,
  f_sortby,
  f_sortbyDir,
  excludeSoldout,
  search,
) => {
  let devices = state.devices;
  let devicePrice = state.price;
  if (!devices) return null;
  if (excludeSoldout) {
    devices = devices.filter((device) => !device.colors.every((color) => color.stock === 0));
  }
  if (company && Array.isArray(company) && !!company.length && !company.includes('all')) {
    devices = devices.filter((device) => company.includes(device.company));
  }
  if (storage && Array.isArray(storage) && !!storage.length && !storage.includes('all')) {
    devices = devices.filter((device) => storage.includes(device.storage));
  }

  let devicesWithPrice = devices.reduce((acc, cur, idx) => {
    const find = devicePrice.find((d) => d.deviceId === cur.id);
    if (find) return [...acc, { ...cur, ...find }];
    return [...acc, { ...cur }];
  }, []);

  if (price && Array.isArray(price)) {
    let min = price[0] || FILTER_DATA.price_range.config.MIN,
      max = price[1] || FILTER_DATA.price_range.config.MAX;
    devicesWithPrice = devicesWithPrice.filter(
      (device) =>
        device.ddevicePrice + device.dplanPrice >= min &&
        device.ddevicePrice + device.dplanPrice <= max,
    );
  }

  if (!f_sortby || f_sortby === LAUNCH) {
    // 출시일 순
    devicesWithPrice = devicesWithPrice.sort((a, b) =>
      new Date(a.launchedDate) < new Date(b.launchedDate) && f_sortbyDir ? 1 : -1,
    );
  } else if (f_sortby === PURCHASE) {
    // 실구매가 순
    devicesWithPrice = devicesWithPrice.sort((a, b) =>
      a.ddevicePrice + a.dplanPrice > b.ddevicePrice + b.dplanPrice && f_sortbyDir ? 1 : -1,
    );
  } else if (f_sortby === PRICE) {
    devicesWithPrice = devicesWithPrice.sort((a, b) => (a.price > b.price && f_sortbyDir ? 1 : -1));
  }

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
export default reducer;
