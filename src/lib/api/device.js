import client from './client';

// 단일 디바이스 정보 받아오기
export const getDeviceDetail = ({
  deviceId,
  discountType = -1,
  installmentPeriod = 24,
  plan = -1,
}) => {
  return client.get(`/devices/${deviceId}`, {
    params: {
      'discount-type': discountType,
      'installment-period': installmentPeriod,
      plan,
    },
  });
};

export const getDeviceList = ({ discountType, installmentPeriod, networkType, plan }) => {
  return client.get(`/devices`, {
    params: {
      'discount-type': discountType,
      'installment-period': installmentPeriod,
      'network-type': networkType,
      plan,
    },
  });
};

export const getDevicePriceCompare = ({ deviceId }) => {
  return client.get(`/devices/${deviceId}/self`);
};
