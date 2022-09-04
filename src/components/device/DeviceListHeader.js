import React, { useCallback, useEffect, useState } from 'react';
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
import { useSearchParams } from 'react-router-dom';

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

const StyledSortWrapper = styled('div')(({ theme }) => ({
  '& .MuiButtonBase-root.MuiListItem-root:hover': {
    background: 'none',
    color: theme.palette.prime,
    svg: {
      color: theme.palette.prime,
    },
  },
  '& .MuiListItemIcon-root': {
    marginLeft: 5,
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

function DeviceListHeader({
  count,
  searchParams,
  onChangeFilter,
  excludeSoldout,
  setExcludeSoldout,
  showPrice,
  setShowPrice,
  search,
  onChangeSearch,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const sortby = searchParams.get('sortby');
  const [selectedIndex, setSelectedIndex] = useState(
    (sortby && SORT_TYPE.findIndex((type) => type.value === sortby)) || 0,
  );
  const open = Boolean(anchorEl);

  useEffect(() => {
    setSelectedIndex((sortby && SORT_TYPE.findIndex((type) => type.value === sortby)) || 0);
  }, [sortby]);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    const data = SORT_TYPE[index].value;
    setSelectedIndex(index);
    setAnchorEl(null);
    onChangeFilter('sortby', data);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <DeviceListHeaderBlock>
      <div>전체 {count}건</div>
      <Stack direction="row" alignItems="center" spacing={3.5}>
        <StyledDeviceSearchInput
          value={search}
          onChange={onChangeSearch}
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
            control={
              <StyledCheckbox
                icon={<CheckCircleOutline />}
                checkedIcon={<CheckCircle />}
                checked={excludeSoldout}
                onChange={() => setExcludeSoldout((prev) => !prev)}
              />
            }
            label="품절 제외"
          />
          <FormControlLabel
            control={
              <StyledCheckbox
                icon={<CheckCircleOutline />}
                checkedIcon={<CheckCircle />}
                checked={showPrice}
                onChange={() => setShowPrice((prev) => !prev)}
              />
            }
            label="정상가 보기"
          />
        </Stack>
        <StyledSortWrapper>
          <List component="nav" aria-label="Device sort settings">
            <ListItem
              button
              disableRipple
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickListItem}>
              <ListItemText primary={SORT_TYPE[selectedIndex].name} />
              <ListItemIcon>{anchorEl ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
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
        </StyledSortWrapper>
      </Stack>
    </DeviceListHeaderBlock>
  );
}

export default DeviceListHeader;
