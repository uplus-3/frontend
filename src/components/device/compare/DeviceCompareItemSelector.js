import React, { useState } from 'react';
import { FILTER_DATA } from '../DeviceListFileterContents';
import DeviceCompareItemSelect from './DeviceCompareItemSelect';

import { styled } from '@mui/system';
import { MenuItem } from '@mui/material';

const COMPANY = FILTER_DATA.company_type.data.slice(1);

// TODO - select되었을 때, background 지우기
const DeviceCompareItemSelectorBlock = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: `2px dashed ${theme.palette.gray3}`,
  height: '100%',
}));

const SelectPlaceholder = styled('p')({
  textAlign: 'center',
});

function DeviceCompareItemSelector() {
  const [company, setCompany] = useState('');
  const [device, setDevice] = useState();

  const handleCSelectValue = (e) => {
    setCompany(e.target.value);
  };
  const handleDSelectValue = (e) => {
    setDevice(e.target.value);
  };

  const cRenderValue = (selected) => {
    if (!selected) {
      return <SelectPlaceholder>제조사</SelectPlaceholder>;
    }
    const comp = COMPANY.find((c) => c.value === selected);
    return <SelectPlaceholder>{comp?.name}</SelectPlaceholder>;
  };

  return (
    <DeviceCompareItemSelectorBlock>
      <DeviceCompareItemSelect
        value={company}
        onChange={handleCSelectValue}
        renderValue={cRenderValue}>
        {COMPANY?.map((c) => (
          <MenuItem key={c.value} value={c.value}>
            {c.name}
          </MenuItem>
        ))}
      </DeviceCompareItemSelect>
      <DeviceCompareItemSelect value={device} onChange={handleDSelectValue}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </DeviceCompareItemSelect>
    </DeviceCompareItemSelectorBlock>
  );
}

export default DeviceCompareItemSelector;
