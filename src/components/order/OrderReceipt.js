import React, { useMemo } from 'react';
import { styled } from '@mui/system';
import { Paper, Divider, IconButton, Tooltip, useTheme } from '@mui/material';
import RoundBtn from '../common/RoundBtn';
import { useNavigate } from 'react-router-dom';
import useAlert from '../../lib/hooks/useAlert';
import { PriceFormatter } from '../../lib/utils';
import { postOrder } from '../../lib/api/order';

import KakaoIcon from '../../assets/images/icon-kakao.png';
const OrderReceiptBlock = styled('div')({});
const OrderReceiptWrapper = styled(Paper)({
  position: 'sticky',
  top: 80,
  padding: 20,
  marginLeft: 50,
  borderRadius: 10,
  width: 350,
});

const OrderReceiptPrice = styled('div')(({ title, color }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: !!title ? '1.2rem' : '0.9rem',
  fontWeight: !!title ? 600 : '',
  color: color,
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

const ShareDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
});
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
function OrderReceipt({ deviceInfo, orderForm, checkUserInfo, getUserInfo }) {
  const Calert = useAlert();
  const navigate = useNavigate();
  const theme = useTheme();
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

  const shareInfoByKakao = (orderNumber) => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init('64ca1622b62f15240ae2889c61165009');
      }
      kakao.Share.sendCustom({
        requestUrl: window.location.host,
        templateId: 82187,
        templateArgs: {
          image: deviceInfo.selectedColor.images[0].imageUrl,
          deviceName: deviceInfo.name,
          deviceSerialNumber: deviceInfo.serialNumber,
          orderNumber: orderNumber,
        },
      });
    }
  };

  const order = async () => {
    // try {
    //   if (checkUserInfo()) {
    //     const res = postOrder({ ...orderForm, ...getUserInfo() });
    //   }
    // } catch (e) {}
    const number = 2020202020;
    Calert.fire({
      title: '주문이 완료되었습니다',
      html: (
        <ShareDiv>
          <div>{`주문번호: ${number}`}</div>
          <Tooltip title="주문내역 공유하기">
            <IconButton onClick={() => shareInfoByKakao(20202020)}>
              <img src={KakaoIcon} alt="공유하기" />
            </IconButton>
          </Tooltip>
        </ShareDiv>
      ),
    }).then((res) => {
      if (res.isConfirmed) {
        navigate(-1);
      }
    });
    // 실패했을 경우
    // Calert.fire({
    //   title: '해당 상품은 이미 품절되었습니다',
    //   text: `이전페이지로 돌아가겠습니까?`,
    //   confirmButtonText: '확인',
    // }).then((res) => {
    //   if (res.isConfirmed) {
    //     navigate(-1);
    //   }
    // });
  };
  return (
    <OrderReceiptBlock>
      <OrderReceiptWrapper elevation={2}>
        <AlignCenter direction="column">
          <img width={200} src={deviceInfo?.selectedColor?.images[0].imageUrl} alt="test" />
          <Title>{deviceInfo.name}</Title>
        </AlignCenter>
        <CustomDivider />
        <OrderReceiptDevice>
          <span>모델명</span>
          <div>{deviceInfo?.serialNumber}</div>
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
          {orderForm.installmentPeriod === 1 ? (
            <>
              <div>기기 완납 결제 가격</div>
              <div>{PriceFormatter(deviceInfo.price)}</div>
            </>
          ) : (
            <>
              <div>월 휴대폰 할부금</div>
              <div>{PriceFormatter(deviceInfo.dprice)}원</div>
            </>
          )}
        </OrderReceiptPrice>
        <OrderReceiptPrice>
          <div>정상가</div>
          <div>{PriceFormatter(deviceInfo.price)}원</div>
        </OrderReceiptPrice>
        {!!deviceInfo.psupport && (
          <OrderReceiptPrice>
            <div>공시 지원금</div>
            <div>-{PriceFormatter(deviceInfo.psupport)}원</div>
          </OrderReceiptPrice>
        )}
        {!!deviceInfo.asupport && (
          <OrderReceiptPrice>
            <div>추가 지원금</div>
            <div>-{PriceFormatter(deviceInfo.asupport)}원</div>
          </OrderReceiptPrice>
        )}
        <OrderReceiptPrice>
          <div>실 구매가</div>
          <div>{PriceFormatter(deviceInfo.dprice)}원</div>
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
          <div>{PriceFormatter(deviceInfo.plan.dprice)}</div>
        </OrderReceiptPrice>
        <OrderReceiptPrice>
          <div>{deviceInfo.plan.name}</div>
          <div>{PriceFormatter(deviceInfo.plan.price)}</div>
        </OrderReceiptPrice>
        {!!!deviceInfo.psupport && (
          <OrderReceiptPrice color={theme.palette.prime}>
            <div>선택 약정 할인</div>
            <div>-{PriceFormatter(deviceInfo.plan.sdiscount)}</div>
          </OrderReceiptPrice>
        )}
        <OrderFinalPrice>
          월 납부금액 {PriceFormatter(deviceInfo.dprice + deviceInfo.plan.dprice)}원
        </OrderFinalPrice>
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
