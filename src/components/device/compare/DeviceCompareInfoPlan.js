import React, { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/system';
import DeviceCompareItemSelect from './DeviceCompareItemSelect';
import { MenuItem } from '@mui/material';
import DeviceCompareInfoPlanItem from './DeviceCompareInfoPlanItem';
import { useSelector } from 'react-redux';
import { getDevicePrice } from '../../../lib/api/device';
import { COMPARE_LIST } from './DeviceCompareInfoContent';

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
  const rendered = useRef(false);
  const planIdMenuList = useSelector((state) => state.plan[`${device?.networkType}g`]);
  const [planId, setPlanId] = useState(
    planIdMenuList?.find((menu) => menu.name === device?.planName)?.id,
  );
  const [discountType, setDiscountType] = useState(device?.discountType);
  const [installmentPeriod, setInstallmentPeriod] = useState(24);
  const [registType, setRegistType] = useState(0);

  useEffect(() => {
    // 단말기 요금 정보 재요청
    const prev = rendered.current;
    rendered.current = true;
    console.log(prev, rendered.current);
    // if (!prev || !device) return;
    if (!device?.id) return;
    console.log('hi');
    onChangePriceFilter(device.id, planId, discountType, installmentPeriod);
  }, [planId, discountType, installmentPeriod, device?.id, onChangePriceFilter]);

  const handleChangePI = useCallback((e) => {
    setPlanId(e.target.value);
  }, []);

  const handleChangeDT = useCallback((e) => {
    setDiscountType(e.target.value);
  }, []);

  const handleChangeRT = useCallback((e) => {
    setRegistType(e.target.value);
  }, []);

  const handleChangeIP = useCallback((e) => {
    setInstallmentPeriod(e.target.value);
  }, []);

  return (
    <>
      {device && (
        <DeviceCompareInfoPlanItem
          installmentPeriodMenuList={COMPARE_LIST.installmentPeriod}
          discountTypeMenuList={COMPARE_LIST.discount}
          planIdMenuList={planIdMenuList}
          planId={planId}
          onChangePI={handleChangePI}
          discountType={discountType}
          onChangeDT={handleChangeDT}
          registType={registType}
          onChangeRT={handleChangeRT}
          installmentPeriod={installmentPeriod}
          onChangeIP={handleChangeIP}
        />
      )}
    </>
  );
}

export default React.memo(DeviceCompareInfoPlan);
