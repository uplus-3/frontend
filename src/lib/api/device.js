import client from './client';

// 단일 디바이스 정보 받아오기
export const getDeviceDetail = ({
  deviceId,
  discountType = -1,
  installmentPeriod = 24,
  plan = -1,
}) => {
  return client({
    url: `/devices/${deviceId}`,
    method: 'get',
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
