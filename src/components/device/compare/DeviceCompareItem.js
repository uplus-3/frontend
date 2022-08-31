import React from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/system';
import { Close } from '@mui/icons-material';

const DeviceCompareItemBlock = styled('div')(({ theme, data }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: !data && 'center',
  alignItems: 'center',
  gap: 20,
  width: '100%',
  height: '100%',
  padding: 10,
  border: data ? `1px solid ${theme.palette.gray3}` : `2px dashed ${theme.palette.gray3}`,
  borderRadius: 10,
}));

const DeviceImgWapper = styled('div')(({ isLink }) => ({
  height: '100%',
  cursor: isLink && 'pointer',

  '& img': {
    width: '100%',
    height: '100%',
  },
}));

const CloseIconWapper = styled('div')({
  position: 'absolute',
  right: 10,
  top: 10,
  cursor: 'pointer',
});

const InfoWapper = styled('div')({
  '& p:first-of-type': {
    fontWeight: 600,
    fontSize: 14,
  },
  '& p:last-child': {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 24,
  },
});

function DeviceCompareItem({ data, isLink }) {
  const navigate = useNavigate();
  const imgUrl = data
    ? 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-021216-097-IrwyS2Zu.jpg'
    : 'https://image.lguplus.com/static/pc-static/indv/images/icon/unselected.png';

  const handleGoDetail = () => {
    if (isLink) {
      navigate(`/${data?.serialNumber}`);
    }
  };
  return (
    <DeviceCompareItemBlock data={!!data}>
      <CloseIconWapper>
        <Close />
      </CloseIconWapper>
      <DeviceImgWapper isLink onClick={handleGoDetail}>
        <img src={imgUrl} />
      </DeviceImgWapper>
      {data ? (
        <>
          <InfoWapper>
            <p>갤럭시 Z Flip 4</p>
            <p>월 124,900원</p>
          </InfoWapper>
        </>
      ) : (
        <div>기기 미선택</div>
      )}
    </DeviceCompareItemBlock>
  );
}

export default DeviceCompareItem;