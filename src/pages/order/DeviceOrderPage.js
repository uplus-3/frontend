import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import OrderForm from '../../components/order/OrderForm';
import OrderReceipt from '../../components/order/OrderReceipt';
import useAlert from '../../lib/hooks/useAlert';

import { useSelector, useDispatch } from 'react-redux';

import Error from '../../components/common/Error';

const DeviceOrderPageWrapper = styled('div')({
  display: 'flex',
});

const ErrorWrapper = styled('div')({
  marginTop: 30,
});

function DeviceOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Calert = useAlert();
  const formRef = useRef();
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [devicePriceInfo, setDevicePriceInfo] = useState(null);
  const [orderForm, setOrderForm] = useState({
    colorId: 1,
    discountType: 0,
    installmentPeriod: 24,
    planId: 1,
    price: 0,
    registrationType: 0,
    shipmentType: 1,
  });

  const isLoading = useSelector(({ loading }) => loading?.order);
  const isError = useSelector(({ error }) => error?.order);

  const checkUserInfo = () => {
    return formRef.current.checkUserInfo();
  };

  const getUserInfo = () => {
    return formRef.current.getUserInfo();
  };

  useEffect(() => {
    const { state } = location;
    if (!!!state) {
      Calert.fire({
        title: '잘못된 접근입니다',
        text: '3초 후 이전 페이지로 이동합니다.',
        timer: 3000,
      }).then((res) => {
        navigate(-1);
      });
    }
    setDeviceInfo({ ...state.deviceInfo, selectedColor: { ...state.selectedColor } });
    setDevicePriceInfo(state.devicePriceInfo);
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
      {isError ? (
        <ErrorWrapper>
          <Error message="주문 정보를 불러올 수 없습니다." />
        </ErrorWrapper>
      ) : (
        <>
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
                setOrderForm={setOrderForm}
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
        </>
      )}
    </DeviceOrderPageWrapper>
  );
}

export default DeviceOrderPage;
