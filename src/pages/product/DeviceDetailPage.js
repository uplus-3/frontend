import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material';
import { getDeviceDetail, getDeviceList } from '../../lib/api/device';
import axios from 'axios';
import DeviceItemImage from '../../components/device/DeviceItemImage';
import DeviceItemInfo from '../../components/device/DeviceItemInfo';
import { useSearchParams } from 'react-router-dom';

const DeviceDetailPageWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});
const tempData = {
  id: 1,
  serialNumber: 'SM-S901N',
  name: '갤럭시 S22 256GB',
  price: 999900,
  plan: {
    id: 1,
    name: '5G 시그니처',
    price: 130000,
    dprice: 97500,
    sdiscount: 32500,
  },
  psupport: 0,
  tags: [
    {
      content: '최신',
      rgb: '#7C37D5',
    },
  ],
  colors: [
    {
      name: '보라 퍼플',
      rgb: '#B8AACB',
      stock: 0,
      images: [
        {
          imageUrl:
            'https://image.lguplus.com/static/pc-contents/images/prdv/20220810-050335-443-wy20d2Cz.jpg',
        },
        {
          imageUrl:
            'https://image.lguplus.com/static/pc-contents/images/prdv/20220810-050335-443-fheChOkq.jpg',
        },
        {
          imageUrl:
            'https://image.lguplus.com/static/pc-contents/images/prdv/20220810-050335-443-A0ixpojC.jpg',
        },
        {
          imageUrl:
            'https://image.lguplus.com/static/pc-contents/images/prdv/20220810-050335-443-Jd51xejS.jpg',
        },
      ],
    },
    {
      name: '새하얀 화이트',
      rgb: '#FFFFFF',
      stock: 0,
      images: [
        {
          imageUrl:
            'https://image.lguplus.com/static/pc-contents/images/prdv/20220810-050335-443-wy20d2Cz.jpg',
        },
        {
          imageUrl:
            'https://image.lguplus.com/static/pc-contents/images/prdv/20220810-050335-443-fheChOkq.jpg',
        },
        {
          imageUrl:
            'https://image.lguplus.com/static/pc-contents/images/prdv/20220810-050335-443-A0ixpojC.jpg',
        },
        {
          imageUrl:
            'https://image.lguplus.com/static/pc-contents/images/prdv/20220810-050335-443-Jd51xejS.jpg',
        },
      ],
    },
    {
      name: '시퍼런 블루',
      rgb: '#B8AACB',
      stock: 10,
      images: [
        {
          imageUrl:
            'https://image.lguplus.com/static/pc-contents/images/prdv/20220810-050335-443-wy20d2Cz.jpg',
        },
        {
          imageUrl:
            'https://image.lguplus.com/static/pc-contents/images/prdv/20220810-050335-443-fheChOkq.jpg',
        },
        {
          imageUrl:
            'https://image.lguplus.com/static/pc-contents/images/prdv/20220810-050335-443-A0ixpojC.jpg',
        },
        {
          imageUrl:
            'https://image.lguplus.com/static/pc-contents/images/prdv/20220810-050335-443-Jd51xejS.jpg',
        },
      ],
    },
  ],
  storage: '256GB',
  mprice: 41662,
  dprice: 41662,
  asupport: 0,
};
function DeviceDetailPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getDeviceDetailInfo();
  }, []);

  const [deviceDetailInfo, setDeviceDetailInfo] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // 서버와 통신해 디바이스 정보를 가져옴
  const getDeviceDetailInfo = async () => {
    try {
      const req = {
        deviceId: searchParams.get('id'),
        discountType: searchParams.get('discountType') || -1,
        installmentPeriod: searchParams.get('installmentPeriod') || 24,
        plan: -1,
      };
      const res = await getDeviceDetail(req);
      setDeviceDetailInfo({ ...res.data, colors: tempData.colors, tags: tempData.tags });
      setSelectedColor(tempData.colors[0]);
    } catch (e) {
      console.log(e.response);
    }
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
