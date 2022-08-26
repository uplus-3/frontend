import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  devices: [
    {
      id: 'SM-F721N',
      name: '갤럭시 Z Flip 4',
      price: 1353000,
      m_price: 124900,
      d_price: '기기월납부액(할인적용)',
      stock: 1,
      plan: {
        price: '요금제가격(월)',
        d_price: '할인된가격(할인적용)',
      },
      tags: [
        {
          content: '인기',
          rgb: '#d44602',
        },
      ],
      colors: [
        {
          name: '보라 퍼플',
          code: '#b8aacb',
          images: [
            {
              url: 'SM-F721N-purple-0',
            },
          ],
        },
        {
          name: '핑크 골드',
          code: '#ecdbd3',
          images: [
            {
              url: 'SM-F721N-gold-0',
            },
          ],
        },
        {
          name: '블루',
          code: '#c9d1e4',
          images: [
            {
              url: 'SM-F721N-blue-0',
            },
          ],
        },
        {
          name: '그라파이트',
          code: '#424347',
          images: [
            {
              url: 'SM-F721N-graphite-0',
            },
          ],
        },
      ],
    },
  ],
  filter: {
    plan: null,
    discount: null,
    price: [],
    company: new Set(),
    storage: new Set(),
  },
  options: {
    soldout: false,
    origin_price: false,
  },
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    getDevices: (state, action) => {
      console.log('get devices');
    },
    getDevicesSuccess: (state, action) => {
      console.log('get devices success!');
    },
    initFilterValue: (state, action) => {
      state.filter = action.payload;
    },
    setFilterValue: (state, action) => {
      const { type, value } = action.payload;
      if (type === 'plan' || type === 'discount') {
        state.filter[type] = value;
      } else if (type === 'company' || type === 'storage') {
      }
    },
  },
});

const { actions, reducer } = devicesSlice;

// export actions
export const devicesActions = actions;
export default reducer;
