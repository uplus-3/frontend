import React from 'react';
import { styled } from '@mui/system';
import DeviceListHeader from './DeviceListHeader';
import DeviceListItem from './DeviceListItem';
import { Box } from '@mui/material';

const DeviceListBlock = styled('div')({
  width: '100%',
});

const DeviceListWrapper = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
  marginTop: 15,
});

function DeviceList() {
  return (
    <DeviceListBlock>
      <DeviceListHeader />
      <DeviceListWrapper>
        <DeviceListItem />
        <DeviceListItem />
        <DeviceListItem />
        <DeviceListItem />
        <DeviceListItem />
        <DeviceListItem />
        <DeviceListItem />
        <DeviceListItem />
      </DeviceListWrapper>
    </DeviceListBlock>
  );
}

export default DeviceList;
