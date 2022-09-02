import React from 'react';

import DeviceListHeader from './DeviceListHeader';
import DeviceListItem from './DeviceListItem';

import { styled } from '@mui/system';
import { Box } from '@mui/material';
import LaunchingDeviceList from './launching/LaunchingDeviceList';
import LaunchingDeviceListItem from './launching/LaunchingDeviceListItem';

const DeviceListBlock = styled('div')({
  width: '100%',
});

const DeviceListWrapper = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
  marginTop: 15,
});

const LaunchingDeviceListWrapper = styled(Box)({});

function DeviceList({
  devices,
  launchingDevices,
  loading,
  error,
  count,
  searchParams,
  onChangeFilter,
  excludeSoldout,
  setExcludeSoldout,
  showPrice,
  setShowPrice,
  sortbyDir,
  setSortbyDir,
  search,
  onChangeSearch,
}) {
  if (error) {
    return 'error!';
  }

  return (
    <DeviceListBlock>
      <DeviceListHeader
        count={count}
        searchParams={searchParams}
        onChangeFilter={onChangeFilter}
        excludeSoldout={excludeSoldout}
        setExcludeSoldout={setExcludeSoldout}
        showPrice={showPrice}
        setShowPrice={setShowPrice}
        sortbyDir={sortbyDir}
        setSortbyDir={setSortbyDir}
        search={search}
        onChangeSearch={onChangeSearch}
      />
      {/* <LaunchingDeviceListWrapper>
       
      </LaunchingDeviceListWrapper> */}
      <DeviceListWrapper>
        {loading && 'Loading..'}
        {/* <LaunchingDeviceList launchingDevices={launchingDevices} /> */}
        {/* {launchingDevices &&
          launchingDevices.map((data) => (
            <LaunchingDeviceListItem data={data} searchParams={searchParams} />
          ))} */}
        {!loading &&
          devices &&
          devices.map((data) => (
            <>
              {launchingDevices &&
              !!launchingDevices.find((d) => d.serialNumber === data.serialNumber) ? (
                <LaunchingDeviceListItem data={data} searchParams={searchParams} />
              ) : (
                <DeviceListItem data={data} showPrice={showPrice} searchParams={searchParams} />
              )}
            </>
          ))}
      </DeviceListWrapper>
    </DeviceListBlock>
  );
}

export default DeviceList;
