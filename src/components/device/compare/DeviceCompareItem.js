import React from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/system';
import { Close } from '@mui/icons-material';

import { PriceFormatter } from '../../../lib/utils';

/**
 * 담당자 : 김수현
 */
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

const DeviceImgWrapper = styled('div')(({ isLink }) => ({
  height: '100%',
  cursor: isLink && 'pointer',

  '& img': {
    width: '100%',
    height: '100%',
  },
}));

const CloseIconWrapper = styled('div')({
  position: 'absolute',
  right: 10,
  top: 10,
  cursor: 'pointer',

  svg: {
    verticalAlign: 'middle',
  },
});

const InfoWrapper = styled('div')({
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

const noDeviceImg = 'https://image.lguplus.com/static/pc-static/indv/images/icon/unselected.png';

function DeviceCompareItem({ device, isLink, onClickRemove, isModal }) {
  const navigate = useNavigate();

  const handleGoDetail = () => {
    if (isLink) {
      navigate({
        pathname: `./${device.serialNumber}`,
        search: `?id=${device.id}`,
      });
    }
  };
  return (
    <DeviceCompareItemBlock data={!!device}>
      {device && (
        <CloseIconWrapper onClick={() => onClickRemove(device.id)}>
          <Close />
        </CloseIconWrapper>
      )}
      <DeviceImgWrapper isLink={isLink} onClick={handleGoDetail}>
        <img
          src={
            device
              ? device.colors[0]?.imageUrl || device.colors[0]?.images[0]?.imageUrl
              : noDeviceImg
          }
          alt="단말기 사진"
        />
      </DeviceImgWrapper>
      {device ? (
        <>
          <InfoWrapper>
            <p>{device.name}</p>
            <p>월 {PriceFormatter(device.ddevicePrice + device.dplanPrice)}원</p>
          </InfoWrapper>
        </>
      ) : (
        <>{isModal ? <div>기기 미선택</div> : <div></div>}</>
      )}
    </DeviceCompareItemBlock>
  );
}

export default DeviceCompareItem;
