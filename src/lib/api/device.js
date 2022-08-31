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

export const getDeviceList = ({
  discountType = -1,
  installmentPeriod = 24,
  networkType = 0,
  planType = -1,
}) => {
  console.log(planType);
  return client.get(`/devices`, {
    params: {
      'discount-type': parseInt(discountType),
      'installment-period': parseInt(installmentPeriod),
      'network-type': parseInt(networkType),
      plan: parseInt(planType),
    },
  });
};

export const getDevicePriceCompare = ({ deviceId }) => {
  return client.get(`/devices/${deviceId}/self`);
};
