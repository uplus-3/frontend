import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import purple from '../../assets/images/SM-F721N-purple-0.jpg';
import blue from '../../assets/images/SM-F721N-blue-0.jpg';
import gold from '../../assets/images/SM-F721N-gold-0.jpg';
import graphite from '../../assets/images/SM-F721N-graphite-0.jpg';

import { styled } from '@mui/system';
import { Box, Divider } from '@mui/material';

import qs from 'qs';

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
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  cursor: 'pointer',
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
      cursor: 'pointer',
      transition: 'transform 0.25s',
    },
    '& li:hover': {
      transform: 'scale(1.3)',
      transition: 'transform 0.25s',
    },
  },
});

const ItemInfoWapper = styled(Box)({
  padding: '1.5rem',
  '& .p-name': {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: 15,
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

const colorImages = [purple, gold, blue, graphite];

function DeviceListItem({ data }) {
  const navigate = useNavigate();
  const filter = useSelector((state) => state.devices.filter);
  const [cIdx, setCIdx] = useState(0);

  const queryString = qs.stringify({
    plan: filter.plan,
    discount: filter.discount,
  });

  const handleClickColor = (idx) => {
    setCIdx(idx);
  };

  const handleGoDetailPage = () => {
    navigate({
      pathname: `./${data.serialNumber}`,
      search: `?id=${data.id}&${queryString}`,
    });
  };

  return (
    <DeviceListItemBlock>
      <ItemTagWapper>
        {data.tags.map((tag) => (
          <span key={tag.content} className="popular" style={{ background: tag.rgb }}>
            {tag.content}
          </span>
        ))}
      </ItemTagWapper>
      <ItemImageWapper
        onClick={handleGoDetailPage}
        style={{ backgroundImage: `url(${colorImages[cIdx]})` }}
      />
      <ItemColorWapper>
        <ul className="colors">
          {data.colors.map((color, index) => (
            <li
              key={color.name}
              title={color.name}
              style={{ background: color.code }}
              onClick={() => handleClickColor(index)}></li>
          ))}
        </ul>
      </ItemColorWapper>
      <ItemInfoWapper>
        <div onClick={handleGoDetailPage} className="p-name">
          {data.name}
        </div>
        <div>
          <div className="p-price-sub">
            <div className="origin-price">정상가 {data.price.toLocaleString('ko-KR')}원</div>
            <div>휴대폰 월 59,000원</div>
            <div>통신료 월 65,000원</div>
          </div>
          <div className="p-price">월 {data.m_price.toLocaleString('ko-KR')}원</div>
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
