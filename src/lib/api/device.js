import client from './client';

/**
 * 담당자 : 김수현, 성아영
 */
// 단일 디바이스 정보 받아오기
export const getDeviceDetail = (deviceId) => {
  return client({
    url: `/devices/${deviceId}`,
    method: 'get',
  });
};

// 단일 디바이스 가격정보 받아오기
export const getDevicePrice = ({ deviceId, discountType, installmentPeriod, planId }) => {
  return client.get(`/devices/${deviceId}/plans/${planId || -1}`, {
    params: {
      'discount-type': discountType || 0,
      'installment-period': installmentPeriod || 24,
    },
  });
};

export const getDeviceList = ({ discountType, installmentPeriod, networkType, plan }) => {
  return client.get(`/devices`, {
    params: {
      'discount-type': discountType || -1,
      'installment-period': installmentPeriod || 24,
      'network-type': networkType || 0,
      plan: plan || -1,
    },
  });
};

export const getDevicePriceCompare = ({ deviceId }) => {
  return client.get(`/devices/${deviceId}/self`);
};

// 단일 디바이스 정보 받아오기
export const getDevicePriceList = ({ discountType, installmentPeriod, networkType, planId }) => {
  return client({
    url: `/devices/plans/${planId || -1}`,
    method: 'get',
    params: {
      'discount-type': discountType || -1,
      'installment-period': installmentPeriod || 24,
      'network-type': networkType || 0,
      'plan-id': planId || -1,
    },
  });
};

export const getDeviceSimple = () => {
  return client.get('/devices/simple');
};

export const getLaunchingDeviceList = (networkType) => {
  return client.get('/launching-devices', {
    params: {
      'network-type': networkType || 0,
    },
  });
};
