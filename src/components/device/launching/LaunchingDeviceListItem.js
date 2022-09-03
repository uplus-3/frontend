import React, { useState } from 'react';

import { styled } from '@mui/system';
import { Box, Divider } from '@mui/material';

import { PriceFormatter } from '../../../lib/utils';

const LaunchingDeviceListItemBlock = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 280,
  border: `1px solid ${theme.palette.gray2}`,
  borderRadius: '0.875rem',
  display: 'flex',
  flexDirection: 'column',
}));

const ItemTagWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 5,
  left: 10,

  display: 'flex',
  gap: 5,

  '@keyframes move': {
    from: {
      opacity: 0.5,
      transform: 'translateY(4px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0px)',
    },
  },

  span: {
    padding: '0 5px',
    fontSize: '0.75rem',
    color: '#fff',
    background: theme.palette.prime,
    animation: 'move 1.5s infinite ease-in alternate',
  },
}));

const ItemImageWrapper = styled(Box)({
  width: '100%',
  height: 280,
  borderRadius: '0.875rem',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  transform: 'scale(0.8)',
  cursor: 'pointer',
});

const ItemColorWrapper = styled(Box)(({ theme }) => ({
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
      boxShadow: `0 2px 0px 0px ${theme.palette.gray3}`,
      cursor: 'pointer',
      transition: 'transform 0.25s',
    },
    '& li:hover': {
      transform: 'scale(1.3)',
      transition: 'transform 0.25s',
    },
  },
}));

const ItemInfoWrapper = styled(Box)({
  padding: '1.5rem',
  '& .p-name': {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: 15,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
  '& .p-price-sub': {
    fontSize: '0.75rem',
    marginBottom: 5,
  },
  '& .p-price': {
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  '& .origin-price': {
    color: 'gray',
  },
});

const ItemCompareWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 10,
  padding: '1rem 1.5rem',

  '& > div': {
    padding: '5px 25px',
    border: `1px solid ${theme.palette.dark}`,
    borderRadius: 50,
    cursor: 'pointer',

    '&:hover': {
      color: theme.palette.prime,
      borderColor: theme.palette.prime,
    },
  },
}));

function LaunchingDeviceListItem({ data, onClickDetail }) {
  const [cIdx, setCIdx] = useState(0);

  const handleClickColor = (idx) => {
    setCIdx(idx);
  };

  return (
    <LaunchingDeviceListItemBlock>
      <ItemTagWrapper>
        <span>출시예정</span>
      </ItemTagWrapper>
      <ItemImageWrapper
        onClick={() => onClickDetail(data)}
        style={{
          backgroundImage: `url(${data?.launchingColors[cIdx]?.launchingImages[0]?.imageUrl})`,
        }}
      />
      <ItemColorWrapper>
        <ul className="colors">
          {data?.launchingColors.map((color, index) => (
            <li
              key={color.name}
              title={color.name}
              style={{ background: color.rgb }}
              onClick={() => handleClickColor(index)}></li>
          ))}
        </ul>
      </ItemColorWrapper>
      <ItemInfoWrapper>
        <div onClick={() => onClickDetail(data)} className="p-name">
          {data?.name}
        </div>
        <div>
          <div className="p-price-sub">
            <div>준비중</div>
            <div>준비중</div>
          </div>
          <div className="p-price">준비중</div>
        </div>
      </ItemInfoWrapper>
      <Divider />
      <ItemCompareWrapper>
        <div onClick={() => onClickDetail(data)}>자세히 보기</div>
      </ItemCompareWrapper>
    </LaunchingDeviceListItemBlock>
  );
}

export default LaunchingDeviceListItem;
