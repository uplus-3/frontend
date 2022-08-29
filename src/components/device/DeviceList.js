import React from 'react';
import { useSelector } from 'react-redux';

import DeviceListHeader from './DeviceListHeader';
import DeviceListItem from './DeviceListItem';

import { styled } from '@mui/system';
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
  const devices = useSelector((state) => state.devices.devices);
  const datas = Array.from({ length: 32 }).fill(devices[0]);

  return (
    <DeviceListBlock>
      <DeviceListHeader />
      <DeviceListWrapper>
        {datas.map((data) => (
          <DeviceListItem data={data} />
        ))}
      </DeviceListWrapper>
    </DeviceListBlock>
  );
}

export default DeviceList;
