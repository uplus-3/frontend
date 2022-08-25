import React from 'react';
import TestImage from '../../assets/images/SM-F721N-purple-0.jpg';

import { styled } from '@mui/system';
import { Box, Divider, Typography } from '@mui/material';

const colors = [
  {
    name: '보라퍼플',
    color: 'rgb(184, 170, 203)',
  },
  {
    name: '핑크골드',
    color: 'rgb(236, 219, 211)',
  },
  {
    name: '블루',
    color: 'rgb(201, 209, 228)',
  },
  {
    name: '그라파이트',
    color: 'rgb(66, 67, 71)',
  },
];

const DeviceListItemBlock = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 280,
  border: `1px solid ${theme.palette.gray2}`,
  borderRadius: '0.875rem',
}));

const ItemTagWapper = styled(Box)({
  position: 'absolute',
  top: 5,
  left: 10,

  '& .popular': {
    background: '#d44602',
    color: '#fff',
    padding: '5px',
    fontSize: '0.75rem',
  },
});

const ItemImageWapper = styled(Box)({
  width: '100%',
  height: 280,
  borderRadius: '0.875rem',
  backgroundImage: `url(${TestImage})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
});

const ItemColorWapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& .colors': {
    display: 'flex',
    gap: 10,

    '& li': {
      width: 12,
      height: 12,
      borderRadius: '100%',
    },
  },
});

const ItemInfoWapper = styled(Box)({
  padding: '1.5rem',
  '& .p-name': {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: 15,
  },
  '& .p-price-sub': {
    fontSize: '0.75rem',
    marginBottom: 5,
  },
  '& .p-price': {
    fontSize: '1.5rem',
    fontWeight: 700,
  },
});

const ItemCompareWapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '1rem 1.5rem',

  '& .compare-add-btn': {
    border: `1px solid ${theme.palette.dark}`,
    borderRadius: 50,
    padding: '5px 25px',
    cursor: 'pointer',

    '&:hover': {
      color: theme.palette.prime,
      borderColor: theme.palette.prime,
    },
  },
}));

function DeviceListItem() {
  return (
    <DeviceListItemBlock>
      <ItemTagWapper>
        <span className="popular">인기</span>
      </ItemTagWapper>
      <ItemImageWapper />
      <ItemColorWapper>
        <ul className="colors">
          {colors.map((color) => (
            <li key={color.name} title={color.name} style={{ background: color.color }}></li>
          ))}
        </ul>
      </ItemColorWapper>
      <ItemInfoWapper>
        <div className="p-name">갤럭시 Z Flip 4</div>
        <div>
          <div className="p-price-sub">
            <div>휴대폰 월 59,000원</div>
            <div>통신료 월 65,000원</div>
          </div>
          <div className="p-price">월 124,900원</div>
        </div>
      </ItemInfoWapper>
      <Divider />
      <ItemCompareWapper>
        <div className="compare-add-btn">비교하기</div>
      </ItemCompareWapper>
    </DeviceListItemBlock>
  );
}

export default DeviceListItem;
