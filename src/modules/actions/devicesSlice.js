import { createSlice } from '@reduxjs/toolkit';

import { FILTER_DATA } from '../../components/device/DeviceListFileterContents';

const ALL = 'all';

const initialState = {
  devices: [],
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
      console.log('get devices!');
    },
    getDevicesSuccess: (state, action) => {
      const { devices } = action.payload;
      console.log('get devices success!');
      state.devices = devices || [];
    },
    initFilterValue: (state, action) => {
      state.filter = action.payload;
    },
    setFilterValue: (state, action) => {
      const { type, value } = action.payload;
      const type_name = `${type}_type`; // PLNA_TYPE, DISCOUNT_TYPE, COMPANY_TYPE, STORAGE_TYPE
      if (type === FILTER_DATA.plan_type.name || type === FILTER_DATA.discount_type.name) {
        state.filter[type] = value;
      } else if (type === FILTER_DATA.company_type.name || type === FILTER_DATA.storage_type.name) {
        // 없으면 add, 이미 존재하면 delete
        // 전체(all)의 경우 존재하지만 선택했다면 변화없음
        // 전체(all) 이외에 모든 checkbox가 선택되었다면 all만 add
        // 전체(all) 이외에 모든 checkbox가 미선택되었다면 all만 add
        let exist = state.filter[type]; // 기존에 담긴 datas
        const isChecked = exist.includes(value); // 이미 선택된 값인지 확인
        if (isChecked && value !== ALL) {
          // 이미 선택되었는데, 전체를 선택한 경우라면 변화없음
          exist = exist.filter((v) => v !== value);
          // 지웠는데 모든 값이 지워졌다면 all 추가
          if (!exist.length) exist.push(ALL);
        }

        if (!isChecked) {
          if (value === ALL) {
            // 전체를 선택했다면 모든 값 지우고 all add
            exist = [ALL];
          } else {
            exist = exist.filter((v) => v !== ALL);
            exist.push(value);
            if (exist.length === FILTER_DATA[type_name].data.length - 1) {
              // 전체 이외 모든 체크박스가 선택되었다면 all add
              exist.splice(0, exist.length);
              exist.push(ALL);
            }
          }
        }
        state.filter[type] = exist;
      } else if (type === FILTER_DATA.price_range.name) {
        // 가격 범위
        state.filter[type] = value;
      }
    },
  },
});

const { actions, reducer } = devicesSlice;

// export actions
export const devicesActions = actions;
export default reducer;
