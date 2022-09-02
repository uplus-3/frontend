import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import DeviceCompareInfoPriceItem from './DeviceCompareInfoPriceItem';
import { getDevicePrice } from '../../../lib/api/device';

const DeviceCompareInfoPriceBlock = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

function DeviceCompareInfoPrice({ device }) {
  const [priceInfo, setPriceInfo] = useState(null);

  useEffect(() => {
    if (!device) return;
    const p_price = [
      {
        label: '출고가',
        value: device?.price,
      },
      {
        label: '공시지원금',
        value: device?.discountType === 0 ? device?.psupport : 0,
      },
      {
        label: '15% 추가지원금',
        value: device?.asupport,
      },
      {
        label: '실구매가',
        value: device?.tdevicePrice,
      },
    ];

    const c_price = [
      {
        label: '월정액',
        value: device?.mplanPrice,
      },
      {
        label: '선택약정할인',
        value: device?.discountType === 1 ? -device?.sdiscount : 0,
      },
    ];

    setPriceInfo({
      ddevicePrice: device?.ddevicePrice,
      dplanPrice: device?.dplanPrice,
      p_price,
      c_price,
    });
  }, [device]);

  return (
    <DeviceCompareInfoPriceBlock>
      <DeviceCompareInfoPriceItem
        mPrice={priceInfo?.ddevicePrice}
        hdata="휴대폰 가격"
        bdata={priceInfo?.p_price}
      />
      <DeviceCompareInfoPriceItem
        mPrice={priceInfo?.dplanPrice}
        hdata="통신료"
        bdata={priceInfo?.c_price}
      />
    </DeviceCompareInfoPriceBlock>
  );
}

export default DeviceCompareInfoPrice;
