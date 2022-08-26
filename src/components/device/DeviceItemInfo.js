import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Button, useTheme } from '@mui/material';
import SquareBtn from '../common/SquareBtn';
import RoundBtn from '../common/RoundBtn';
import PriceCompareModal from '../modal/PriceCompareModal';
import { PriceFormatter } from '../../lib/utils';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
const DeviceItemInfoBlock = styled('div')({
  width: 600,
  marginTop: 70,
  display: 'flex',
  flexDirection: 'column',
  // alignItems: 'start',
  gap: 15,
  alignSelf: 'flex-start',
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
  marginTop: 35,
  marginBottom: 25,
  padding: '30px 50px 30px 50px',
  width: '90%',
}));

const DeviceSelectResultTitle = styled('div')({
  fontWeight: 700,
  fontSize: '1.5rem',
});

const DevicePriceTable = styled('table')({
  marginTop: 10,
  fontSize: '0.85rem',
  borderCollapse: 'separate',
  td: {
    width: 70,
  },
});

const CompareBtn = styled(Button)(({ theme }) => ({
  position: 'absolute',
  right: 10,
  top: 10,
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
  const navigate = useNavigate();

  const [selectedShippingIdx, setSelectedShippingIdx] = useState(0);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const handleOrderClick = () => {
    navigate('/order/mobile', { state: { ...deviceInfo, selectedColor: selectedColor } });
  };
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
              key={`${type}-${idx}`}
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
        <CompareBtn onClick={() => setCompareModalOpen(true)}>비교하기</CompareBtn>
        <DeviceSelectResultTitle>
          월 {PriceFormatter(deviceInfo?.d_price)}원
        </DeviceSelectResultTitle>
        {deviceInfo?.plan?.name}, 공시지원금 기준
        <DevicePriceTable>
          <tbody>
            <tr>
              <td>휴대폰</td>
              <td>{PriceFormatter(4690)}원</td>
            </tr>
            <tr>
              <td>통신료</td>
              <td>{PriceFormatter(55000)}원</td>
            </tr>
            <tr>
              <td>정상가</td>
              <td>{PriceFormatter(428000)}원</td>
            </tr>
          </tbody>
        </DevicePriceTable>
      </DeviceSelectResult>
      <AlignCenterDiv>
        <RoundBtn height={40} width={300} onClick={handleOrderClick}>
          주문하기
        </RoundBtn>
      </AlignCenterDiv>
      <PriceCompareModal open={compareModalOpen} setOpen={setCompareModalOpen} />
    </DeviceItemInfoBlock>
  );
}

DeviceItemInfo.propTypes = {
  deviceInfo: PropTypes.object,
  selectedColor: PropTypes.object,
  setSelectedColor: PropTypes.func,
};
export default DeviceItemInfo;
