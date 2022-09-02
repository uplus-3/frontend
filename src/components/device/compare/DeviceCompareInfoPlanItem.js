import React, { useCallback, useState } from 'react';
import { styled } from '@mui/system';
import DeviceCompareItemSelect from './DeviceCompareItemSelect';
import { MenuItem } from '@mui/material';

const DeviceCompareInfoPlanItemBlock = styled('div')({
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

function DeviceCompareInfoPlanItem({
  installmentPeriodMenuList,
  discountTypeMenuList,
  planIdMenuList,
  registType,
  onChangeR,
  installmentPeriod,
  onChangeIP,
  discountType,
  onChangeDT,
  planId,
  onChangePI,
}) {
  return (
    <DeviceCompareInfoPlanItemBlock>
      <DeviceCompareItemSelect value={registType} onChange={onChangeR}>
        <MenuItem value="기기변경">기기변경</MenuItem>
        <MenuItem value="번호이동">번호이동</MenuItem>
        <MenuItem value="신규가입">신규가입</MenuItem>
      </DeviceCompareItemSelect>
      <DeviceCompareItemSelect value={installmentPeriod} onChange={onChangeIP}>
        {installmentPeriodMenuList &&
          installmentPeriodMenuList.map((menu) => <MenuItem value={menu.value}>일시불</MenuItem>)}
        {/* <MenuItem value={12}>12개월</MenuItem>
        <MenuItem value={24}>24개월</MenuItem>
        <MenuItem value={36}>36개월</MenuItem> */}
      </DeviceCompareItemSelect>
      <DeviceCompareItemSelect value={discountType} onChange={onChangeDT}>
        {discountTypeMenuList &&
          discountTypeMenuList.map((menu) => <MenuItem value={menu.value}>24개월</MenuItem>)}
      </DeviceCompareItemSelect>
      <DeviceCompareItemSelect value={planId} onChange={onChangePI}>
        {planIdMenuList &&
          planIdMenuList.map((menu) => <MenuItem value={menu.id}>{menu.name}</MenuItem>)}
      </DeviceCompareItemSelect>
    </DeviceCompareInfoPlanItemBlock>
  );
}

export default DeviceCompareInfoPlanItem;
