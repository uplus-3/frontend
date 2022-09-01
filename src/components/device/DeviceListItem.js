import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/system';
import { Box, Divider } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';

import qs from 'qs';
import useAlert from '../../lib/hooks/useAlert';
import classnames from 'classnames';

import { PriceFormatter } from '../../lib/utils';
import { devicesActions } from '../../modules/actions/devicesSlice';
import { useDispatch, useSelector } from 'react-redux';

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

  display: 'flex',
  gap: 5,

  span: {
    padding: '0 5px',
    fontSize: '0.75rem',
    color: '#fff',
  },
});

const ItemImageWapper = styled(Box)({
  width: '100%',
  height: 280,
  borderRadius: '0.875rem',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  transform: 'scale(0.8)',
  cursor: 'pointer',
});

const ItemColorWapper = styled(Box)(({ theme }) => ({
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

    '&.selected, &.selected:hover': {
      border: `1px solid ${theme.palette.dark}`,
      background: theme.palette.dark,
      color: '#fff',
    },
  },
}));

const AddCartIconWapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 5px',
}));

function DeviceListItem({ data, showPrice, searchParams }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Calert = useAlert();
  const comparison = useSelector((state) => state.devices.comparison);
  const [cIdx, setCIdx] = useState(0);
  const isSelected = !!comparison.find((d) => d.id === data.id);

  const queryString = qs.stringify({
    plan: searchParams.get('plan') || -1,
    discount: searchParams.get('discount') || -1,
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

  const handleClickCompareBtn = async () => {
    if (comparison.length === 3 && !isSelected) {
      Calert.fire({
        title: '최대 3개 상품까지 <br/>비교하기가 가능합니다.',
      });
      return;
    }
    dispatch(devicesActions.updateComparison(data));
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
        style={{ backgroundImage: `url(${data?.colors[cIdx]?.imageUrl})` }}
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
            {showPrice && (
              <div className="origin-price">정상가 {PriceFormatter(data?.price || 0)}원</div>
            )}
            <div>휴대폰 월 {PriceFormatter(data?.ddevicePrice || 0)}원</div>
            <div>통신료 월 {PriceFormatter(data?.dplanPrice || 0)}원</div>
          </div>
          <div className="p-price">
            월 {PriceFormatter((data?.ddevicePrice || 0) + (data?.dplanPrice || 0))}원
          </div>
        </div>
      </ItemInfoWapper>
      <Divider />
      <ItemCompareWapper>
        <AddCartIconWapper className="add-btn">
          <ShoppingCartOutlined />
        </AddCartIconWapper>
        <div
          className={classnames('add-btn', 'compare-add-btn', {
            selected: isSelected,
          })}
          onClick={handleClickCompareBtn}>
          비교하기
        </div>
      </ItemCompareWapper>
    </DeviceListItemBlock>
  );
}

export default DeviceListItem;
