import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DeviceListHeader from './DeviceListHeader';
import DeviceListItem from './DeviceListItem';

import { styled } from '@mui/system';
import { Box } from '@mui/material';

import { devicesActions } from '../../modules/actions/devicesSlice';

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
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.devices);

  useEffect(() => {
    dispatch(devicesActions.getDevice());
  }, [dispatch]);

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
