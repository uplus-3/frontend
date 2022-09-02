import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material';
import { getDeviceDetail, getDevicePrice } from '../../lib/api/device';
import axios from 'axios';
import DeviceItemImage from '../../components/device/DeviceItemImage';
import DeviceItemInfo from '../../components/device/DeviceItemInfo';
import { useLocation, useSearchParams } from 'react-router-dom';

const DeviceDetailPageWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

function DeviceDetailPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [deviceDetailInfo, setDeviceDetailInfo] = useState(null);
  const [devicePriceInfo, setDevicePriceInfo] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // 서버와 통신해 디바이스 정보를 가져옴
  const getDeviceDetailInfo = async () => {
    try {
      const res = await getDeviceDetail(searchParams.get('id'));
      setDeviceDetailInfo({ ...res.data });
      setSelectedColor(res.data?.colors[0]);
    } catch (e) {
      console.log(e.response);
    }
  };

  // 디바이스 가격정보를 가져옴
  const getDevicePriceInfo = async () => {
    try {
      const req = {
        deviceId: searchParams.get('id'),
        discountType: searchParams.get('discountType') || -1,
        installmentPeriod: searchParams.get('installmentPeriod') || 24,
        planId: searchParams.get('plan') || -1,
      };
      const res = await getDevicePrice(req);
      setDevicePriceInfo(res.data);
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    getDeviceDetailInfo();
    getDevicePriceInfo();
  }, [location.key]);

  return (
    <div>
      {deviceDetailInfo && (
        <DeviceDetailPageWrapper>
          <DeviceItemImage colors={deviceDetailInfo.colors} selectedColor={selectedColor} />
          <DeviceItemInfo
            devicePriceInfo={devicePriceInfo}
            deviceInfo={deviceDetailInfo}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </DeviceDetailPageWrapper>
      )}
    </div>
  );
}

export default DeviceDetailPage;
