import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import OrderForm from '../../components/order/OrderForm';
import OrderReceipt from '../../components/order/OrderReceipt';

const DeviceOrderPageWrapper = styled('div')({
  display: 'flex',
});

function DeviceOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const formRef = useRef();
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [devicePriceInfo, setDevicePriceInfo] = useState(null);
  const [orderForm, setOrderForm] = useState({
    colorId: 1,
    discountType: 0,
    installmentPeriod: 24,
    planId: 1,
    price: 100236,
    registrationType: 0,
    shipmentType: 1,
  });

  const checkUserInfo = () => {
    return formRef.current.checkUserInfo();
  };

  const getUserInfo = () => {
    return formRef.current.getUserInfo();
  };

  useEffect(() => {
    const { state } = location;
    if (!!!state) navigate(-1);
    console.log(state);
    setDeviceInfo({ ...state.deviceInfo, selectedColor: { ...state.selectedColor } });
    setDevicePriceInfo(state.devicePriceInfo);
    //TODO 기본값으로 plan Id 넣어주기
    setOrderForm((prev) => {
      return {
        ...prev,
        planId: state?.deviceInfo?.plan?.id || 1,
        colorId: state?.selectedColor?.id,
        planName: state?.deviceInfo?.plan?.name || '5G 라이트',
      };
    });
  }, []);

  return (
    <DeviceOrderPageWrapper>
      <Helmet>
        <title> 주문페이지 | 엘지유플 최강 3조</title>
      </Helmet>
      {deviceInfo && (
        <>
          <OrderForm
            orderForm={orderForm}
            deviceInfo={deviceInfo}
            setOrderForm={setOrderForm}
            devicePriceInfo={devicePriceInfo}
            planId={deviceInfo?.plan?.id}
            ref={formRef}
          />
          <OrderReceipt
            setDeviceInfo={setDeviceInfo}
            deviceInfo={deviceInfo}
            orderForm={orderForm}
            setDevicePriceInfo={setDevicePriceInfo}
            devicePriceInfo={devicePriceInfo}
            checkUserInfo={checkUserInfo}
            getUserInfo={getUserInfo}
          />
        </>
      )}
    </DeviceOrderPageWrapper>
  );
}

export default DeviceOrderPage;
