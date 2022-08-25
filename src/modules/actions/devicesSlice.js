import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  devices: [1, 2, 3],
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
  },
});

const { actions, reducer } = devicesSlice;

// export actions
export const devicesActions = actions;
export default reducer;
