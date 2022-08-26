import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Button, useTheme } from '@mui/material';
import SquareBtn from '../common/SquareBtn';
import RoundBtn from '../common/RoundBtn';
import { getFormattedPrice } from '../../lib/utils';

import PropTypes from 'prop-types';
const DeviceItemInfoBlock = styled('div')({
  width: 600,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: 15,
});

const DeviceName = styled('div')({
  fontSize: '1.5rem',
  fontWeight: 700,
});

const DeviceInfoFormat = styled('div')(({ theme }) => ({
  marginTop: 10,
  span: {
    paddingLeft: 10,
    color: '#00000080',
  },
}));

const AlignCenterDiv = styled('div')(({ theme }) => ({
  width: '90%',
  display: 'flex',
  justifyContent: 'center',
  height: 'auto',
}));

const DeviceColorChip = styled('div')({
  marginTop: 5,
  display: 'flex',
  gap: 5,
  '.selected-color-chip': {
    border: '2px solid #000',
    outline: '3px solid #fff',
    outlineOffset: '-4px',
  },
  '.sold-out-color': {
    width: 50,
    height: 3,
    backgroundColor: '#ffffff',
    transform: 'rotate(45deg)',
  },
});

const DeviceShippingTypeFormat = styled('div')({
  marginTop: 8,
  display: 'flex',
  gap: 20,
});

const ColorChip = styled('div')(({ colorCode }) => ({
  borderRadius: '50%',
  background: colorCode,
  width: 35,
  height: 35,
  cursor: 'pointer',
}));

const DeviceSelectResult = styled('div')(({ theme }) => ({
  position: 'relative',
  background: theme.palette.gray2,
  borderRadius: 15,
  padding: 10,
  width: '90%',
  height: 300,
}));

const DeviceSelectResultTitle = styled('div')({
  fontWeight: 700,
  fontSize: '1.5rem',
});

const CompareBtn = styled(Button)(({ theme }) => ({
  position: 'absolute',
  right: 10,
  color: '#000000',
  '&:hover': {
    background: 'transparent',
    color: '#00000090',
  },
}));

const DeviceTag = ({ tag }) => {
  const color = {
    인기: '#D44602',
    예약가입: '#5257A1',
    최신: '#7C37D5',
    'U+단독': '#522EA7',
    가격인하: '#287DA0',
    일시품절: '#000000',
    지원금확대: '#D62663',
  };

  return (
    <span
      style={{
        fontSize: '0.8rem',
        padding: 3,
        backgroundColor: color[tag] || '#000000',
        color: '#FFFFFF',
      }}>
      {tag}
    </span>
  );
};

function DeviceItemInfo({ deviceInfo, selectedColor, setSelectedColor }) {
  const theme = useTheme();
  const [selectedShippingIdx, setSelectedShippingIdx] = useState(0);
  return (
    <DeviceItemInfoBlock>
      <div>
        {deviceInfo?.tags?.map((tag, idx) => (
          <DeviceTag tag={tag?.content} key={`${tag}-${idx}`} />
        ))}
      </div>
      <DeviceName>{deviceInfo?.name}</DeviceName>
      <div>
        <DeviceInfoFormat>
          색상 <span>{selectedColor?.name}</span>
        </DeviceInfoFormat>
        <DeviceColorChip>
          {deviceInfo?.colors.map((color, idx) => (
            <ColorChip
              key={`color-chip-${idx}`}
              colorCode={color.code}
              onClick={() => setSelectedColor(color)}
              className={selectedColor.name === color.name && 'selected-color-chip'}
            />
          ))}
        </DeviceColorChip>
      </div>
      <DeviceInfoFormat>
        저장공간 <span>{deviceInfo?.storage}GB</span>
      </DeviceInfoFormat>
      <DeviceInfoFormat>
        가입유형
        <DeviceShippingTypeFormat>
          {['기기변경', '번호이동', '신규가입'].map((type, idx) => (
            <SquareBtn
              border={selectedShippingIdx === idx && `1px solid ${theme.palette.prime}`}
              color={selectedShippingIdx === idx && theme.palette.prime}
              width={160}
              onClick={() => {
                setSelectedShippingIdx(idx);
              }}>
              {type}
            </SquareBtn>
          ))}
        </DeviceShippingTypeFormat>
      </DeviceInfoFormat>
      <DeviceSelectResult>
        <CompareBtn>비교하기</CompareBtn>
        <DeviceSelectResultTitle>
          월 {getFormattedPrice(deviceInfo?.d_price)}원
        </DeviceSelectResultTitle>
      </DeviceSelectResult>
      <AlignCenterDiv>
        <RoundBtn height="100%" width={200}>
          주문하기
        </RoundBtn>
      </AlignCenterDiv>
    </DeviceItemInfoBlock>
  );
}

DeviceItemInfo.propTypes = {
  deviceInfo: PropTypes.object,
  selectedColor: PropTypes.object,
  setSelectedColor: PropTypes.func,
};
export default DeviceItemInfo;
