import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { devicesActions, filteredDevices } from '../../modules/actions/devicesSlice';

import DeviceList from '../../components/device/DeviceList';
import DeviceListFilter from '../../components/device/DeviceListFilter';
import { FILTER_DATA } from '../../components/device/DeviceListFileterContents';

import { styled } from '@mui/system';
import { Box } from '@mui/system';
import { ExpandLess } from '@mui/icons-material';
import DeviceCompareTab from '../../components/device/compare/DeviceCompareTab';
import ScrollTopBtn from '../../components/common/ScrollTopBtn';
import useInput from '../../lib/hooks/useInput';

const ALL = 'all';

const Title = styled('h2')({
  paddingTop: 30,
  paddingBottom: 10,
});

const DeviceListWrapper = styled(Box)({
  display: 'flex',
  gap: 32,
  paddingBottom: 80,
});

function DeviceListPage({ networkType }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const f_plan = searchParams.get('plan');
  const f_discount = searchParams.get('discount');
  const f_price = searchParams.getAll('price'); // 배열
  const f_company = searchParams.getAll('company');
  const f_storage = searchParams.getAll('storage');
  const f_sortby = searchParams.get('sortby');

  const [sortbyDir, setSortbyDir] = useState(true);
  const [excludeSoldout, setExcludeSoldout] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [search, handleChangeSearch, setSearch] = useInput('');

  const planInfo = useSelector(({ plan, loading, error }) => ({
    plan: plan[`${networkType}g`],
    loading: loading['plan'],
    error: error['plan'],
  }));

  const devicesInfo = useSelector(({ devices: rDevices, loading, error }) => ({
    devices: filteredDevices(
      rDevices.devices,
      rDevices.launchingDevices,
      rDevices.price,
      f_price,
      f_company,
      f_storage,
      f_sortby,
      sortbyDir,
      excludeSoldout,
      search,
    ),
    loading: loading.devices,
    error: error.devices,
  }));

  const comparison = useSelector((state) => state.devices.comparison);
  const launchingDevices = useSelector((state) => state.devices.launchingDevices);

  useEffect(() => {
    // 요금제 정보 불러오기
    // dispatch(planActions.getPlanList(networkType));
    // 네트워크별 단말기 리스트 불러오기
    dispatch(
      devicesActions.getDevice({
        networkType,
      }),
    );
    // 출시 예정 단말기 리스트 불러오기
    dispatch(devicesActions.getLaunchingDevices(networkType));
  }, [dispatch, networkType]);

  useEffect(() => {
    // 요금제 & 할인유형이 바뀐 경우
    // 단말기 별 요금 정보 불러오기
    dispatch(
      devicesActions.getDevicePrice({
        discountType: f_discount,
        networkType,
        planId: f_plan,
      }),
    );
  }, [dispatch, networkType, f_plan, f_discount]);

  // 필터 선택 시 쿼리스트링 변경
  const handleChangeFilter = (type, value) => {
    const { plan_type, discount_type, company_type, storage_type, price_range } = FILTER_DATA;
    let newValue = '';
    if (plan_type.name === type || discount_type.name === type || 'sortby' === type) {
      newValue = value;
      searchParams.set(type, newValue);
      setSearchParams(searchParams, { replace: true });
    } else if (price_range.name === type) {
      setSearchParams(
        {
          plan: f_plan || '',
          discount: f_discount || '',
          company: f_company,
          storage: f_storage,
          sortby: f_sortby || '',
          [type]: [...value],
        },
        { replace: true },
      );
    } else if (company_type.name === type || storage_type.name === type) {
      let prev = [],
        len = 0;
      if (company_type.name === type) {
        prev = f_company;
        len = company_type.data.length;
      }
      if (storage_type.name === type) {
        prev = f_storage;
        len = storage_type.data.length;
      }
      newValue = setArrayFilterValue(prev, value, len);
      setSearchParams(
        {
          plan: f_plan || '',
          discount: f_discount || '',
          price: f_price,
          company: f_company,
          storage: f_storage,
          sortby: f_sortby || '',
          [type]: [...newValue],
        },
        { replace: true },
      );
    }
  };

  const setArrayFilterValue = (arr, value, originLen) => {
    const isChecked = arr.includes(value); // 이미 체크되어있는지 확인
    let prev = [...arr];
    if (isChecked && value !== ALL) {
      // 만약 체크되어있는데, 전체를 선택한 경우라면 변화 없음
      // 지우려는데 마지막 원소였다면 all 추가, 아니라면 삭제
      prev = prev.length > 1 ? prev.filter((p) => p !== value) : [ALL];
    }
    if (!isChecked) {
      // all을 선택한 경우
      if (value === ALL) prev = [ALL];
      else {
        // 모든 원소가 선택될거라면 all 추가, 아니라면 value 추가
        // ALL 삭제
        prev = prev.filter((v) => v !== ALL);
        prev = prev.length + 1 === originLen - 1 ? [ALL] : [...prev, value];
      }
    }
    return prev;
  };

  return (
    <div>
      <Title>{networkType}G 휴대폰</Title>
      <DeviceListWrapper>
        <DeviceListFilter
          searchParams={searchParams}
          plan={planInfo.plan}
          loading={planInfo.loading}
          error={planInfo.error}
          onChangeFilter={handleChangeFilter}
        />
        <DeviceList
          devices={devicesInfo.devices}
          launchingDevices={launchingDevices}
          loading={devicesInfo.loading}
          error={devicesInfo.error}
          count={devicesInfo.devices ? devicesInfo.devices.length : 0}
          searchParams={searchParams}
          onChangeFilter={handleChangeFilter}
          excludeSoldout={excludeSoldout}
          setExcludeSoldout={setExcludeSoldout}
          showPrice={showPrice}
          setShowPrice={setShowPrice}
          sortby={f_sortby}
          sortbyDir={sortbyDir}
          setSortbyDir={setSortbyDir}
          search={search}
          onChangeSearch={handleChangeSearch}
        />
      </DeviceListWrapper>
      {!!comparison?.length && <DeviceCompareTab devices={comparison} />}
      <ScrollTopBtn Icon={<ExpandLess />} />
    </div>
  );
}

export default DeviceListPage;
