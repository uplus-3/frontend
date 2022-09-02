import React, { useState } from 'react';
import { FILTER_DATA } from './DeviceListFileterContents';
import { PriceFormatter } from '../../lib/utils';

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

const ALL = 'all';

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
  maxHeight: 'calc(100vh - 130px)',
  '&::-webkit-scrollbar': {
    width: '0px',
  },
  '&:hover::-webkit-scrollbar': {
    width: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.gray3,
    borderRadius: 50,
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.gray2,
    borderRadius: 50,
  },
  '& .MuiCollapse-root': {
    paddingRight: 10,
  },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.prime,
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.prime,
}));

function createPlans(arr) {
  let plans = [
    {
      id: -1,
      name: '추천',
    },
  ];

  if (Array.isArray(arr)) plans = [...plans, ...arr.slice(0, 4)];
  return plans;
}

function createSliderValue(value) {
  const { MAX, MIN } = FILTER_DATA.price_range.config;
  if (!value) return [MIN, MAX];
  let min = isNaN(value[0]) ? MIN : parseInt(value[0]);
  let max = isNaN(value[1]) ? MAX : parseInt(value[1]);
  return [min, max];
}

function printPriceRange(value) {
  const val = createSliderValue(value);
  return `${PriceFormatter(val[0])}원 ~ ${PriceFormatter(val[1])}원`;
}

// std : 기준, value : 값
function isChecked(std, value, defaultValue) {
  // 기준점이 없는 경우
  if (!std) return defaultValue === value;
  // 부합하는 경우
  if (std === value.toString()) return true;
  return false;
}

function isCheckedArr(std, value, defaultValue) {
  if (!std || !std.length) return defaultValue === value;
  if (std.includes(value)) return true;
  return false;
}

function DeviceListFilter({ searchParams, plan: plan_datas, loading, error, onChangeFilter }) {
  const [open, setOpen] = useState([true, true, true, false, false]);
  const { plan_type, discount_type, company_type, storage_type, price_range } = FILTER_DATA;

  const handleClickListOpen = (idx) => {
    const newOpen = [...open];
    newOpen[idx] = !newOpen[idx];
    setOpen(newOpen);
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
            {createPlans(plan_datas)?.map((type) => (
              <ListItemButton
                key={type.id}
                dense
                onClick={() => onChangeFilter(plan_type.name, type.id)}>
                <ListItemIcon>
                  <StyledCheckbox
                    checked={isChecked(searchParams.get(plan_type.name), type.id, -1)}
                    //checked={searchParams.get(plan_type.name) === type.id.toString()}
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
            {discount_type.data.map((type) => (
              <ListItemButton
                key={type.value}
                dense
                onClick={() => onChangeFilter(discount_type.name, type.value)}>
                <ListItemIcon>
                  <StyledCheckbox
                    checked={isChecked(searchParams.get(discount_type.name), type.value, -1)}
                    //    checked={sFilter?.discount === type.value}
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<RadioButtonChecked />}
                  />
                </ListItemIcon>
                <ListItemText primary={type.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItem className="list-type-label" onClick={() => handleClickListOpen(2)}>
          <ListItemText primary="가격" />
          {open[2] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Divider />
        <Collapse in={open[2]} timeout="auto" unmountOnExit>
          <List>
            <ListItem>
              <Stack spacing={1} sx={{ width: '100%' }}>
                <Typography className="price-preview">
                  {printPriceRange(searchParams.getAll('price'))}
                </Typography>
                <StyledSlider
                  value={createSliderValue(searchParams.getAll('price'))}
                  getAriaLabel={() => 'Price'}
                  min={price_range.config.MIN}
                  max={price_range.config.MAX}
                  step={price_range.config.STEP}
                  valueLabelDisplay="off"
                  onChange={(e, value) => onChangeFilter(price_range.name, value)}
                />
              </Stack>
            </ListItem>
          </List>
        </Collapse>

        {/* 제조사 */}
        <ListItem className="list-type-label" onClick={() => handleClickListOpen(3)}>
          <ListItemText primary="제조사" />
          {open[3] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Divider />
        <Collapse in={open[3]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {company_type.data.map((type) => (
              <ListItemButton
                key={type.value}
                dense
                onClick={(e) => onChangeFilter(company_type.name, type.value)}>
                <ListItemIcon>
                  <StyledCheckbox
                    checked={isCheckedArr(searchParams.getAll(company_type.name), type.value, ALL)}
                    //   checked={sFilter?.company?.includes(type.value)}
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
            {storage_type.data.map((type) => (
              <ListItemButton
                key={type.value}
                dense
                onClick={(e) => onChangeFilter(storage_type.name, type.value)}>
                <ListItemIcon>
                  <StyledCheckbox
                    checked={isCheckedArr(searchParams.getAll(storage_type.name), type.value, ALL)}
                    //  checked={sFilter?.storage?.includes(type.value)}
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
