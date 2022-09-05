import client from './client';

/**
 * 담당자 : 김수현
 */
// 네트워크 타입별 요금제 리스트 받아오는 함수
export const getPlans = ({ networkType = 0 }) => {
  return client.get(`/plans`, {
    params: {
      'network-type': networkType,
    },
  });
};
