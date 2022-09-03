import React, { useState } from 'react';

import DeviceListHeader from './DeviceListHeader';
import DeviceListItem from './DeviceListItem';

import { styled } from '@mui/system';
import { Box } from '@mui/material';
import LaunchingDeviceListItem from './launching/LaunchingDeviceListItem';
import LaunchingDeviceDetailModal from '../modal/LaunchingDeviceDetailModal';

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
  sortby,
  sortbyDir,
  setSortbyDir,
  search,
  onChangeSearch,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [device, setDevice] = useState(null);

  const handleClickDetail = (data) => {
    setDevice(data);
    setModalOpen(true);
  };

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
      <DeviceListWrapper>
        {loading && 'Loading..'}
        {!loading &&
          devices &&
          devices.map((data, index) => (
            <>
              {!!data?.isLaunching ? (
                <LaunchingDeviceListItem
                  key={`${index}-${data.serialNumber}`}
                  data={data}
                  onClickDetail={handleClickDetail}
                />
              ) : (
                <DeviceListItem
                  key={`${index}-${data.serialNumber}`}
                  data={data}
                  showPrice={showPrice}
                  searchParams={searchParams}
                />
              )}
            </>
          ))}
      </DeviceListWrapper>
      {modalOpen && device && (
        <LaunchingDeviceDetailModal
          open={modalOpen}
          setOpen={setModalOpen}
          imgUrl={device?.repImageUrl}
          data={device}
        />
      )}
    </DeviceListBlock>
  );
}

export default DeviceList;
