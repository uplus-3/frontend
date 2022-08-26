import React, { useState } from 'react';
import { SORT_TYPE } from './DeviceListFileterContents';

import { styled } from '@mui/system';
import {
  FormControlLabel,
  InputAdornment,
  TextField,
  Stack,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  ListItemIcon,
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
  '& .MuiListItemIcon-root': {
    minWidth: 0,
  },
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

const StyledSortWapper = styled('div')(({ theme }) => ({
  '& .MuiButtonBase-root.MuiListItem-root:hover': {
    background: 'none',
    color: theme.palette.prime,
  },
  '& .MuiListItemIcon-root': {
    marginLeft: 5,
  },
  '& .MuiListItemIcon-root:hover': {
    background: theme.palette.gray2,
    borderRadius: '100%',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&.Mui-selected': {
    background: 'rgba(230, 0, 126, 0.08)',
    color: theme.palette.prime,
  },
  '&.Mui-selected:hover': {
    background: 'rgba(230, 0, 126, 0.08)',
  },
}));

// TODO - 정렬 hover시 dropdown 구현
function DeviceListHeader() {
  const [sort, setSort] = useState(true); // 정렬 기준 (true : 내림차순, false : 오름차순)
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    setSort(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // TODO - 성능개선
  const handleChangeSortDirection = () => {
    setSort((prev) => !prev);
  };

  return (
    <DeviceListHeaderBlock>
      <div>전체 32건</div>
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
        <StyledSortWapper>
          <List component="nav" aria-label="Device sort settings">
            <ListItem
              button
              disableRipple
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-expanded={open ? 'true' : undefined}>
              <ListItemText primary={SORT_TYPE[selectedIndex].name} onClick={handleClickListItem} />
              <ListItemIcon onClick={handleChangeSortDirection}>
                {sort ? <ExpandMore /> : <ExpandLess />}
              </ListItemIcon>
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'lock-button',
              role: 'listbox',
            }}>
            {SORT_TYPE.map((option, index) => (
              <StyledMenuItem
                key={option.value}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}>
                {option.name}
              </StyledMenuItem>
            ))}
          </Menu>
        </StyledSortWapper>
        {/* <Stack direction="row" alignItems="center" onClick={handleChangeSortDirection}>
          <label>출시순</label>
          {sort ? <ExpandMore /> : <ExpandLess />}
        </Stack> */}
      </Stack>
    </DeviceListHeaderBlock>
  );
}

export default DeviceListHeader;
