import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material';

import DeviceItemImage from '../../components/device/DeviceItemImage';
import DeviceItemInfo from '../../components/device/DeviceItemInfo';

const DeviceDetailPageWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});
const tempData = {
  id: 'SM-F721N',
  name: '갤럭시 Z Flip 4',
  price: 1353000,
  m_price: '기기월납부액',
  d_price: 59690,
  storage: 256,
  stock: 1,
  plan: {
    price: '요금제가격(월)',
    d_price: '할인된가격(할인적용)',
  },
  tags: [
    {
      content: '인기',
      rgb: '#d44602',
    },
  ],
  colors: [
    {
      name: '보라퍼플',
      code: 'rgb(184, 170, 203)',
      images: [
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020618-663-OMVftJP5.jpg',
        },
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020618-678-C8yYoMIx.jpg',
        },
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020618-674-ItkOP0vp.jpg',
        },
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020618-663-cMCHj8k6.jpg',
        },
      ],
    },
    {
      name: '핑크골드',
      code: 'rgb(236, 219, 211)',
      images: [
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020631-391-bPE9jcWN.jpg',
        },
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020631-412-gCsMNDbi.jpg',
        },
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020631-408-G3z83woI.jpg',
        },
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020631-401-2JepFcRu.jpg',
        },
      ],
    },
    {
      name: '블루',
      code: 'rgb(201, 209, 228)',
      images: [
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020644-529-ZPW12jIy.jpg',
        },
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020644-547-64XjTeRC.jpg',
        },
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020644-560-4vO3OWch.jpg',
        },
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020644-539-mlrSiD9s.jpg',
        },
      ],
    },
    {
      name: '그라파이트',
      code: 'rgb(66, 67, 71)',
      images: [
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020701-465-vFiTeAxV.jpg',
        },
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020701-465-VGEBhGV7.jpg',
        },
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020701-471-PIQiO80S.jpg',
        },
        {
          url: 'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-020701-460-sxZD3Tpa.jpg',
        },
      ],
    },
  ],
};
function DeviceDetailPage() {
  useEffect(() => {
    getDeviceDetailInfo();
  }, []);

  const [deviceDetailInfo, setDeviceDetailInfo] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // 서버와 통신해 디바이스 정보를 가져옴
  const getDeviceDetailInfo = () => {
    setDeviceDetailInfo(tempData);
    setSelectedColor(tempData.colors[0]);
  };

  return (
    <div>
      <DeviceDetailPageWrapper>
        {deviceDetailInfo && (
          <>
            <DeviceItemImage colors={deviceDetailInfo.colors} selectedColor={selectedColor} />
            <DeviceItemInfo
              deviceInfo={deviceDetailInfo}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          </>
        )}
      </DeviceDetailPageWrapper>
    </div>
  );
}

export default DeviceDetailPage;
