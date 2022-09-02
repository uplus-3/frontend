import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import { styled } from '@mui/system';
import { TextField, InputAdornment, useTheme } from '@mui/material';
import { PhoneFormatter, PriceFormatter } from '../../lib/utils';
import useInput from '../../lib/hooks/useInput';
import SquareBtn from '../common/SquareBtn';
import DaumPostCodeModal from '../modal/DaumPostCodeModal';
import { useSelector } from 'react-redux';
import { getRecommendedPlan } from '../../modules/actions/planSlice';

const OrderFormBlock = styled('div')({
  marginTop: 20,
  width: 1000,
  paddingRight: 130,
  display: 'inline-block',
});

const InputWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  marginLeft: 20,
  alignItems: 'center',
  marginTop: 10,
  span: {
    fontSize: '0.8rem',
    color: '#00000090',
    width: 100,
  },
}));

const NamePhoneInputWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const CustomInput = styled(TextField)(({ theme, width }) => ({
  width: width,
  margin: 0,
  '.MuiInput-underline:after': {
    borderBottomColor: theme.palette.prime,
  },
  '.MuiFormHelperText-root': {
    color: '#d32f2f',
  },
  '&::placeholder': {
    fontSize: '0.8rem',
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
  padding: '25px 40px',
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

function OrderForm({ orderForm, setOrderForm, devicePriceInfo, planId }, ref) {
  const phonenumberValidator = (num) => num.indexOf('-') === -1;
  const theme = useTheme();
  const [name, onNameChange, setName] = useInput('');
  const [phonenumber, onChangePhonenumber, setPhonenumber] = useInput('');
  const [detailAddress, onChangeDetailAddress] = useInput('');
  const [address, setAddress] = useState('');
  const [openPostcode, setOpenPostCode] = useState(false);

  const [phoneMessage, setPhoneMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [addressMessage, setAddressMessage] = useState('');
  const [detailAddressMessage, setDetailAddressMessage] = useState('');

  const phoneValidator = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const nameValidator = /^[가-힣]{2,20}$/;

  useImperativeHandle(ref, () => ({
    checkUserInfo,
    getUserInfo,
  }));
  const getPrice = () => {
    // 백엔드로 api 요청
  };

  const planList =
    useSelector(({ plan }) => {
      return getRecommendedPlan(plan, planId);
    }) || [];

  const checkUserInfo = () => {
    if (!!!name) {
      setNameMessage('이름을 입력해주세요');
      return false;
    } else if (!!!phonenumber) {
      setPhoneMessage('휴대폰 번호를 입력해주세요.');
      return false;
    } else if (!!!address) {
      setAddressMessage('주소를 입력해주세요');
      return false;
    } else if (!!!detailAddress) {
      setDetailAddressMessage('상세주소를 입력해주세요');
    }
    return !!!nameMessage && !!!addressMessage && !!!phoneMessage && !!!detailAddressMessage;
  };

  const getUserInfo = () => {
    return {
      name,
      address: `${address} ${detailAddress}`,
      phoneNumber: phonenumber,
    };
  };

  const getPlanList = () => {
    return [
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
    ];
  };

  useEffect(() => {
    getPrice();
  }, []);

  useEffect(() => {
    if (!name || nameValidator.test(name)) {
      setNameMessage('');
    } else {
      setNameMessage('한글이름 기준으로 2자리 이상 20자리 이하로 입력해주세요.');
    }
  }, [name]);

  useEffect(() => {
    if (!phonenumber || phoneValidator.test(PhoneFormatter(phonenumber))) {
      setPhoneMessage('');
    } else {
      setPhoneMessage('유효하지 않은 휴대폰번호입니다.');
    }
  }, [phonenumber]);

  return (
    <OrderFormBlock>
      <OrderTitle>주문/결제</OrderTitle>
      <OrderFormWrapper>
        <div className="form-title">주문자 정보</div>
        <NamePhoneInputWrapper>
          <InputWrapper>
            <span>이름</span>
            <CustomInput
              required
              width={255}
              value={name}
              onChange={onNameChange}
              variant="standard"
              helperText={nameMessage}
            />
          </InputWrapper>
          <InputWrapper>
            <span>휴대폰번호</span>
            <CustomInput
              required
              placehoder="휴대폰번호를 입력해주세요"
              width={255}
              value={phonenumber}
              onChange={onChangePhonenumber}
              variant="standard"
              helperText={phoneMessage}
            />
          </InputWrapper>
        </NamePhoneInputWrapper>
        <InputWrapper>
          <span>주소</span>
          <CustomInput
            required
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <SquareBtn
                    onClick={() => setOpenPostCode(true)}
                    color="#ffffff"
                    border="transparent"
                    backgroundColor={theme.palette.prime}
                    height="20px">
                    주소검색
                  </SquareBtn>
                </InputAdornment>
              ),
            }}
            width={670}
            value={address}
            variant="standard"
            onClick={() => setOpenPostCode(true)}
            helperText={!!address && addressMessage}
          />
        </InputWrapper>
        <InputWrapper>
          <span>상세주소</span>
          <CustomInput
            width={670}
            disabled={!!!address}
            value={detailAddress}
            variant="standard"
            onChange={onChangeDetailAddress}
            helperText={!!detailAddress && detailAddressMessage}
          />
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
                <div className="discount-price">
                  -{PriceFormatter(devicePriceInfo.psupport + devicePriceInfo.asupport)}원
                </div>
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
                <div className="discount-price">-{PriceFormatter(devicePriceInfo.sdiscount)}원</div>
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
        <DaumPostCodeModal open={openPostcode} setOpen={setOpenPostCode} setAddress={setAddress} />
      </OrderFormWrapper>
    </OrderFormBlock>
  );
}

export default forwardRef(OrderForm);
