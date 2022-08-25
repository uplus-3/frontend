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
  const datas = Array.from({ length: 32 });
  console.log(datas);
  return (
    <DeviceListBlock>
      <DeviceListHeader />
      <DeviceListWrapper>
        {datas.map((data) => (
          <DeviceListItem />
        ))}
      </DeviceListWrapper>
    </DeviceListBlock>
  );
}

export default DeviceList;
