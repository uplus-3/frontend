import React, { useMemo } from 'react';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import RoundBtn from '../common/RoundBtn';
import { PriceFormatter } from '../../lib/utils';
import { createSearchParams, useNavigate } from 'react-router-dom';
import useCart from '../../lib/hooks/useCart';

/**
 * 담당자 : 성아영
 */
const CartLIstItemBlock = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '20px 40px 20px 0',
  position: 'relative',

  '&::before': {
    content: "''",
    width: '100%',
    height: 1,
    display: 'block',
    background: theme.palette.gray2,
    position: 'absolute',
    top: 0,
  },

  '&:first-of-type': {
    '&::before': {
      display: 'none',
    },
  },
}));

const ImageWrapper = styled('div')({
  width: 120,
  heigth: 120,
  marginRight: 25,
  cursor: 'pointer',
  '& img': {
    width: '100%',
    height: '100%',
  },
});

const DeviceInfoWrapper = styled('div')(({ theme }) => ({
  flex: 1,
  '&  p:nth-of-type(1)': {
    fontSize: '0.75rem',
  },
  '&  p:nth-of-type(2)': {
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  '& p:nth-of-type(4)': {
    marginTop: 15,
    display: 'flex',

    '& span::after': {
      content: "''",
      width: 1,
      height: 15,
      background: theme.palette.gray3,
      display: 'inline-block',
      margin: '0 10px',
      verticalAlign: 'middle',
    },

    '& span:last-child::after': {
      display: 'none',
    },
  },
}));

const DetailWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  width: 530,
  margin: ' 0 80px',
  '& > div:first-of-type': {
    paddingRight: 40,
  },
  '& > div:nth-of-type(n+2)': {
    paddingRight: 40,
    paddingLeft: 40,
    position: 'relative',
    '&::after': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      display: 'block',
      width: 1,
      height: 56,
      margin: 'auto 0',
      background: theme.palette.gray3,
    },
    'p:last-child': {
      fontSize: '1.875rem',
      fontWeight: 'bold',
    },
  },
}));

const OrderWrapper = styled('div')({
  fontSize: '1rem',
});

const DeleteButton = styled(IconButton)({
  position: 'absolute',
  top: 0,
  right: 0,
});

function CartLIstItem({ cartItem, setCartList }) {
  const navigate = useNavigate();
  const { deleteCart } = useCart();
  const {
    colorName,
    createdAt,
    serialNumber,
    networkType,
    deviceName,
    planId,
    discountType,
    deviceId,
    imageUrl,
    installmentPeriod,
    planName,
    price,
    registrationType,
    storage,
  } = cartItem;

  const stringRegistrationType = useMemo(() => {
    switch (registrationType) {
      case 0:
        return '기기변경';
      case 1:
        return '신규가입';
      case 2:
        return '번호이동';
      default:
        return '기기변경';
    }
  }, [registrationType]);

  const navigateDeviceDetail = () => {
    const params = {
      id: deviceId,
      'installment-period': installmentPeriod,
      'discount-type': discountType,
      plan: planId,
    };

    navigate({
      pathname: `/${networkType}/${serialNumber}`,
      search: createSearchParams(params).toString(),
    });
  };

  const handleDeleteCartItem = () => {
    deleteCart(cartItem.id).then((res) => {
      setCartList((items) => {
        return items.filter((item) => item.id !== cartItem.id);
      });
    });
  };

  return (
    <CartLIstItemBlock>
      <ImageWrapper onClick={navigateDeviceDetail}>
        <img src={imageUrl} alt="" />
      </ImageWrapper>
      <DeviceInfoWrapper>
        <p>{createdAt}</p>
        <p>{deviceName}</p>
        <p>{planName}</p>
        <p>
          <span>{colorName}</span>
          <span>{storage}</span>
          <span>{installmentPeriod === 1 ? '일시불' : `${installmentPeriod}개월 할부`}</span>
        </p>
      </DeviceInfoWrapper>
      <DetailWrapper>
        <div>
          <span>{discountType === 0 ? '공시지원금' : '선택약정'}</span>
        </div>
        <div>
          <span>{stringRegistrationType}</span>
        </div>
        <div>
          <p>월 예상 납부 금액</p>
          <p>{PriceFormatter(price)}원</p>
        </div>
      </DetailWrapper>
      <OrderWrapper>
        <RoundBtn onClick={navigateDeviceDetail} content="자세히보기" padding="6px 50px" />
      </OrderWrapper>
      <DeleteButton onClick={handleDeleteCartItem}>
        <Close />
      </DeleteButton>
    </CartLIstItemBlock>
  );
}

export default CartLIstItem;
