import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material';
import { getDeviceDetail, getDevicePrice } from '../../lib/api/device';
import DeviceItemImage from '../../components/device/DeviceItemImage';
import DeviceItemInfo from '../../components/device/DeviceItemInfo';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getPlanInfo } from '../../modules/actions/planSlice';
import { useSelector, useDispatch } from 'react-redux';

import { loadingActions } from '../../modules/actions/loadingSlice';
import { errorActions } from '../../modules/actions/errorSlice';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';

/**
 * 담당자 : 성아영
 */
const DeviceDetailPageWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});
const ErrorWrapper = styled('div')({
  marginTop: 30,
});

function DeviceDetailPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector(({ loading }) => loading?.deviceDetail);
  const isError = useSelector(({ error }) => error?.deviceDetail);

  const [deviceDetailInfo, setDeviceDetailInfo] = useState(null);
  const [devicePriceInfo, setDevicePriceInfo] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const planInfo = useSelector(({ plan }) => {
    return getPlanInfo(
      plan,
      searchParams.get('plan') === '-1' || !!!searchParams.get('plan')
        ? deviceDetailInfo?.recommendedPlanId || 1
        : parseInt(searchParams.get('plan')),
    );
  });

  // 서버와 통신해 디바이스 정보를 가져옴
  const getDeviceDetailInfo = async () => {
    const { startLoading, finishLoading } = loadingActions;
    const { initError, setError } = errorActions;
    dispatch(startLoading('deviceDetail'));
    dispatch(initError('deviceDetail'));
    try {
      const res = await getDeviceDetail(searchParams.get('id'));
      setDeviceDetailInfo({ ...res.data });
      setSelectedColor(res.data?.colors[0]);
    } catch (e) {
      dispatch(setError('deviceDetail'));
    } finally {
      dispatch(finishLoading('deviceDetail'));
    }
  };

  // 디바이스 가격정보를 가져옴
  const getDevicePriceInfo = async () => {
    const { startLoading, finishLoading } = loadingActions;
    const { initError, setError } = errorActions;
    dispatch(startLoading('deviceDetail'));
    dispatch(initError('deviceDetail'));
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
      dispatch(setError('deviceDetail'));
    } finally {
      dispatch(finishLoading('deviceDetail'));
    }
  };

  useEffect(() => {
    getDeviceDetailInfo();
    getDevicePriceInfo();
  }, [location.key]);

  return (
    <div>
      {isError ? (
        <ErrorWrapper>
          <Error message="상품을 불러올 수 없습니다." />
        </ErrorWrapper>
      ) : (
        <>
          {isLoading ? (
            <div className="loading">
              <Loading />
            </div>
          ) : (
            <>
              {deviceDetailInfo && (
                <DeviceDetailPageWrapper>
                  <Helmet>
                    <title> 유플러스 {deviceDetailInfo.name} | 엘지유플 최강 3조</title>
                  </Helmet>
                  <DeviceItemImage colors={deviceDetailInfo.colors} selectedColor={selectedColor} />
                  <DeviceItemInfo
                    devicePriceInfo={devicePriceInfo}
                    deviceInfo={{ ...deviceDetailInfo, plan: planInfo }}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                  />
                </DeviceDetailPageWrapper>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default DeviceDetailPage;
