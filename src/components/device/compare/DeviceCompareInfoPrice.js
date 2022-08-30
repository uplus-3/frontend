import React from 'react';
import { styled } from '@mui/system';
import DeviceCompareInfoPriceItem from './DeviceCompareInfoPriceItem';

const DeviceCompareInfoPriceBlock = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

function DeviceCompareInfoPrice({ data }) {
  const p_price = [
    {
      label: '출고가',
      value: data?.price,
    },
    {
      label: '공시지원금',
      value: data?.psupport,
    },
    {
      label: '15% 추가지원금',
      value: data?.asupport,
    },
    {
      label: '실구매가',
      value: data?.price, // 바꿀것
    },
  ];

  const c_price = [
    {
      label: '월정액',
      value: data?.plan?.price,
    },
    {
      label: '선택약정할인',
      value: data?.plan?.sdiscount,
    },
  ];

  return (
    <DeviceCompareInfoPriceBlock>
      <DeviceCompareInfoPriceItem />
      <DeviceCompareInfoPriceItem />
    </DeviceCompareInfoPriceBlock>
  );
}

export default DeviceCompareInfoPrice;
