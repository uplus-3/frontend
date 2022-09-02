import React from 'react';
import { styled } from '@mui/system';
import { PriceFormatter } from '../../../lib/utils';

const DeviceCompareInfoPriceItemBlock = styled('div')({
  background: '#fff',
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,

  '& dl': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const HeaderWrapper = styled('div')(({ theme }) => ({
  '& dl': {
    paddingBottom: 10,
    fontWeight: 'bold',
    borderBottom: `1px solid ${theme.palette.gray2}`,
  },
  '& dt': {
    fontSize: 18,
  },
  '& dd': {
    fontSize: 28,
  },
}));
const BodyWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

function priceFormat(value) {
  return `${PriceFormatter(parseInt(value))}원`;
}

function DeviceCompareInfoPriceItem({ data, hdata, bdata }) {
  return (
    <DeviceCompareInfoPriceItemBlock>
      <HeaderWrapper>
        <dl>
          <dt>{hdata}</dt>
          <dd>월 {data?.ddevicePrice + data?.}원</dd>
        </dl>
      </HeaderWrapper>
      <BodyWrapper>
        {bdata && bdata.map(data => (
        <dl>
          <dt>{data.label}</dt>
          <dd>{priceFormat(data?.value)}</dd>
        </dl>

        ))}
        {/* <dl>
          <dt>공시지원금</dt>
          <dd>월 {priceFormat(data?.price)}원</dd>
        </dl>
        <dl>
          <dt>휴대폰 금액</dt>
          <dd>월 {data?.dprie + data?.mprice}원</dd>
        </dl>
        <dl>
          <dt>휴대폰 금액</dt>
          <dd>월 {data?.dprie + data?.mprice}원</dd>
        </dl> */}
      </BodyWrapper>
    </DeviceCompareInfoPriceItemBlock>
  );
}

export default DeviceCompareInfoPriceItem;
