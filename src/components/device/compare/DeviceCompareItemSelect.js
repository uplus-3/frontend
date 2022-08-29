import React, { useState } from 'react';
import { FILTER_DATA } from '../DeviceListFileterContents';

import { styled } from '@mui/system';
import { FormControl, MenuItem, Select } from '@mui/material';

const COMPANY = FILTER_DATA.company_type.data.slice(1);

// TODO - select되었을 때, background 지우기
const DeviceCompareItemSelectBlock = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: `2px dashed ${theme.palette.gray3}`,
  height: '100%',

  '& .MuiInputBase-root::after': {
    borderBottom: `2px solid ${theme.palette.prime}`,
  },
}));

const SelectPlaceholder = styled('p')({
  textAlign: 'center',
});

function DeviceCompareItemSelect() {
  const [company, setCompany] = useState('');
  const [device, setDevice] = useState();

  const handleCSelectValue = (e) => {
    setCompany(e.target.value);
  };
  const handleDSelectValue = (e) => {
    setDevice(e.target.value);
  };

  return (
    <DeviceCompareItemSelectBlock>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <Select
          displayEmpty
          value={company}
          onChange={handleCSelectValue}
          renderValue={(selected) => {
            if (!selected) {
              return <SelectPlaceholder>제조사</SelectPlaceholder>;
            }
            const comp = COMPANY.find((c) => c.value === selected);
            return comp?.name;
          }}>
          {COMPANY?.map((c) => (
            <MenuItem key={c.value} value={c.value}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <Select displayEmpty value={device} onChange={handleDSelectValue}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </DeviceCompareItemSelectBlock>
  );
}

export default DeviceCompareItemSelect;
