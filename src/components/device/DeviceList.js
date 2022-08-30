import React from 'react';

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

function DeviceList({ devices, loading, error }) {
  if (error) {
    return 'error!';
  }

  return (
    <DeviceListBlock>
      <DeviceListHeader />
      <DeviceListWrapper>
        {devices?.map((data) => (
          <DeviceListItem data={data} />
        ))}
      </DeviceListWrapper>
    </DeviceListBlock>
  );
}

export default DeviceList;
