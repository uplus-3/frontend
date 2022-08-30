import React from 'react';
import { styled } from '@mui/system';
import DeviceCompareItemSelect from './DeviceCompareItemSelect';

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

function DeviceCompareInfoPlan() {
  return (
    <DeviceCompareInfoPlanBlock>
      <DeviceCompareItemSelect></DeviceCompareItemSelect>
      <DeviceCompareItemSelect></DeviceCompareItemSelect>
      <DeviceCompareItemSelect></DeviceCompareItemSelect>
      <DeviceCompareItemSelect></DeviceCompareItemSelect>
    </DeviceCompareInfoPlanBlock>
  );
}

export default DeviceCompareInfoPlan;
