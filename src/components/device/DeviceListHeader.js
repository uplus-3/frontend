import React, { useState } from 'react';

import { styled } from '@mui/system';
import {
  FormControlLabel,
  InputAdornment,
  TextField,
  Stack,
  Checkbox,
  Typography,
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Search,
  CheckCircle,
  CheckCircleOutline,
} from '@mui/icons-material';

const DeviceListHeaderBlock = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const StyledDeviceSearchInput = styled(TextField)(({ theme }) => ({
  '&.MuiTextField-root': {
    marginRight: '1rem',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: 50,
    height: 40,
    '&:hover fieldset': {
      borderColor: theme.palette.prime,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.prime,
    },
    '&.Mui-focused .MuiInputAdornment-root': {
      color: theme.palette.prime,
    },
  },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.prime,
  },
}));

// TODO - 정렬 hover시 dropdown 구현
function DeviceListHeader() {
  const [sort, setSort] = useState(true); // 정렬 기준 (true : 내림차순, false : 오름차순)

  // TODO - 성능개선
  const handleChangeSortDirection = () => {
    setSort((prev) => !prev);
  };

  return (
    <DeviceListHeaderBlock>
      <Typography>전체 32건</Typography>
      <Stack direction="row" alignItems="center" spacing={3.5}>
        <StyledDeviceSearchInput
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" spacing={1}>
          <FormControlLabel
            control={<StyledCheckbox icon={<CheckCircleOutline />} checkedIcon={<CheckCircle />} />}
            label="품절 제외"
          />
          <FormControlLabel
            control={<StyledCheckbox icon={<CheckCircleOutline />} checkedIcon={<CheckCircle />} />}
            label="정상가 보기"
          />
        </Stack>
        <Stack direction="row" alignItems="center" onClick={handleChangeSortDirection}>
          <label>출시순</label>
          {sort ? <ExpandMore /> : <ExpandLess />}
        </Stack>
      </Stack>
    </DeviceListHeaderBlock>
  );
}

export default DeviceListHeader;
