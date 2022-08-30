import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import purple from '../../assets/images/SM-F721N-purple-0.jpg';
import blue from '../../assets/images/SM-F721N-blue-0.jpg';
import gold from '../../assets/images/SM-F721N-gold-0.jpg';
import graphite from '../../assets/images/SM-F721N-graphite-0.jpg';

import { styled } from '@mui/system';
import { Box, Divider } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';

import qs from 'qs';
import { PriceFormatter } from '../../lib/utils';

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

const ItemCompareWapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 10,
  padding: '1rem 1.5rem',

  '& .add-btn': {
    border: `1px solid ${theme.palette.dark}`,
    borderRadius: 50,
    cursor: 'pointer',

    '&:hover': {
      color: theme.palette.prime,
      borderColor: theme.palette.prime,
    },
  },

  '& .compare-add-btn': {
    padding: '5px 25px',
  },
}));

const AddCartIconWapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 5px',
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
        {data?.tags.map((tag) => (
          <span key={tag.content} style={{ background: tag.rgb }}>
            {tag.content}
          </span>
        ))}
      </ItemTagWapper>
      <ItemImageWapper
        onClick={handleGoDetailPage}
        style={{ backgroundImage: `url(${colorImages[cIdx]})` }}
        // style={{ backgroundImage: `url(${data.colors[0]?.images[0]?.imageUrl})` }}
      />
      <ItemColorWapper>
        <ul className="colors">
          {data?.colors.map((color, index) => (
            <li
              key={color.name}
              title={color.name}
              style={{ background: color.rgb }}
              onClick={() => handleClickColor(index)}></li>
          ))}
        </ul>
      </ItemColorWapper>
      <ItemInfoWapper>
        <div onClick={handleGoDetailPage} className="p-name">
          {data?.name}
        </div>
        <div>
          <div className="p-price-sub">
            <div className="origin-price">정상가 {PriceFormatter(data?.price)}원</div>
            <div>휴대폰 월 {PriceFormatter(data?.dprice)}원</div>
            <div>통신료 월 {PriceFormatter(data?.plan?.dprice)}원</div>
          </div>
          <div className="p-price">
            월 {PriceFormatter((data?.dprice || 0) + (data?.plan?.dprice || 0))}원
          </div>
        </div>
      </ItemInfoWapper>
      <Divider />
      <ItemCompareWapper>
        <AddCartIconWapper className="add-btn">
          <ShoppingCartOutlined />
        </AddCartIconWapper>
        <div className="add-btn compare-add-btn">비교하기</div>
      </ItemCompareWapper>
    </DeviceListItemBlock>
  );
}

export default DeviceListItem;
