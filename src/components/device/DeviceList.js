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

function DeviceList({
  devices,
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
      <DeviceListWrapper>
        {devices?.map((data) => (
          <DeviceListItem data={data} showPrice={showPrice} searchParams={searchParams} />
        ))}
      </DeviceListWrapper>
    </DeviceListBlock>
  );
}

export default DeviceList;
