import React from 'react';
import { styled } from '@mui/system';
import { Helmet } from 'react-helmet-async';
import OrderSearchForm from '../../components/order/OrderSearchForm';

/**
 * 담당자 : 윤병찬
 */
const DeviceOrderSearchInputPageBlock = styled('div')({
  display: 'flex',
});

function DeviceOrderSearchInputPage() {
  return (
    <DeviceOrderSearchInputPageBlock>
      <Helmet>
        <title> 주문조회 | 엘지유플 최강 3조</title>
      </Helmet>
      <OrderSearchForm></OrderSearchForm>
    </DeviceOrderSearchInputPageBlock>
  );
}

export default DeviceOrderSearchInputPage;
