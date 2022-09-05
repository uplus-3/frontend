import React, { useCallback, useState } from 'react';
import { styled } from '@mui/system';
import DeviceCompareItemSelect from './DeviceCompareItemSelect';
import { MenuItem } from '@mui/material';

/**
 * 담당자 : 김수현
 */
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
  onChangeRT,
  installmentPeriod,
  onChangeIP,
  discountType,
  onChangeDT,
  planId,
  onChangePI,
}) {
  return (
    <DeviceCompareInfoPlanItemBlock>
      <DeviceCompareItemSelect value={registType} onChange={onChangeRT}>
        <MenuItem value={0}>기기변경</MenuItem>
        <MenuItem value={1}>번호이동</MenuItem>
        <MenuItem value={2}>신규가입</MenuItem>
      </DeviceCompareItemSelect>
      <DeviceCompareItemSelect value={installmentPeriod} onChange={onChangeIP}>
        {installmentPeriodMenuList &&
          installmentPeriodMenuList.map((menu) => (
            <MenuItem key={menu.value} value={menu.value}>
              {menu.name}
            </MenuItem>
          ))}
      </DeviceCompareItemSelect>
      <DeviceCompareItemSelect value={discountType} onChange={onChangeDT}>
        {discountTypeMenuList &&
          discountTypeMenuList.map((menu) => (
            <MenuItem key={menu.value} value={menu.value}>
              {menu.name}
            </MenuItem>
          ))}
      </DeviceCompareItemSelect>
      <DeviceCompareItemSelect value={planId} onChange={onChangePI}>
        {planIdMenuList &&
          planIdMenuList.map((menu) => (
            <MenuItem key={menu.id} value={menu.id}>
              {menu.name}
            </MenuItem>
          ))}
      </DeviceCompareItemSelect>
    </DeviceCompareInfoPlanItemBlock>
  );
}

export default DeviceCompareInfoPlanItem;
