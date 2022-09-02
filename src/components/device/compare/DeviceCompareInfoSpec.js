import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { getDeviceDetail } from '../../../lib/api/device';

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

function DeviceCompareInfoSpec({ device }) {
  const [specInfo, setSpecInfo] = useState(null);

  const getDeviceSepc = useCallback(async (deviceId) => {
    try {
      const res = await getDeviceDetail(deviceId);
      const info = [
        {
          name: '색상',
          value: res.data?.colors.map((color) => color.name)?.join(', '),
        },
        {
          name: '용량',
          value: res.data?.storage,
        },
        {
          name: 'CPU',
          value: res.data?.cpu,
        },
        {
          name: '디스플레이',
          value: res.data?.display,
        },
      ];
      setSpecInfo(info);
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (device) {
      getDeviceSepc(device.id);
    }
  }, [device, getDeviceSepc]);

  return (
    <>
      {device && (
        <DeviceCompareInfoSpecBlock>
          {specInfo &&
            specInfo.map((info) => (
              <dl>
                <dt>{info.name}</dt>
                <dd>{info.value}</dd>
              </dl>
            ))}
        </DeviceCompareInfoSpecBlock>
      )}
    </>
  );
}

export default DeviceCompareInfoSpec;
