import React from 'react';
import { styled } from '@mui/system';
import { Dialog } from '@mui/material';
import { Close } from '@mui/icons-material';
import DeviceCompareItem from '../device/compare/DeviceCompareItem';
import DeviceCompareItemSelect from '../device/compare/DeviceCompareItemSelect';
import DeviceCompareInfo from '../device/compare/DeviceCompareInfo';

const DeviceCompareModalBlock = styled(Dialog)({
  '& .MuiDialog-container .MuiPaper-root': {
    width: '100%',
    maxWidth: 1280,
    borderRadius: 10,
  },
});

const HeaderWapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '15px 20px',
  background: theme.palette.gray2,
}));

const HeaderTitle = styled('span')({
  fontSize: 20,
});

const HeaderCloseIcon = styled('span')({
  '& svg': {
    fontSize: 30,
    verticalAlign: 'middle',
  },
});

const BodyWapper = styled('div')({
  height: 500,
});

const DeviceListWrapper = styled('ul')({
  display: 'flex',
  gap: 10,
  width: '100%',
  height: 200,
  padding: 20,
  '& li': {
    width: '100%',
  },
});

function DeviceCompareModal({ open, setOpen }) {
  return (
    <DeviceCompareModalBlock open={open} onClose={() => setOpen(false)} z>
      <HeaderWapper>
        <HeaderTitle>비교결과</HeaderTitle>
        <HeaderCloseIcon>
          <Close />
        </HeaderCloseIcon>
      </HeaderWapper>
      <BodyWapper>
        <DeviceListWrapper>
          <li>
            <DeviceCompareItem data={true} />
          </li>
          <li>
            <DeviceCompareItem data={true} />
          </li>
          <li>
            <DeviceCompareItemSelect />
          </li>
        </DeviceListWrapper>
        <DeviceCompareInfo title="월 납부금액"></DeviceCompareInfo>
      </BodyWapper>
    </DeviceCompareModalBlock>
  );
}

export default DeviceCompareModal;
