import client from './client';

// 단일 디바이스 정보 받아오기
export const getDeviceDetail = (deviceId) => {
  return client({
    url: `/devices/${deviceId}`,
    method: 'get',
  });
};

// 단일 디바이스 가격정보 받아오기
//TODO planId/ plan 통일하기
export const getDevicePrice = ({ deviceId, discountType, installmentPeriod, planId }) => {
  return client.get(`/devices/${deviceId}/plans/${planId}`, {
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
