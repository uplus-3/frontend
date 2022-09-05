import React from 'react';

import { styled } from '@mui/system';
import { Box } from '@mui/material';
import DeviceSearchListItem from './DeviceSearchListItem';

/**
 * 담당자 : 이일환
 */
const DeviceSearchListBlock = styled('div')({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 20,
});

function DeviceSearchList({ results }) {
  console.log(results);
  return (
    <DeviceSearchListBlock>
      {results.map((result) => (
        <DeviceSearchListItem key={result.id} result={result} />
      ))}
    </DeviceSearchListBlock>
  );
}

export default DeviceSearchList;
