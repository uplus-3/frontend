import React, { useMemo, useEffect } from 'react';
import { styled } from '@mui/system';
import { Paper, Divider, IconButton, Tooltip, useTheme } from '@mui/material';
import RoundBtn from '../common/RoundBtn';
import { useNavigate } from 'react-router-dom';
import useAlert from '../../lib/hooks/useAlert';
import { PriceFormatter } from '../../lib/utils';
import { postOrder } from '../../lib/api/order';
import useCart from '../../lib/hooks/useCart';

import KakaoIcon from '../../assets/images/icon-kakao.png';
import { getDeviceDetail, getDevicePrice } from '../../lib/api/device';

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
  span: {
    paddingRight: 25,
  },
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
  gap: 10,
}));

const Title = styled('div')({
  fontWeight: 700,
  fontSize: '1.3rem',
});

const CustomDivider = styled(Divider)({
  margin: '15px 0',
});

function OrderReceipt({
  deviceInfo,
  orderForm,
  setOrderForm,
  checkUserInfo,
  setDevicePriceInfo,
  getUserInfo,
  devicePriceInfo,
}) {
  const { addCart } = useCart();
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

  // 카카오톡으로 주문내역 공유하기
  const shareInfoByKakao = (orderNumber) => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init('64ca1622b62f15240ae2889c61165009');
      }
      kakao.Share.sendCustom({
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
    try {
      if (checkUserInfo()) {
        const res = await postOrder({ ...orderForm, ...getUserInfo() });
        const number = await res.data.number;
        Calert.fire({
          title: '주문이 완료되었습니다',
          html: (
            <ShareDiv>
              <div>{`주문번호: ${number}`}</div>
              <Tooltip title="주문내역 공유하기">
                <IconButton onClick={() => shareInfoByKakao(number)}>
                  <img src={KakaoIcon} alt="공유하기" />
                </IconButton>
              </Tooltip>
            </ShareDiv>
          ),
        }).then((res) => {
          navigate(-1);
        });
      }
    } catch (e) {
      console.log(e.response);
      if (e.response.status === 403) {
        // 실패했을 경우
        Calert.fire({
          title: '해당 상품은 이미 품절되었습니다',
          text: `이전페이지로 돌아가겠습니까?`,
          confirmButtonText: '확인',
        }).then((res) => {
          if (res.isConfirmed) {
            navigate(-1);
          }
        });
      }
    }
  };

  const getDeviceInfo = async () => {
    const res = await getDevicePrice({
      deviceId: deviceInfo.id,
      installmentPeriod: orderForm.installmentPeriod,
      discountType: orderForm.discountType,
      planId: orderForm.planId,
    });
    setDevicePriceInfo({ ...res.data });
    setOrderForm((prev) => ({
      ...prev,
      price:
        devicePriceInfo.dplanPrice +
        (orderForm.installmentPeriod === 1 ? 0 : devicePriceInfo.ddevicePrice),
    }));
  };

  useEffect(() => {
    getDeviceInfo();
  }, [orderForm.installmentPeriod, orderForm.planId, orderForm.discountType]);

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
          <div>{deviceInfo?.storage}</div>
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
              <div>{PriceFormatter(devicePriceInfo.devicePrice)}</div>
            </>
          ) : (
            <>
              <div>월 휴대폰 할부금</div>
              <div>{PriceFormatter(devicePriceInfo.ddevicePrice)}원</div>
            </>
          )}
        </OrderReceiptPrice>
        <OrderReceiptPrice>
          <div>정상가</div>
          <div>{PriceFormatter(devicePriceInfo.devicePrice)}원</div>
        </OrderReceiptPrice>
        {devicePriceInfo.discountType === 0 && (
          <OrderReceiptPrice color={theme.palette.prime}>
            <div>공시 지원금</div>
            <div>-{PriceFormatter(devicePriceInfo.psupport)}원</div>
          </OrderReceiptPrice>
        )}
        {devicePriceInfo.discountType === 0 && (
          <OrderReceiptPrice color={theme.palette.prime}>
            <div>추가 지원금</div>
            <div>-{PriceFormatter(devicePriceInfo.asupport)}원</div>
          </OrderReceiptPrice>
        )}
        <OrderReceiptPrice>
          <div>실 구매가</div>

          <div>{PriceFormatter(devicePriceInfo.tdevicePrice)}원</div>
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
          <div>{PriceFormatter(devicePriceInfo.dplanPrice)}</div>
        </OrderReceiptPrice>
        <OrderReceiptPrice>
          <div>{orderForm?.planName || '5G+ 라이트'}</div>
          <div>{PriceFormatter(devicePriceInfo.mplanPrice)}</div>
        </OrderReceiptPrice>
        {devicePriceInfo.discountType === 1 && (
          <OrderReceiptPrice color={theme.palette.prime}>
            <div>선택 약정 할인</div>
            <div>-{PriceFormatter(devicePriceInfo.sdiscount)}</div>
          </OrderReceiptPrice>
        )}
        <OrderFinalPrice>
          <span>월 납부금액</span>
          {PriceFormatter(
            devicePriceInfo.dplanPrice +
              (orderForm.installmentPeriod === 1 ? 0 : devicePriceInfo.ddevicePrice),
          )}
          원
        </OrderFinalPrice>
        <AlignCenter>
          <RoundBtn
            onClick={() => {
              addCart(orderForm);
            }}
            width={90}
            backgroundColor="#FFFFFF"
            border={`1px solid ${theme.palette.prime}`}
            color={theme.palette.prime}>
            장바구니
          </RoundBtn>
          <RoundBtn width={180} onClick={order}>
            온라인 주문
          </RoundBtn>
        </AlignCenter>
      </OrderReceiptWrapper>
    </OrderReceiptBlock>
  );
}

export default OrderReceipt;
