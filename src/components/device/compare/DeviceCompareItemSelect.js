import React from 'react';
import { FormControl, Select } from '@mui/material';
import styled from '@emotion/styled';

/**
 * 담당자 : 김수현
 */
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: 1,
  minWidth: 250,
  '& .MuiInputBase-root::after': {
    borderBottom: `2px solid ${theme.palette.prime}`,
  },
}));

function DeviceCompareItemSelect({ value, onChange, renderValue, children }) {
  return (
    <StyledFormControl variant="standard">
      <Select displayEmpty value={value} onChange={onChange} renderValue={renderValue}>
        {children}
      </Select>
    </StyledFormControl>
  );
}

export default DeviceCompareItemSelect;
