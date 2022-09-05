import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Helmet } from 'react-helmet-async';
import OrderSearchForm from '../../components/order/OrderSearchForm';

const DeviceOrderSearchInputPageBlock = styled('div')({
  display: 'flex',
});

function DeviceOrderSearchInputPage() {
  const navigate = useNavigate();
  const formRef = useRef();
  const [orderSearchForm, setOrderSearchForm] = useState({
    name: null,
    number: null,
  });

  const checkNameInfo = () => {
    return formRef.current.checkNameInfo();
  };

  return (
    <DeviceOrderSearchInputPageBlock>
      <Helmet>
        <title> 주문조회 | 엘지유플 최강 3조</title>
      </Helmet>
      <OrderSearchForm>
        orderSearchForm = {OrderSearchForm}
        setOrderSearchForm={setOrderSearchForm}
        ref={formRef}
      </OrderSearchForm>
    </DeviceOrderSearchInputPageBlock>
  );
}

export default DeviceOrderSearchInputPage;
