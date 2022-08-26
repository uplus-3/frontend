import React, { useState } from 'react';
import * as FILTER_DATA from './DeviceListFileterContents';

import { useDispatch, useSelector } from 'react-redux';
import { devicesActions } from '../../modules/actions/devicesSlice';

import { styled } from '@mui/system';
import {
  Checkbox,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from '@mui/icons-material';

const DeviceListFilterBlock = styled('div')(({ theme }) => ({
  minWidth: 240,
  '& .MuiListItemButton-root': {
    padding: '0 5px',
  },
  '& .MuiTypography-root': {
    fontSize: '0.875rem',
  },
  '& .price-preview': {
    textAlign: 'center',
  },
  '& .list-type-label': {
    cursor: 'pointer',
  },
}));

// TODO - sticky 적용시 하단에 공백 생성됨 : maxHeight때문
const StyledListFilter = styled(List)(({ theme }) => ({
  background: theme.palette.gray1,
  position: 'sticky',
  top: '60px',
  overflowX: 'hidden',
  overflowY: 'auto',
  maxHeight: 'calc(100vh - 150px)',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  // '&:hover::-webkit-scrollbar': {
  //   width: '10px',
  // },
  // '&::-webkit-scrollbar-thumb': {
  //   background: theme.palette.gray3,
  //   borderRadius: 50,
  // },
  // '&::-webkit-scrollbar-track': {
  //   background: theme.palette.gray2,
  //   borderRadius: 50,
  // },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.prime,
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.prime,
}));

function valueLabelFormat(value) {
  return `${value?.toLocaleString('ko-KR')}원`;
}

function printPriceRange(value) {
  return `${value[0].toLocaleString('ko-KR')}원 ~ ${value[1].toLocaleString('ko-KR')}원`;
}

function DeviceListFilter({
  paymentType,
  discountType,
  // price,
  multiCheckbox,
  // onChangeCheckbox,
  onChangeSlider,
}) {
  const dispatch = useDispatch();
  const { plan, discount, price, company, storage } = useSelector((state) => state.devices.filter);
  const [open, setOpen] = useState([true, true, true, false, false]);
  const handleClickListOpen = (idx) => {
    const newOpen = [...open];
    newOpen[idx] = !newOpen[idx];
    setOpen(newOpen);
  };

  const onChangeCheckbox = (type, value) => {
    dispatch(devicesActions.setFilterValue({ type, value }));
  };

  return (
    <DeviceListFilterBlock>
      <StyledListFilter component="nav">
        {/* 요금제 */}
        <ListItem className="list-type-label" onClick={() => handleClickListOpen(0)}>
          <ListItemText primary="요금제" />
          {open[0] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Divider />
        <Collapse in={open[0]} timeout="auto" unmountOnExit>
          <List component="div">
            {FILTER_DATA.PLAN_TYPE.map((type) => (
              <ListItemButton
                key={type.value}
                dense
                // onClick={() => onChangeCheckbox('payment', type.value)}
              >
                <ListItemIcon>
                  <StyledCheckbox
                    checked={plan === type.value}
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<RadioButtonChecked />}
                  />
                </ListItemIcon>
                <ListItemText primary={type.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {/* 할인유형 */}
        <ListItem className="list-type-label" onClick={() => handleClickListOpen(1)}>
          <ListItemText primary="할인유형" />
          {open[1] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Divider />
        <Collapse in={open[1]} timeout="auto" unmountOnExit>
          <List component="div">
            {FILTER_DATA.DISCOUNT_TYPE.map((type) => (
              <ListItemButton
                key={type.value}
                dense
                onClick={() => onChangeCheckbox('discount', type.value)}>
                <ListItemIcon>
                  <StyledCheckbox
                    checked={discount === type.value}
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<RadioButtonChecked />}
                  />
                </ListItemIcon>
                <ListItemText primary={type.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        {/* <ListItem className="list-type-label" onClick={() => handleClickListOpen(2)}>
          <ListItemText primary="가격" />
          {open[2] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Divider />
        <Collapse in={open[2]} timeout="auto" unmountOnExit>
          <List>
            <ListItem>
              <Stack spacing={1} sx={{ width: '100%' }}>
                <Typography className="price-preview">{printPriceRange(price)}</Typography>
                <StyledSlider
                  value={price}
                  getAriaLabel={() => 'Price'}
                  min={FILTER_DATA.PRICE_CONFIG.MIN}
                  max={FILTER_DATA.PRICE_CONFIG.MAX}
                  step={FILTER_DATA.PRICE_CONFIG.STEP}
                  defaultValue={[FILTER_DATA.PRICE_CONFIG.MIN, FILTER_DATA.PRICE_CONFIG.MAX]}
                  valueLabelDisplay="off"
                  onChange={onChangeSlider}
                  valueLabelFormat={valueLabelFormat}
                />
              </Stack>
            </ListItem>
          </List>
        </Collapse> */}

        {/* 제조사 */}
        <ListItem className="list-type-label" onClick={() => handleClickListOpen(3)}>
          <ListItemText primary="제조사" />
          {open[3] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Divider />
        <Collapse in={open[3]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {FILTER_DATA.COMPANY.map((type) => (
              <ListItemButton
                key={type.value}
                dense
                onClick={(e) => onChangeCheckbox('company', type.value)}>
                <ListItemIcon>
                  <StyledCheckbox
                    checked={multiCheckbox.company.has(type.value)}
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<RadioButtonChecked />}
                  />
                </ListItemIcon>
                <ListItemText primary={type.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {/* 저장공간 */}
        <ListItem className="list-type-label" onClick={() => handleClickListOpen(4)}>
          <ListItemText primary="저장공간" />
          {open[4] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Divider />
        <Collapse in={open[4]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {FILTER_DATA.STORAGE.map((type) => (
              <ListItemButton
                key={type.value}
                dense
                onClick={(e) => onChangeCheckbox('storage', type.value)}>
                <ListItemIcon>
                  <StyledCheckbox
                    checked={multiCheckbox.storage.has(type.value)}
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<RadioButtonChecked />}
                  />
                </ListItemIcon>
                <ListItemText primary={type.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </StyledListFilter>
    </DeviceListFilterBlock>
  );
}

export default DeviceListFilter;
