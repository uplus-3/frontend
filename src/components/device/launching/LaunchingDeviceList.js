import React from 'react';
import { styled } from '@mui/system';
import LaunchingDeviceListItem from './LaunchingDeviceListItem';

const LaunchingDeviceListBlock = styled('div')({});

const LaunchingDeviceList = ({ launchingDevices }) => {
  return (
    <LaunchingDeviceListBlock>
      {launchingDevices &&
        launchingDevices.map((device) => <LaunchingDeviceListItem data={device} />)}
    </LaunchingDeviceListBlock>
  );
};

export default LaunchingDeviceList;
