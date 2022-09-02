import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import DeviceCompareInfoPriceItem from './DeviceCompareInfoPriceItem';
import { getDevicePrice } from '../../../lib/api/device';

const DeviceCompareInfoPriceBlock = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

function DeviceCompareInfoPrice({ device, discountType, installmentPeriod, planId = -1 }) {
  const [priceInfo, setPriceInfo] = useState(null);

  useEffect(() => {
    if (device) {
      getPriceInfo();
    }
  }, []);

  const getPriceInfo = async () => {
    try {
      const res = await getDevicePrice({
        deviceId: device.id,
        discountType,
        installmentPeriod,
        planId,
      });
      const data = res.data;
      console.log(data);
      const p_price = [
        {
          label: '출고가',
          value: device?.price,
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
          value: data?.tdevicePrice,
        },
      ];

      const c_price = [
        {
          label: '월정액',
          value: data?.mplanPrice,
        },
        {
          label: '선택약정할인',
          value: -data?.sdiscount,
        },
      ];

      setPriceInfo({
        ddevicePrice: data.ddevicePrice,
        dplanPrice: data.dplanPrice,
        p_price,
        c_price,
      });
    } catch (e) {
      console.log(e);
    }
  };

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
