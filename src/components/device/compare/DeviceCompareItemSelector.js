import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { devicesActions, filteredSimple } from '../../../modules/actions/devicesSlice';
import { getDeviceDetail } from '../../../lib/api/device';
import { FILTER_DATA } from '../DeviceListFileterContents';
import DeviceCompareItemSelect from './DeviceCompareItemSelect';

import { styled } from '@mui/system';
import { MenuItem } from '@mui/material';

const COMPANY = FILTER_DATA.company_type.data.slice(1);

const DeviceCompareItemSelectorBlock = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: `2px dashed ${theme.palette.gray3}`,
  height: '100%',
  width: '100%',
  textAlign: 'center',
}));

function DeviceCompareItemSelector() {
  const dispatch = useDispatch();
  const [company, setCompany] = useState();
  const [device, setDevice] = useState();
  const dSimpleList = useSelector((state) => filteredSimple(state, company));

  useEffect(() => {
    if (!dSimpleList) {
      // 없는 경우에만 호출
      dispatch(devicesActions.getDeviceSimple());
    }
  }, [dispatch, dSimpleList]);

  const handleCSelectValue = (e) => {
    setCompany(e.target.value);
  };
  const handleDSelectValue = (e) => {
    const deviceId = e.target.value;
    getDeviceInfo(deviceId);
  };

  const getDeviceInfo = async (deviceId) => {
    try {
      const res = await getDeviceDetail(deviceId);
      dispatch(devicesActions.updateComparison(res.data));
    } catch (e) {}
  };

  const cRenderValue = (selected) => {
    if (!selected) {
      return <p>제조사</p>;
    }
    const comp = COMPANY.find((c) => c.value === selected);
    return <p>{comp?.name}</p>;
  };

  const dRenderValue = (selected) => {
    if (!selected) {
      return <p>기기명</p>;
    }
    const device = dSimpleList?.find((d) => d.id === selected);
    return <p>{device.name}</p>;
  };

  return (
    <DeviceCompareItemSelectorBlock>
      <DeviceCompareItemSelect
        value={company}
        onChange={handleCSelectValue}
        renderValue={cRenderValue}>
        {COMPANY?.map((c) => (
          <MenuItem key={c.value} value={c.value}>
            {c.name}
          </MenuItem>
        ))}
      </DeviceCompareItemSelect>
      <DeviceCompareItemSelect
        value={device}
        onChange={handleDSelectValue}
        renderValue={dRenderValue}>
        {company &&
          dSimpleList &&
          dSimpleList.map((menu) => <MenuItem value={menu.id}>{menu.name}</MenuItem>)}
      </DeviceCompareItemSelect>
    </DeviceCompareItemSelectorBlock>
  );
}

export default DeviceCompareItemSelector;
