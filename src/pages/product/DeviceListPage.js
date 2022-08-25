import React, { useState } from 'react';

import DeviceList from '../../components/device/DeviceList';
import DeviceListFilter from '../../components/device/DeviceListFilter';
import { PRICE_CONFIG } from '../../components/device/DeviceListFileterContents';

import { styled } from '@mui/system';
import { Box } from '@mui/system';

const Title = styled('h2')({
  paddingTop: 30,
  paddingBottom: 10,
});

const DeviceListWrapper = styled(Box)({
  display: 'flex',
  gap: 32,
});

function DeviceListPage() {
  /* DeviceListHeader */
  // const [sort, setSort] = useState(true); // 정렬 기준 (true : 내림차순, false : 오름차순)
  // const [hasSoldout, setHasSoldout] = useState(false); // 품절 제외 여부 (true : 품절 제외, false : 품절 포함)
  // const [showOriginPrice, setShowOriginPrice] = useState(false); // 정상가 보기 여부 (true : 정상가 보기, false : 정상가 숨기기)

  /* DeviceListFilter */
  const [paymentType, setPaymentType] = useState('recommend'); // default : 가장 알맞은 요금제, 한개만 선택 가능
  const [discountType, setDiscountType] = useState('recommend'); // default : 추천, 한개만 선택 가능
  const [price, setPrice] = useState([PRICE_CONFIG.MIN, PRICE_CONFIG.MAX]);
  const [multiCheckbox, setMultiCheckbox] = useState({
    company: new Set(['all']),
    storage: new Set(['all']),
  });

  // 체크박스 선택시 값이 변경되는 함수
  const handleChangeCheckbox = (type, value) => {
    if (type === 'payment') {
      setPaymentType(value);
    } else if (type === 'discount') {
      setDiscountType(value);
    } else if (type === 'company' || type === 'storage') {
      // 전체를 선택했는데, 두번 클릭(해지)한 경우 : 변화 없음
      const newTemp = new Set([...multiCheckbox[type]]);
      const isChecked = !newTemp.has(value); // 이미 선택이 되어있는지 확인
      if (value === 'all' && isChecked) {
        newTemp.clear();
        newTemp.add(value);
      }
      // 전체 외 선택 시
      if (value !== 'all') {
        if (isChecked) {
          // 선택했을 경우 all을 지우고 add
          newTemp.delete('all');
          newTemp.add(value);
          // 결국 전체를 선택한거라면 모두 지우고 all을 추가
          if (newTemp.size === 3) {
            newTemp.clear();
            newTemp.add('all');
          }
        } else {
          // 클릭한 것을 해지하는 경우라면
          newTemp.delete(value);
          // 지웠는데 아무것도 남아있지 않다면 all을 추가
          if (newTemp.size === 0) {
            newTemp.add('all');
          }
        }
      }
      setMultiCheckbox({
        ...multiCheckbox,
        [type]: newTemp,
      });
    }
  };

  const handleChangeSlider = (e, value) => {
    setPrice(value);
  };

  return (
    <div>
      <Title>5G 휴대폰</Title>
      <DeviceListWrapper>
        <DeviceListFilter
          paymentType={paymentType}
          discountType={discountType}
          price={price}
          multiCheckbox={multiCheckbox}
          onChangeCheckbox={handleChangeCheckbox}
          onChangeSlider={handleChangeSlider}
        />
        <DeviceList />
      </DeviceListWrapper>
    </div>
  );
}

export default DeviceListPage;
