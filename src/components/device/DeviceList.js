import React, { useState } from 'react';

import DeviceListHeader from './DeviceListHeader';
import DeviceListItem from './DeviceListItem';

import { styled } from '@mui/system';
import { Box } from '@mui/material';
import Loading from '../common/Loading';
import Error from '../common/Error';

const DeviceListBlock = styled('div')({
  width: '100%',
});

const DeviceListWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
  marginTop: 15,

  '.loading': {
    margin: '0 auto',
  },
});

const ErrorWarpper = styled('div')({
  marginTop: 30,
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
      {error ? (
        <ErrorWarpper>
          <Error message="상품을 불러올 수 없습니다." />
        </ErrorWarpper>
      ) : (
        <DeviceListWrapper>
          {(loading || !devices) && (
            <div className="loading">
              <Loading />
            </div>
          )}
          {!loading &&
            devices &&
            devices.map((data) => (
              <DeviceListItem data={data} showPrice={showPrice} searchParams={searchParams} />
            ))}
        </DeviceListWrapper>
      )}
    </DeviceListBlock>
  );
}

export default DeviceList;
