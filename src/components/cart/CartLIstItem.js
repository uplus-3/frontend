import React from 'react';
import { styled } from '@mui/system';

import RoundBtn from '../common/RoundBtn';

const CartLIstItemBlock = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '20px 0',
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

  '&:first-child': {
    '&::before': {
      display: 'none',
    },
  },
}));

const DeviceWapper = styled('div')({});

const ImageWapper = styled('div')({
  width: 120,
  heigth: 120,
  marginRight: 25,

  '& img': {
    width: '100%',
    height: '100%',
  },
});

const DeviceInfoWapper = styled('div')(({ theme }) => ({
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

const DetailWapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: ' 0 80px',

  '& > div:first-child': {
    paddingRight: 40,
  },

  '& > div:last-child': {
    paddingLeft: 40,
    position: 'relative',
    '&::before': {
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

const OrderWapper = styled('div')({
  fontSize: '1rem',
});

const imgsrc =
  'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020618-663-OMVftJP5.jpg';

function CartLIstItem() {
  return (
    <CartLIstItemBlock>
      <ImageWapper>
        <img src={imgsrc} alt="" />
      </ImageWapper>
      <DeviceInfoWapper>
        <p>2022년 8월 30일 (화)</p>
        <p>갤럭시 Z Flip 4</p>
        <p>(갤럭시워치5G) 5G 다이렉트 65</p>
        <p>
          <span>보라퍼플</span>
          <span>256GB</span>
          <span>24개월 할부</span>
        </p>
      </DeviceInfoWapper>
      <DetailWapper>
        <div>
          <span>기기변경</span>
        </div>
        <div>
          <p>월 예상 납부 금액</p>
          <p>124,900원</p>
        </div>
      </DetailWapper>
      <OrderWapper>
        <RoundBtn content="가입하기" padding="6px 50px" />
      </OrderWapper>
    </CartLIstItemBlock>
  );
}

export default CartLIstItem;
