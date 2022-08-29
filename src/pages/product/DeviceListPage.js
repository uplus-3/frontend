import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { devicesActions } from '../../modules/actions/devicesSlice';

import DeviceList from '../../components/device/DeviceList';
import DeviceListFilter from '../../components/device/DeviceListFilter';
import { FILTER_DATA } from '../../components/device/DeviceListFileterContents';

import { styled } from '@mui/system';
import { Box } from '@mui/system';
import DeviceCompareTab from '../../components/device/compare/DeviceCompareTab';

const Title = styled('h2')({
  paddingTop: 30,
  paddingBottom: 10,
});

const DeviceListWrapper = styled(Box)({
  display: 'flex',
  gap: 32,
});

function DeviceListPage() {
  const dispatch = useDispatch();
  const current_filter = useSelector((state) => state.devices.filter);
  const [searchParams, setSearchParams] = useSearchParams();

  // TODO - query string이 유효하지 않은 경우 처리
  useEffect(() => {
    // filter init
    const { price_range } = FILTER_DATA;
    const { initFilterValue } = devicesActions;
    // const { plan, discount, price, company, storage } = searchParams;
    const { plan, discount, price, company, storage } = Object.fromEntries([...searchParams]);
    const init = {
      plan: plan || '-1',
      discount: discount || '-1',
      company: company ? company.split('^') : ['all'],
      storage: storage ? storage.split('^') : ['all'],
    };
    if (price) {
      // PRICE가 있다면 parsing해서 저장
      const p_spt = price.split('~');
      init.price = [parseInt(p_spt[0]), parseInt(p_spt[1])];
    } else {
      init.price = [price_range.config.MIN, price_range.config.MAX];
    }
    dispatch(initFilterValue(init));
  }, [dispatch]);

  useEffect(() => {
    const { plan, discount, price, company, storage } = current_filter;
    if (plan) searchParams.set('plan', plan);
    if (discount) searchParams.set('discount', discount);
    if (price) searchParams.set('price', price.join('~'));
    if (company) searchParams.set('company', company.join('^'));
    if (storage) searchParams.set('storage', storage.join('^'));

    setSearchParams(searchParams, { replace: true });
  }, [current_filter, setSearchParams]);

  return (
    <div>
      <Title>5G 휴대폰</Title>
      <DeviceListWrapper>
        <DeviceListFilter />
        <DeviceList />
      </DeviceListWrapper>
      <DeviceCompareTab />
    </div>
  );
}

export default DeviceListPage;
