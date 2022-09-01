import client from './client';

// 단일 디바이스 정보 받아오기
export const getPrice = ({ discountType, installmentPeriod, networkType, planId }) => {
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
