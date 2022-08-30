import React from 'react';
import { FormControl, Select } from '@mui/material';
import styled from '@emotion/styled';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiInputBase-root::after': {
    borderBottom: `2px solid ${theme.palette.prime}`,
  },
}));

function DeviceCompareItemSelect({ value, onChange, renderValue, children }) {
  return (
    <StyledFormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
      <Select displayEmpty value={value} onChange={onChange} renderValue={renderValue}>
        {children}
      </Select>
    </StyledFormControl>
  );
}

export default DeviceCompareItemSelect;
