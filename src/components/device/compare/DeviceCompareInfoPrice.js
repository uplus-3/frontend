import React from 'react';
import { styled } from '@mui/system';

const DeviceCompareInfoPriceBlock = styled('div')({});

const HeaderWapper = styled('div')({});

function DeviceCompareInfoPrice() {
  return (
    <DeviceCompareInfoPriceBlock>
      <label>휴대폰 가격</label>
      <span>월 59,000원</span>
    </DeviceCompareInfoPriceBlock>
  );
}

export default DeviceCompareInfoPrice;
