import React, { useState } from 'react';
import { styled } from '@mui/system';
import DeviceCompareInfoPriceItem from './DeviceCompareInfoPriceItem';

const DeviceCompareInfoPriceBlock = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

function DeviceCompareInfoPrice({ device }) {
  const [priceInfo, setPriceInfo] = useState(null);

  const getPriceInfo = async () => {
    try {
      // const res = await

      const data = {};
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
          value: data?.ddevicePrice + data?.dplanPrice,
        },
      ];

      const c_price = [
        {
          label: '월정액',
          value: data?.mplanPrice,
        },
        {
          label: '선택약정할인',
          value: data?.sdiscount,
        },
      ];
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DeviceCompareInfoPriceBlock>
      <DeviceCompareInfoPriceItem data={priceInfo} hdata="휴대폰 가격" />
      <DeviceCompareInfoPriceItem />
    </DeviceCompareInfoPriceBlock>
  );
}

export default DeviceCompareInfoPrice;
