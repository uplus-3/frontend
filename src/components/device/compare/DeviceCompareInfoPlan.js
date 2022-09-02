import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/system';
import DeviceCompareItemSelect from './DeviceCompareItemSelect';
import { MenuItem } from '@mui/material';
import DeviceCompareInfoPlanItem from './DeviceCompareInfoPlanItem';
import { useSelector } from 'react-redux';
import { getDevicePrice } from '../../../lib/api/device';

const DeviceCompareInfoPlanBlock = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 20,
  padding: 20,
  background: '#fff',

  '& > div': {
    width: '100%',
  },
});

function DeviceCompareInfoPlan({ device, onChangePriceFilter }) {
  const planIdMenuList = useSelector((state) => state.plan[`${device?.networkType}g`]);
  const [planId, setPlanId] = useState(
    planIdMenuList?.find((menu) => menu.name === device?.planName)?.id,
  );

  useEffect(() => {
    // 단말기 요금 정보 재요청
  }, [planId]);

  const handleChangePI = useCallback((e) => {
    setPlanId(e.target.value);
  }, []);

  const getDevicePriceInfo = async (deviceId, planId) => {
    try {
      const res = await getDevicePrice({
        deviceId,
        planId,
      });
      console.log(res.data);
    } catch (e) {}
  };

  return (
    <>
      {device && (
        <DeviceCompareInfoPlanItem
          planIdMenuList={planIdMenuList}
          planId={planId}
          onChangePI={handleChangePI}
        />
      )}
    </>
  );
}

export default React.memo(DeviceCompareInfoPlan);
