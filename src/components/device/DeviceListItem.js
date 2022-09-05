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
import useCart from '../../lib/hooks/useCart';

/**
 * 담당자 : 김수현
 */
const DeviceListItemBlock = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 280,
  border: `1px solid ${theme.palette.gray2}`,
  borderRadius: '0.875rem',
}));

const ItemTagWrapper = styled(Box)({
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
    animation: 'move 1.5s infinite ease-in alternate',
  },
});

const ItemImageWrapper = styled(Box)(({ soldout }) => ({
  width: '100%',
  height: 280,
  borderRadius: '0.875rem',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  transform: 'scale(0.8)',
  cursor: 'pointer',
  opacity: soldout && 0.5,
}));

const ItemColorWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '& .colors': {
    display: 'flex',
    gap: 10,
  },
}));

const ColorChip = styled('li')(({ theme, colorCode }) => ({
  borderRadius: '50%',
  background: colorCode,
  width: 12,
  height: 12,
  boxShadow: `0 2px 0px 0px ${theme.palette.gray3}`,
  cursor: 'pointer',
  transition: 'transform 0.25s',
  position: 'relative',

  '&:hover': {
    transform: 'scale(1.3)',
    transition: 'transform 0.25s',
  },

  div: {
    position: 'absolute',
    top: 5,
    width: 12,
    height: 3,
    backgroundColor: '#ffffff',
    transform: 'rotate(45deg)',
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

const AddCartIconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 5px',
}));

function DeviceListItem({ data, showPrice, searchParams }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Calert = useAlert();
  const { addCart } = useCart();
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

  const handleAddCart = () => {
    addCart({
      colorId: data.colors[cIdx].id,
      discountType: data.discountType,
      installmentPeriod: 24,
      planId: searchParams.get('plan') || -1,
      registrationType: 0,
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
      <ItemTagWrapper>
        {data?.tags.map((tag) => (
          <span key={tag.content} style={{ background: tag.rgb }}>
            {tag.content}
          </span>
        ))}
      </ItemTagWrapper>
      <ItemImageWrapper
        onClick={handleGoDetailPage}
        style={{ backgroundImage: `url(${data?.colors[cIdx]?.imageUrl})` }}
        soldout={data?.colors[cIdx]?.stock <= 0}
      />
      <ItemColorWrapper>
        <ul className="colors">
          {data?.colors.map((color, index) => (
            <ColorChip
              key={`color-chip-${color.name}`}
              title={color.name}
              colorCode={color.rgb}
              onClick={() => handleClickColor(index)}>
              {color?.stock <= 0 && <div></div>}
            </ColorChip>
          ))}
        </ul>
      </ItemColorWrapper>
      <ItemInfoWrapper>
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
      </ItemInfoWrapper>
      <Divider />
      <ItemCompareWrapper>
        <AddCartIconWrapper onClick={handleAddCart} className="add-btn">
          <ShoppingCartOutlined />
        </AddCartIconWrapper>
        <div
          className={classnames('add-btn', 'compare-add-btn', {
            selected: isSelected,
          })}
          onClick={handleClickCompareBtn}>
          비교하기
        </div>
      </ItemCompareWrapper>
    </DeviceListItemBlock>
  );
}

export default DeviceListItem;
