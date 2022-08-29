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
  const [orderForm, setOrderForm] = useState({
    colorId: 1,
    discountType: 0,
    installmentPeriod: 1,
    planId: 1,
    price: 100236,
    registrationType: 0,
    shipmentType: 1,
  });

  const checkUserInfo = () => {
    return formRef.current.checkUserInfo();
  };

  useEffect(() => {
    const { state } = location;
    if (!!!state) navigate(-1);
  }, []);
  return (
    <DeviceOrderPageWrapper>
      <OrderForm orderForm={orderForm} setOrderForm={setOrderForm} ref={formRef} />
      <OrderReceipt
        deviceInfo={location.state}
        orderForm={orderForm}
        checkUserInfo={checkUserInfo}
      />
    </DeviceOrderPageWrapper>
  );
}

export default DeviceOrderPage;
