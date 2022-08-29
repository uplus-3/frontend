import React, { useMemo } from 'react';
import { styled } from '@mui/system';
import { Paper, Divider } from '@mui/material';
import RoundBtn from '../common/RoundBtn';

import { PriceFormatter } from '../../lib/utils';
const OrderReceiptBlock = styled('div')({});
const OrderReceiptWrapper = styled(Paper)({
  position: 'sticky',
  top: 100,
  padding: 20,
  marginLeft: 50,
  borderRadius: 10,
  width: 350,
});

const OrderReceiptPrice = styled('div')(({ title }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: !!title ? '1.2rem' : '',
  fontWeight: !!title ? 600 : '',
}));

const OrderFinalPrice = styled('div')(({ theme }) => ({
  background: theme.palette.gray2,
  margin: '25px auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  fontSize: '1.2rem',
  fontWeight: 600,
  height: 70,
  width: 300,
}));

const OrderReceiptDevice = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  span: {
    fontSize: '0.9rem',
    color: '#000000A0',
  },
}));
const AlignCenter = styled('div')(({ direction }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: direction || 'row',
}));

const Title = styled('div')({
  fontWeight: 700,
  fontSize: '1.3rem',
});

const CustomDivider = styled(Divider)({
  margin: '15px 0',
});
function OrderReceipt({ deviceInfo, orderForm, checkUserInfo }) {
  const registrationType = useMemo(() => {
    switch (orderForm.registrationType) {
      case 0:
        return '기기변경';
      case 1:
        return '신규가입';
      case 2:
        return '번호이동';
      default:
        return '기기변경';
    }
  }, [orderForm.registrationType]);

  const order = () => {
    console.log(checkUserInfo());
  };
  return (
    <OrderReceiptBlock>
      <OrderReceiptWrapper elevation={2}>
        <AlignCenter direction="column">
          <img width={200} src={deviceInfo?.selectedColor?.images[0].url} alt="test" />
          <Title>{deviceInfo.name}</Title>
        </AlignCenter>
        <CustomDivider />
        <OrderReceiptDevice>
          <span>모델명</span>
          <div>{deviceInfo?.id}</div>
        </OrderReceiptDevice>
        <OrderReceiptDevice>
          <span>가입유형</span>
          <div>{registrationType}</div>
        </OrderReceiptDevice>
        <OrderReceiptDevice>
          <span>저장공간</span>
          <div>{deviceInfo?.storage}GB</div>
        </OrderReceiptDevice>
        <OrderReceiptDevice>
          <span>색상</span>
          <div>{deviceInfo.selectedColor.name}</div>
        </OrderReceiptDevice>
        <CustomDivider />
        최종 결제금액 계산
        <OrderReceiptPrice title="true">
          <div>월 휴대폰 할부금</div>
          <div>{PriceFormatter(deviceInfo.d_price)}원</div>
        </OrderReceiptPrice>
        <OrderReceiptPrice>
          <div>정상가</div>
          <div>{PriceFormatter(deviceInfo.d_price)}원</div>
        </OrderReceiptPrice>
        <OrderReceiptPrice>
          <div>공시 지원금</div>
          <div>{PriceFormatter(deviceInfo.d_price)}원</div>
        </OrderReceiptPrice>
        <OrderReceiptPrice>
          <div>실 구매가</div>
          <div>{PriceFormatter(deviceInfo.d_price)}원</div>
        </OrderReceiptPrice>
        <OrderReceiptPrice>
          <div>할부 개월수</div>
          <div>
            {orderForm.installmentPeriod === 1 ? '일시불' : `${orderForm.installmentPeriod} 개월`}
          </div>
        </OrderReceiptPrice>
        <CustomDivider />
        <OrderReceiptPrice title="true">
          <div>월 통신료</div>
          <div>{PriceFormatter(85000)}</div>
        </OrderReceiptPrice>
        <OrderFinalPrice>월 납부금액 {PriceFormatter(200000)}원</OrderFinalPrice>
        <AlignCenter>
          <RoundBtn width={200} onClick={order}>
            온라인 주문
          </RoundBtn>
        </AlignCenter>
      </OrderReceiptWrapper>
    </OrderReceiptBlock>
  );
}

export default OrderReceipt;
