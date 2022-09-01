import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { styled } from '@mui/system';
import {
  TextField,
} from '@mui/material';
import useInput from '../../lib/hooks/useInput';
import RoundBtn from '../common/RoundBtn';
import useAlert from '../../lib/hooks/useAlert';
import { useNavigate } from 'react-router-dom';
import { getOrderInfoByNameAndNumber } from '../../lib/api/order';

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

const NameNumberInputWrapper = styled('div')({
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


function OrderSearchForm({ orderForm, setOrderForm }, ref) {
  const Calert = useAlert();
  const [name, onNameChange, setName] = useInput('윤유플');
  const [number, onNumberChange, setNumber] = useInput('2208313678');
  const navigate = useNavigate();
  const [numberMessage, setNumberMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');

  const nameValidator = /^[가-힣]{2,20}$/;

  useImperativeHandle(ref, () => ({
    checkUserInfo,
    getUserInfo,
  }));

  const checkUserInfo = () => {
    if (!!!name) {
      setNameMessage('이름을 입력해주세요');
      return false;
    } else if (!!!number) {
      setNumberMessage('주문 번호를 입력해주세요.');
      return false;
    }
    return !!!nameMessage && !!!numberMessage;
  };

  const getUserInfo = () => {
    return {
      name,
      number,
    };
  };

  const orderSearch = async () => {
    try {
      //성공했을경우
      if (checkUserInfo()) {
        const res = await getOrderInfoByNameAndNumber({ name, number });
        const orderId = res.data.id;
        const orderInfo = res.data;

        console.log(res);
        console.log(res.data.id);
        console.log(orderId);
        console.log(orderInfo);

        Calert.fire({
          title: '주문 조회가 완료되었습니다',
          icon: 'success'
        }).then((res) => {
          if (res.isConfirmed) {
            //결과페이지로 이동
            navigate(
              `/order/${orderId}`, {
                state: orderInfo
              }
            );
          }
        });
      }
    } catch (e) {
      // 입력 정보가 부정확할 때
      Calert.fire({
        title: '입력 정보를 확인해 주세요',
        confirmButtonText: '확인',
      });
    }
  };

  useEffect(() => {
    if (!name || nameValidator.test(name)) {
      setNameMessage('');
    } else {
      setNameMessage('한글이름 기준으로 2자리 이상 20자리 이하로 입력해주세요.');
    }
  }, [name]);

  useEffect(() => {
    if (!number || number.length == 10) {
      setNumberMessage('');
    } else {
      setNumberMessage('유효하지 않은 주문번호입니다.');
    }
  }, [number]);

  return (
    <OrderFormBlock>
      <OrderTitle>주문 조회</OrderTitle>
      <OrderFormWrapper>
        <div className="form-title">주문 정보</div>
        <NameNumberInputWrapper>
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
            <span>주문번호</span>
            <CustomInput
              required
              placehoder="주문번호를 입력해주세요"
              width={255}
              value={number}
              onChange={onNumberChange}
              variant="standard"
              helperText={numberMessage}
            />
          </InputWrapper>
          <RoundBtn width={180} height={100} onClick={orderSearch}>
            조회하기
          </RoundBtn>
        </NameNumberInputWrapper>
      </OrderFormWrapper>
    </OrderFormBlock>
  );
}

export default forwardRef(OrderSearchForm);
