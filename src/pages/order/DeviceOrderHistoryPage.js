import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled, Box, Divider } from '@mui/material';
import qs from 'qs';
import RoundBtn from '../../components/common/RoundBtn';
import { PriceFormatter } from '../../lib/utils';
import useAlert from '../../lib/hooks/useAlert';
import { deleteOrder } from '../../lib/api/order';

const OrderSearchResultBlock = styled('div')({
  top: 0,
  display: 'flex',
  marginTop: 70,
  flexDirection: 'column',

  alignItems: 'center',
  gap: 10,
});

const ItemNameNumberWrapper = styled('div')({
  top: 0,
  display: 'flex',
  marginTop: 0,
  flexDirection: 'column',

  alignItems: 'center',
  gap: 10,
});

  // colorName: "스타라이트"
  // createdAt: "2022.08.31"
  // deviceName: "iPhone 13 mini 256G"
  // discountType: 0
  // id: 1
  // imageUrl: "https://image.lguplus.com/common/images/hphn/product/A2628-256/imge_cut/ushop_A2628-256_21_A.jpg"
  // installmentPeriod: 1
  // name: "윤유플"
  // number: 2208313678
  // planName: "5G 시그니처"
  // price: 100236
  // registrationType: 0
  // storage: "256GB"



  const DeviceName = styled('div')(({ isLink }) => ({
    cursor: isLink && 'pointer',
    fontSize: '1.5rem',
    fontWeight: 700,
  }));
  
  const OrderItemInfoWrapper = styled('div')(({ theme, data }) => ({
    border: '2px solid #000',
    borderRadius: '25px',
    position: 'relative',
    display: 'flex',
    justifyContent: !data && 'center',
    alignItems: 'center',
    gap: 20,
    width: '70%',
    height: '70%',
    marginTop : 20
  }));

  const OrderDateformat = styled('div')(({ theme, data }) => ({
    marginBottom: 10,
    span: {
      paddingLeft: 10,
      color: '#00000080',
    },
  }));

  const OrderItemImageWrapper  = styled('div')(({ isLink }) => ({
    height: '100%',
    cursor: isLink && 'pointer',
  
    '& img': {
      width: '100%',
      height: '100%',
    },
  }));
const flexWrapper = styled('div')({
  top: 0,
  display: 'flex',
  marginTop: 50,
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1
});
  
const PriceWrapper = styled('b')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
  margin: '25px 0 0 0',

  '& > div:last-child': {
    position: 'relative',
    'p:last-child': {
      fontSize: '1.875rem',
      fontWeight: 'bold',
    },
  },
}));

const NameWrapper = styled('span')(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: '#E6007E',
  }));

const OrderBottomInfoItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const DeviceInfoFormat = styled('div')(({ theme }) => ({
  marginTop: 10,
  span: {
    paddingLeft: 10,
    color: '#00000080',
  },
}));

const OrderSubjectWrapper = styled('div')(({ theme }) => ({
  fontSize: '1.875rem',
  fontWeight: 'bold',
}));


const OrderNumberWrapper = styled('div')(({ theme }) => ({
  fontSize: '1.5rem',
}));
const AddressWrapper = styled('div')(({theme}) => ({
  wordWrap: 'break-word',
}));

const AddressInfoWrapper = styled('div')(({ theme }) => ({
  fontWeight: 'bold',
  margin: '20px 0 0 0',
}));

const TypeWrapper = styled('div')(({ theme }) => ({
  fontSize: '0.9rem'
}));


function DeviceOrderHistoryPage(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const Calert = useAlert();
  const {address, colorName, createdAt, deviceName, networkType, deviceId, serialNumber, discountType, id, imageUrl, installmentPeriod,name, number, planName, planId, price, registrationType, storage} = location.state
  
  useEffect(() => {
    console.log(location);
  }, [ location ])


  const queryString = qs.stringify({
    plan: {planId},
    discount: {discountType}
  });
  const handleGoDetailPage = () => {
    navigate({
      pathname: `/${networkType}g-phone/${serialNumber}`,
      search: `?id=${deviceId}&${queryString}`,
    });
  };

  const popDeleteAlert = () => {
    Calert.fire({
      title: '주문을 취소하시겠습니까?',
      icon: 'warning',
      confirmButtonText: '확인',
      showCancelButton: true,
    }).then(async(res) => {
      if (res.isConfirmed) {
        const response = await deleteOrder(number);

      }
    });

  }


  return(
  <OrderSearchResultBlock>
      <ItemNameNumberWrapper>
      <OrderSubjectWrapper>주문번호</OrderSubjectWrapper>
      <OrderNumberWrapper>{number}</OrderNumberWrapper>
      <div><NameWrapper>{name}</NameWrapper>님의 주문정보입니다.</div>
      </ItemNameNumberWrapper>
    <OrderItemInfoWrapper>
      <OrderItemImageWrapper isLink onClick={handleGoDetailPage}>
      <img src={imageUrl}/>
      </OrderItemImageWrapper>
    <flexWrapper>
    <OrderDateformat>{createdAt}</OrderDateformat>
        <DeviceName isLink onClick={handleGoDetailPage} >{deviceName}</DeviceName>
        <DeviceInfoFormat><b>색상</b> {colorName}</DeviceInfoFormat>   
        <DeviceInfoFormat><b>저장공간</b> {storage}</DeviceInfoFormat>   
        <PriceWrapper>
        <div>
          <p>월예상납부금액 </p>
          <p>{PriceFormatter(price)}원</p>
        </div>
        </PriceWrapper>
        <TypeWrapper><span>{installmentPeriod === 1 ? '일시불' : `${installmentPeriod}개월 할부`} + {planName} + {discountType === 0 ? '공시지원금' : '선택약정'} 적용 기준</span></TypeWrapper>
        <AddressInfoWrapper>주문자 주소</AddressInfoWrapper>
        <AddressWrapper><div>{address}</div></AddressWrapper>
        <Stack marginTop={2} direction="row" divider={<Divider orientation="vertical" flexItem />}  spacing={2}>
            <RoundBtn>주소 수정</RoundBtn>
            <RoundBtn onClick={popDeleteAlert}>주문 취소</RoundBtn>
        </Stack>
    </flexWrapper>

      </OrderItemInfoWrapper>

  </OrderSearchResultBlock>
  )
}

export default DeviceOrderHistoryPage;
