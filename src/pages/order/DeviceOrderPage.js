import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material';
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
    setDeviceInfo({ ...state.deviceInfo, selectedColor: { ...state.selectedColor } });
    setDevicePriceInfo(state.devicePriceInfo);
    //TODO 기본값으로 plan Id 넣어주기
    setOrderForm((prev) => {
      return { ...prev, colorId: state?.selectedColor?.id };
    });
  }, []);

  return (
    <DeviceOrderPageWrapper>
      {deviceInfo && (
        <>
          <OrderForm
            orderForm={orderForm}
            deviceInfo={deviceInfo}
            setOrderForm={setOrderForm}
            devicePriceInfo={devicePriceInfo}
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
