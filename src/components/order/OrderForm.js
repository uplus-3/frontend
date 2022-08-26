import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField, useTheme } from '@mui/material';
import { PhoneFormatter, PriceFormatter } from '../../lib/utils';
import useInput from '../../lib/hooks/useInput';
import SquareBtn from '../common/SquareBtn';

const OrderFormBlock = styled('div')({
  marginTop: 20,
  width: 1000,
  display: 'inline-block',
});

const InputWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  marginLeft: 20,
  alignItems: 'center',
  gap: 20,
  span: {
    fontSize: '0.8rem',
    color: '#00000090',
  },
}));

const CustomInput = styled(TextField)(({ theme }) => ({
  margin: 0,
  '.MuiInput-underline:after': {
    borderBottomColor: theme.palette.prime,
  },
}));

const DeviceInfoWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'start',
  marginLeft: 20,
  marginBottom: 30,
  span: {
    fontSize: '0.8rem',
    color: '#00000090',
    width: 100,
  },
}));

const OrderTitle = styled('div')({
  fontWeight: 600,
  fontSize: '1.3rem',
});

const OrderFormWrapper = styled('div')(({ theme }) => ({
  padding: '25px 0 25px 40px',
  '.form-title': {
    fontWeight: 600,
    fontSize: '1.1rem',
    marginBottom: 20,
  },
}));

const ButtonWrapper = styled('div')(({ theme, direction }) => ({
  display: 'flex',
  flexDirection: direction,
  gap: !!direction ? 10 : 20,
}));

const PlanContent = styled('div')({
  padding: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  marginRight: 'auto',
  textAlign: 'start',
  '.plan-price': {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#000000',
  },
});

const DiscountContent = styled('div')({
  padding: 10,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  '.discount-price': {
    fontSize: '1.2rem',
    marginLeft: 'auto',
    fontWeight: 600,
  },
  '.discount-description': {
    marginRight: 'auto',
    textAlign: 'start',
    fontSize: '0.9rem',
    '.discount-sub-description': {
      fontSize: '0.8rem',
      color: '#000000B0',
    },
  },
});

const installmentPeriodList = [
  { id: 1, content: '일시불' },
  { id: 12, content: '12개월' },
  { id: 24, content: '24개월' },
  { id: 36, content: '36개월' },
];

function OrderForm() {
  const phonenumberValidator = (num) => num.indexOf('-') === -1;
  const theme = useTheme();
  const [name, onNameChange, setName] = useInput('');
  const [phonenumber, onChangePhonenumber, setPhonenumber] = useInput('');
  const [address, onChangeAddress, setAddress] = useInput('');
  const [orderForm, setOrderForm] = useState({
    colorId: 1,
    discountType: 0,
    installmentPeriod: 1,
    planId: 1,
    price: 100236,
    registrationType: 0,
    shipmentType: 1,
  });
  const [planList, setPlanList] = useState([]);

  const getPrice = () => {
    // 백엔드로 api 요청
  };

  const getPlanList = () => {
    setPlanList([
      {
        id: 1,
        name: '5G 라이트',
        price: 55000,
      },
      {
        id: 2,
        name: '5G 프리미어 에센셜',
        price: 85000,
      },
      {
        id: 3,
        name: '5G 슬림+',
        price: 47000,
      },
    ]);
  };
  useEffect(() => {
    getPrice();
    getPlanList();
  }, []);
  return (
    <OrderFormBlock>
      <OrderTitle>주문/결제</OrderTitle>
      <OrderFormWrapper>
        <div className="form-title">주문자 정보</div>
        <InputWrapper>
          <span>이름</span>
          <CustomInput value={name} onChange={onNameChange} variant="standard" />
        </InputWrapper>
        <InputWrapper>
          <span>휴대폰번호</span>
          <CustomInput
            value={PhoneFormatter(phonenumber)}
            onChange={onChangePhonenumber}
            variant="standard"
          />
        </InputWrapper>
        <InputWrapper>
          <span>주소</span>
          <CustomInput variant="standard" />
        </InputWrapper>
      </OrderFormWrapper>
      <OrderFormWrapper>
        <div className="form-title">상품정보</div>
        <DeviceInfoWrapper>
          <span>가입유형</span>
          <ButtonWrapper>
            {['기기변경', '신규가입', '번호이동'].map((type, idx) => (
              <SquareBtn
                key={`${type}-${idx}`}
                border={orderForm.registrationType === idx && `1px solid ${theme.palette.prime}`}
                color={orderForm.registrationType === idx && theme.palette.prime}
                width={206}
                padding="10px"
                onClick={() => {
                  setOrderForm((prev) => ({ ...prev, registrationType: idx }));
                }}>
                {type}
              </SquareBtn>
            ))}
          </ButtonWrapper>
        </DeviceInfoWrapper>
        <DeviceInfoWrapper>
          <span>배송방법</span>
          <ButtonWrapper>
            {['우체국 택배', '오늘 도착'].map((shipmentType, idx) => (
              <SquareBtn
                padding="10px"
                key={`${shipmentType}-${idx}`}
                border={orderForm.shipmentType === idx + 1 && `1px solid ${theme.palette.prime}`}
                color={orderForm.shipmentType === idx + 1 && theme.palette.prime}
                width={320}
                onClick={() =>
                  setOrderForm((prev) => {
                    return { ...prev, shipmentType: idx + 1 };
                  })
                }>
                {shipmentType}
              </SquareBtn>
            ))}
          </ButtonWrapper>
        </DeviceInfoWrapper>
        <DeviceInfoWrapper>
          <span>요금제</span>
          <ButtonWrapper direction="column">
            {planList.map((plan, idx) => (
              <SquareBtn
                border={plan.id === orderForm.planId && `1px solid ${theme.palette.prime}`}
                color={plan.id === orderForm.planId && theme.palette.prime}
                key={`${plan.id}-${plan.name}`}
                width={660}
                onClick={() => setOrderForm((prev) => ({ ...prev, planId: plan.id }))}>
                <PlanContent>
                  <div>{plan.name}</div>
                  <div className="plan-price">{PriceFormatter(plan.price)}원</div>
                </PlanContent>
              </SquareBtn>
            ))}
          </ButtonWrapper>
        </DeviceInfoWrapper>
        <DeviceInfoWrapper>
          <span>할인유형</span>
          <ButtonWrapper>
            <SquareBtn
              padding="10px"
              width={320}
              border={orderForm.discountType === 0 && `1px solid ${theme.palette.prime}`}
              color={orderForm.discountType === 0 && theme.palette.prime}
              onClick={() => setOrderForm((prev) => ({ ...prev, discountType: 0 }))}>
              <DiscountContent>
                <div className="discount-description">
                  <div>공시지원금</div>
                  <div className="discount-sub-description">휴대폰가격 1회 할인</div>
                </div>
                <div className="discount-price">-{PriceFormatter(322000)}원</div>
              </DiscountContent>
            </SquareBtn>
            <SquareBtn
              padding="10px"
              width={320}
              border={orderForm.discountType === 1 && `1px solid ${theme.palette.prime}`}
              color={orderForm.discountType === 1 && theme.palette.prime}
              onClick={() => setOrderForm((prev) => ({ ...prev, discountType: 1 }))}>
              <DiscountContent>
                <div className="discount-description">
                  <div>선택약정 (24개월)</div>
                  <div className="discount-sub-description">통신요금 25% 할인</div>
                </div>
                <div className="discount-price">-{PriceFormatter(510000)}원</div>
              </DiscountContent>
            </SquareBtn>
          </ButtonWrapper>
        </DeviceInfoWrapper>
        <DeviceInfoWrapper>
          <span>할부기간</span>
          <ButtonWrapper>
            {installmentPeriodList.map((period) => (
              <SquareBtn
                border={
                  orderForm.installmentPeriod === period.id && `1px solid ${theme.palette.prime}`
                }
                padding="15px"
                width={150}
                color={orderForm.installmentPeriod === period.id && theme.palette.prime}
                key={`${period.id}-${period.content}`}
                onClick={() => setOrderForm((prev) => ({ ...prev, installmentPeriod: period.id }))}>
                {period.content}
              </SquareBtn>
            ))}
          </ButtonWrapper>
        </DeviceInfoWrapper>
      </OrderFormWrapper>
    </OrderFormBlock>
  );
}

export default OrderForm;
