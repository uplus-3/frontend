import React, { useState } from 'react';
import * as FilterData from './DeviceListFileterContents';

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
  position: 'sticky',
  top: 0,
  minWidth: 240,
  height: 340,
  background: theme.palette.gray1,
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

// TODO - 필터 메뉴 최소/최대 하나만 선택되도록 구현
// TODO - 필터 라벨 눌러도 체크되도록 설정
function DeviceListFilter({ paymentType, discountType, price, multiCheckbox, onChangeCheckbox }) {
  const [open, setOpen] = useState([true, true, true, false, false]);

  const handleClickListOpen = (idx) => {
    const newOpen = [...open];
    newOpen[idx] = !newOpen[idx];
    setOpen(newOpen);
  };

  return (
    <DeviceListFilterBlock>
      <List component="nav">
        {/* 요금제 */}
        <ListItem className="list-type-label" onClick={() => handleClickListOpen(0)}>
          <ListItemText primary="요금제" />
          {open[0] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Divider />
        <Collapse in={open[0]} timeout="auto" unmountOnExit>
          <List component="div">
            {FilterData.PaymentType.map((type) => (
              <ListItemButton dense>
                <ListItemIcon>
                  <StyledCheckbox
                    checked={paymentType === type.value}
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<RadioButtonChecked />}
                    onChange={() => onChangeCheckbox('payment', type.value)}
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
            {FilterData.DiscountType.map((type) => (
              <ListItemButton dense>
                <ListItemIcon>
                  <StyledCheckbox
                    checked={discountType === type.value}
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<RadioButtonChecked />}
                    onChange={() => onChangeCheckbox('discount', type.value)}
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
                <Typography className="price-preview">{printPriceRange(price)}</Typography>
                <StyledSlider
                  value={price}
                  getAriaLabel={() => 'Price'}
                  min={0}
                  max={200000}
                  step={1000}
                  defaultValue={[20, 37]}
                  valueLabelDisplay="off"
                  // onChange={handleChangePriceRange}
                  valueLabelFormat={valueLabelFormat}
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
            {FilterData.Company.map((type) => (
              <ListItemButton dense>
                <ListItemIcon>
                  <StyledCheckbox
                    checked={multiCheckbox.company.has(type.value)}
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<RadioButtonChecked />}
                    onChange={(e) => onChangeCheckbox('company', type.value, e.target.checked)}
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
            {FilterData.Storage.map((type) => (
              <ListItemButton dense>
                <ListItemIcon>
                  <StyledCheckbox
                    checked={multiCheckbox.storage.has(type.value)}
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<RadioButtonChecked />}
                    onChange={(e) => onChangeCheckbox('storage', type.value, e.target.checked)}
                  />
                </ListItemIcon>
                <ListItemText primary={type.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </DeviceListFilterBlock>
  );
}

export default DeviceListFilter;
