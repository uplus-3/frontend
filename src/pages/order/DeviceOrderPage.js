import React, { useEffect } from 'react';
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
  useEffect(() => {
    const { state } = location;
    if (!!!state) navigate(-1);
  }, []);
  return (
    <DeviceOrderPageWrapper>
      <OrderForm />
      {<OrderReceipt deviceInfo={location.state} />}
    </DeviceOrderPageWrapper>
  );
}

export default DeviceOrderPage;
