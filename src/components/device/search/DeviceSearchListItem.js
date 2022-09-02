import React from 'react';

import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { PriceFormatter } from '../../../lib/utils';

const DeviceSearchListItemBlock = styled('div')(({ theme }) => ({
  display: 'flex',
  minWidth: 'calc((100% - 20px)/2)',
  width: 'calc((100% - 20px)/2)',
  border: `1px solid ${theme.palette.gray2}`,
  borderRadius: '0.875rem',
  cursor: 'pointer',
  transform: 'translateY(0px)',
  transition: 'transform 0.5s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 2px 4px 0px #c9c9c9',
  },
}));

const ItemImageWrapper = styled('div')({
  display: 'inline-block',
  height: '100%',
  width: 150,
  borderRadius: '0.875rem',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  cursor: 'pointer',
});

const ItemInfoWrapper = styled('div')({
  flex: 1,
  padding: '1.5rem',
  '& .p-device-name': {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: 15,
    cursor: 'pointer',
  },
  '& .p-plan-name': {
    fontSize: '1.0rem',
    marginBottom: 5,
  },
});

const ItemPriceWrapper = styled('div')({
  width: 200,
  padding: '1.5rem',
  '& .p-device-plan': {
    fontSize: '1.0 rem',
    marginBottom: 5,
  },
  '& .p-total': {
    marginTop: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
});

function DeviceSearchListItem({ result }) {
  const navigate = useNavigate();

  const handleGoDetailPage = () => {
    navigate({
      pathname: `/${result.networkType}g-phone/${result.serialNumber}`,
      search: `?id=${result.id}`,
    });
  };

  return (
    <DeviceSearchListItemBlock onClick={handleGoDetailPage}>
      <ItemImageWrapper
        onClick={handleGoDetailPage}
        style={{ backgroundImage: `url(${result.repImageUrl})` }}
      />
      <ItemInfoWrapper>
        <div className="p-device-name">{result.name}</div>
        <div className="p-plan-name">{result.plan.name}</div>
      </ItemInfoWrapper>
      <ItemPriceWrapper>
        <div className="p-device-plan">휴대폰 월 {PriceFormatter(result.dprice)}원</div>
        <div className="p-device-plan">요금제 월 {PriceFormatter(result.plan.dprice)}원</div>
        <div className="p-total">월 {PriceFormatter(result.dprice + result.plan.dprice)}원</div>
      </ItemPriceWrapper>
    </DeviceSearchListItemBlock>
  );
}

export default DeviceSearchListItem;
