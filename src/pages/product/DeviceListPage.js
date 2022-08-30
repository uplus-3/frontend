import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { devicesActions } from '../../modules/actions/devicesSlice';
import { planActions } from '../../modules/actions/planSlice';

import DeviceList from '../../components/device/DeviceList';
import DeviceListFilter from '../../components/device/DeviceListFilter';
import { FILTER_DATA } from '../../components/device/DeviceListFileterContents';

import { styled } from '@mui/system';
import { Box } from '@mui/system';
import { ExpandLess } from '@mui/icons-material';
import DeviceCompareTab from '../../components/device/compare/DeviceCompareTab';
import ScrollTopBtn from '../../components/common/ScrollTopBtn';

const ALL = 'all';

const Title = styled('h2')({
  paddingTop: 30,
  paddingBottom: 10,
});

const DeviceListWrapper = styled(Box)({
  display: 'flex',
  gap: 32,
});

function DeviceListPage({ networkType }) {
  const dispatch = useDispatch();
  const planInfo = useSelector(({ plan, loading }) => ({
    plan: plan[`${networkType}g`],
    loading: loading.plan,
    error: plan.error,
  }));
  const devicesInfo = useSelector(({ devices, loading }) => ({
    devices: devices.devices,
    loading: loading.devices,
    error: devices.error,
  }));

  const current_filter = useSelector((state) => state.devices.filter);
  const [searchParams, setSearchParams] = useSearchParams();
  const f_plan = searchParams.get('plan');
  const f_discount = searchParams.get('discount');
  const f_price = searchParams.get('price');
  const f_company = searchParams.get('company');
  const f_storage = searchParams.get('storage');

  useEffect(() => {
    dispatch(planActions.getPlanList(networkType));
    dispatch(devicesActions.getDevice());
  }, [dispatch, networkType]);

  useEffect(() => {
    // 요금제 & 할인유형이 바뀐 경우
    console.log('요금제 할인유형 변경');
  }, [f_plan, f_discount]);

  useEffect(() => {
    // 요금제 & 할인유형 이외의 필터가 바뀐 경우
    console.log('요금제 할인유형 이외 변경');
  }, [f_price, f_company, f_storage]);

  // TODO - price 재설정
  // TODO - price 재설정
  // TODO - price 재설정
  // TODO - price 재설정
  // TODO - price 재설정
  const handleChangeFilter = (type, value) => {
    const { plan_type, discount_type, company_type, storage_type, price_range } = FILTER_DATA;
    let newValue = '';
    if (plan_type.name === type || discount_type.name === type) {
      newValue = value;
    } else if (price_range.name === type) {
      newValue = value.join('~');
    } else if (company_type.name === type) {
      let prev = f_company.split('^');
      const newArr = setArrayFilterValue(prev, value, company_type.data.length);
      console.log(newArr);
      newValue = newArr.join('^');
    } else if (storage_type.name === type) {
      let prev = f_storage.split('^');
      const newArr = setArrayFilterValue(prev, value, storage_type.data.length);
      newValue = newArr.join('^');
    }
    searchParams.set(type, newValue);
    console.log(type, newValue);
    setSearchParams(searchParams, { replace: true });
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
  // TODO - query string이 유효하지 않은 경우 처리
  // useEffect(() => {
  //   // filter init
  //   const { price_range } = FILTER_DATA;
  //   const { initFilterValue } = devicesActions;
  //   // const { plan, discount, price, company, storage } = searchParams;
  //   const { plan, discount, price, company, storage } = Object.fromEntries([...searchParams]);
  //   const init = {
  //     plan: plan || '-1',
  //     discount: discount || '-1',
  //     company: company ? company.split('^') : ['all'],
  //     storage: storage ? storage.split('^') : ['all'],
  //   };
  //   if (price) {
  //     // PRICE가 있다면 parsing해서 저장
  //     const p_spt = price.split('~');
  //     init.price = [parseInt(p_spt[0]), parseInt(p_spt[1])];
  //   } else {
  //     init.price = [price_range.config.MIN, price_range.config.MAX];
  //   }
  //   dispatch(initFilterValue(init));
  // }, [dispatch]);

  // TODO - 쿼리스트링 최적화
  // useEffect(() => {
  //   const { plan, discount, price, company, storage } = current_filter;
  //   if (plan) searchParams.set('plan', plan);
  //   if (discount) searchParams.set('discount', discount);
  //   if (price) searchParams.set('price', price.join('~'));
  //   if (company) searchParams.set('company', company.join('^'));
  //   if (storage) searchParams.set('storage', storage.join('^'));

  //   setSearchParams(searchParams, { replace: true });
  // }, [current_filter, setSearchParams]);

  return (
    <div>
      <Title>5G 휴대폰</Title>
      <DeviceListWrapper>
        <DeviceListFilter
          plan={planInfo.plan}
          loading={planInfo.loading}
          error={planInfo.error}
          onChangeFilter={handleChangeFilter}
        />
        <DeviceList
          devices={devicesInfo.devices}
          loading={devicesInfo.loading}
          error={devicesInfo.error}
        />
      </DeviceListWrapper>
      <DeviceCompareTab />
      <ScrollTopBtn Icon={<ExpandLess />} />
    </div>
  );
}

export default DeviceListPage;
