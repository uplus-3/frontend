import React, { useCallback, useEffect, useState } from 'react';
import DeviceCompareInfoPlanItem from './DeviceCompareInfoPlanItem';
import { useSelector } from 'react-redux';
import { COMPARE_LIST } from './DeviceCompareInfoContent';

/**
 * 담당자 : 김수현
 */
function DeviceCompareInfoPlan({ device, onChangePriceFilter }) {
  const planIdMenuList = useSelector((state) => state.plan[`${device?.networkType}g`]);
  const [planId, setPlanId] = useState(
    planIdMenuList?.find((menu) => menu.name === device?.planName)?.id || device?.recommendedPlanId,
  );
  const [discountType, setDiscountType] = useState(device?.discountType || 0);
  const [installmentPeriod, setInstallmentPeriod] = useState(24);
  const [registType, setRegistType] = useState(0);

  useEffect(() => {
    // 단말기 요금 정보 재요청
    if (!device?.id) return;
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
