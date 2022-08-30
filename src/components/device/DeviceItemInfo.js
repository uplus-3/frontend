import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Button, useTheme } from '@mui/material';
import SquareBtn from '../common/SquareBtn';
import RoundBtn from '../common/RoundBtn';
import PriceCompareModal from '../modal/PriceCompareModal';
import { PriceFormatter } from '../../lib/utils';

import PropTypes from 'prop-types';
import { useNavigate, useSearchParams } from 'react-router-dom';
const DeviceItemInfoBlock = styled('div')({
  width: 600,
  marginTop: 150,
  display: 'flex',
  flexDirection: 'column',
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
  gap: 20,
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
});

const ColorChip = styled('div')(({ colorCode }) => ({
  borderRadius: '50%',
  background: colorCode,
  position: 'relative',
  width: 35,
  height: 35,
  cursor: 'pointer',
  // overflow: 'hidden',
  boxShadow: '0px 0px 6px 1px rgb(0 0 0 / 20%)',
  div: {
    position: 'absolute',
    top: 15,
    left: -10,
    width: 50,
    height: 3,
    backgroundColor: '#ffffff',
    transform: 'rotate(45deg)',
  },
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
    width: 80,
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
  const [searchParams] = useSearchParams();

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
              colorCode={color.rgb}
              onClick={() => setSelectedColor(color)}
              className={[selectedColor.name === color.name && 'selected-color-chip'].join(' ')}>
              {color.stock <= 0 && <div></div>}
            </ColorChip>
          ))}
        </DeviceColorChip>
      </div>
      <DeviceInfoFormat>
        저장공간 <span>{deviceInfo?.storage}</span>
      </DeviceInfoFormat>
      <DeviceSelectResult>
        <CompareBtn onClick={() => setCompareModalOpen(true)}>비교하기</CompareBtn>
        <DeviceSelectResultTitle>
          월 {PriceFormatter(deviceInfo?.plan?.dprice + deviceInfo?.dprice)}원
        </DeviceSelectResultTitle>
        {deviceInfo?.plan?.name}, {deviceInfo?.psupport > 0 ? '공시지원금' : '선택약정 (24개월)'}{' '}
        기준
        <DevicePriceTable>
          <tbody>
            <tr>
              <td>휴대폰</td>
              <td>{PriceFormatter(deviceInfo?.dprice)}원</td>
            </tr>
            <tr>
              <td>통신료</td>
              <td>{PriceFormatter(deviceInfo?.plan?.dprice)}원</td>
            </tr>
            <tr>
              <td>정상가</td>
              <td>{PriceFormatter(deviceInfo?.price)}원</td>
            </tr>
          </tbody>
        </DevicePriceTable>
      </DeviceSelectResult>
      <AlignCenterDiv>
        <RoundBtn
          height={40}
          width={100}
          backgroundColor="#FFFFFF"
          border={`1px solid ${theme.palette.prime}`}
          color={theme.palette.prime}>
          장바구니
        </RoundBtn>
        <RoundBtn
          height={40}
          width={300}
          onClick={handleOrderClick}
          disabled={selectedColor.stock === 0}
          backgroundColor={selectedColor.stock === 0 ? theme.palette.prime + '20' : ''}>
          {selectedColor.stock > 0 ? '주문하기' : '품절'}
        </RoundBtn>
      </AlignCenterDiv>
      <PriceCompareModal
        open={compareModalOpen}
        setOpen={setCompareModalOpen}
        deviceId={deviceInfo.id}
        imgUrl={selectedColor?.images[0].imageUrl}
        name={deviceInfo.name}
      />
    </DeviceItemInfoBlock>
  );
}

DeviceItemInfo.propTypes = {
  deviceInfo: PropTypes.object,
  selectedColor: PropTypes.object,
  setSelectedColor: PropTypes.func,
};
export default DeviceItemInfo;
