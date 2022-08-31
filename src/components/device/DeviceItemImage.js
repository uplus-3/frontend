import React, { useState } from 'react';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';

const DeviceItemImageBlock = styled('div')({
  position: 'sticky',
  top: 0,
  display: 'flex',
  marginTop: 70,
  flexDirection: 'column',

  alignItems: 'center',
  gap: 10,
});

const MainImage = styled('div')({});

const MainImageSelector = styled('div')({
  display: 'flex',
  gap: 20,
});

const DefaultImage = styled('div')({
  fontWeight: 600,
});

const MainImageSelectorItem = styled('div')({
  cursor: 'pointer',
  '.not-selected-image': {
    opacity: 0.3,
  },
});

function DeviceItemImage({ colors, selectedColor }) {
  const [imageIdx, setImageIdx] = useState(0);
  return (
    <>
      <DeviceItemImageBlock>
        {colors && selectedColor ? (
          <>
            <MainImage>
              <img src={selectedColor?.images[imageIdx]?.imageUrl} alt="메인 이미지" />
            </MainImage>
            <MainImageSelector>
              {selectedColor?.images?.map((image, idx) => (
                <MainImageSelectorItem
                  key={`selected-item-${idx}`}
                  onClick={() => setImageIdx(idx)}>
                  <img
                    width={100}
                    src={image.imageUrl}
                    className={idx !== imageIdx ? 'not-selected-image' : ''}
                    alt={`이미지-${idx}`}
                  />
                </MainImageSelectorItem>
              ))}
            </MainImageSelector>
          </>
        ) : (
          <DefaultImage>준비중인 페이지입니다</DefaultImage>
        )}
      </DeviceItemImageBlock>
    </>
  );
}

DeviceItemImage.propTypes = {
  colors: PropTypes.array,
  selectedColor: PropTypes.object,
};

export default DeviceItemImage;
