import React from 'react';
import { styled } from '@mui/system';

const DeviceCompareInfoSpecBlock = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  padding: 20,
  background: '#fff',

  '& dt': {
    fontWeight: 'bold',
  },
});

function DeviceCompareInfoSpec() {
  return (
    <DeviceCompareInfoSpecBlock>
      <dl>
        <dt>색상</dt>
        <dd>보라 퍼플, 핑크 골드, 블루, 그라파이트</dd>
      </dl>
      <dl>
        <dt>용량</dt>
        <dd>RAM 12GB, ROM 256GB</dd>
      </dl>
    </DeviceCompareInfoSpecBlock>
  );
}

export default DeviceCompareInfoSpec;
