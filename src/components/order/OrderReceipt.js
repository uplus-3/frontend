import React from 'react';
import { styled } from '@mui/system';
import { Paper, Divider } from '@mui/material';
import RoundBtn from '../common/RoundBtn';

import { PriceFormatter } from '../../lib/utils';
const OrderReceiptBlock = styled('div')({});
const OrderReceiptWrapper = styled(Paper)({
  position: 'sticky',
  top: 100,
  padding: 20,
  borderRadius: 10,
  width: 400,
});

const OrderReceiptPrice = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

const OrderFinalPrice = styled('div')(({ theme }) => ({
  background: theme.palette.gray2,
  margin: 'auto',
  textAlign: 'center',
  borderRadius: 10,
  height: 50,
  width: 200,
}));
const AlignCenter = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

function OrderReceipt({ deviceInfo }) {
  console.log(deviceInfo);
  return (
    <OrderReceiptBlock>
      <OrderReceiptWrapper elevation={2}>
        <img width={200} src={deviceInfo?.selectedColor?.images[0].url} alt="test" />
        <div>{deviceInfo.name}</div>
        <Divider />
        <div>{deviceInfo?.id}</div>
        <div>{deviceInfo?.storage}</div>
        <div>{deviceInfo.selectedColor.name}</div>
        <Divider />
        <OrderReceiptPrice>
          <div>월 휴대폰 할부금</div>
          <div>{PriceFormatter(deviceInfo.d_price)}</div>
        </OrderReceiptPrice>
        <OrderFinalPrice>월 {PriceFormatter(200000)}원</OrderFinalPrice>
        <AlignCenter>
          <RoundBtn width={200}>온라인 주문</RoundBtn>
        </AlignCenter>
      </OrderReceiptWrapper>
    </OrderReceiptBlock>
  );
}

export default OrderReceipt;
