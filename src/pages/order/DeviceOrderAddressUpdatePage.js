import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import { TextField, InputAdornment, useTheme } from '@mui/material';
import useInput from '../../lib/hooks/useInput';
import SquareBtn from '../../components/common/SquareBtn';
import DaumPostCodeModal from '../../components/modal/DaumPostCodeModal';

import RoundBtn from '../../components/common/RoundBtn';
import { useLocation, useNavigate } from 'react-router-dom';
import useAlert from '../../lib/hooks/useAlert';
import { updateOrderInfo } from '../../lib/api/order';

/**
 * 담당자 : 윤병찬
 */
const DeviceOrderAddressUpdatePageBlock = styled('div')({
  marginTop: 150,
  marginLeft: 200,
  width: 1000,
  display: 'inline-block',
  textAlign: 'center',
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

const OrderTitle = styled('div')(({ theme }) => ({
  marginBottom: 150,
  fontSize: '1.875rem',
  fontWeight: 'bold',
}));

const OrderFormWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',

  alignItems: 'center',
});

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

function OrderAddressUpdatePage(ref) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state;
  const Calert = useAlert();
  const [detailAddress, onChangeDetailAddress] = useInput('');
  const [address, setAddress] = useState('');
  const [openPostcode, setOpenPostCode] = useState(false);
  const [addressMessage, setAddressMessage] = useState('');
  const [detailAddressMessage, setDetailAddressMessage] = useState('');

  const checkUserInfo = () => {
    if (!!!address) {
      setAddressMessage('주소를 입력해주세요');
      return false;
    } else if (!!!detailAddress) {
      setDetailAddressMessage('상세주소를 입력해주세요');
    }
    return !!!addressMessage && !!!detailAddressMessage;
  };

  const getAddress = () => {
    return `${address} ${detailAddress}`;
  };

  const handleGoSearchPage = () => {
    navigate('/order/search');
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      updateAddress();
    }
  };

  const updateAddress = async () => {
    try {
      if (checkUserInfo()) {
        const res = await updateOrderInfo(orderId, getAddress());
        Calert.fire({
          title: '주소 수정이 완료되었습니다',
          icon: 'success',
        }).then((res) => {
          if (res.isConfirmed) {
            //주문 조회 페이지로 이동
            navigate('/order/search');
          }
        });
      }
    } catch (e) {
      if (e.response.status === 404 || e.response.status === 500) {
        // 실패했을 경우
        Calert.fire({
          title: '주소 수정 오류 발생',
          confirmButtonText: '확인',
        }).then((res) => {
          if (res.isConfirmed) {
            navigate('/order/search');
          }
        });
      }
    }
  };

  return (
    <>
      <DeviceOrderAddressUpdatePageBlock>
        <Helmet>
          <title> 배송지 수정 | 엘지유플 최강 3조</title>
        </Helmet>
        <OrderTitle>배송지 수정</OrderTitle>
        <OrderFormWrapper>
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
              onKeyPress={handleOnKeyPress}
              onChange={onChangeDetailAddress}
              helperText={!!detailAddress && detailAddressMessage}
            />
          </InputWrapper>

          <Stack marginTop={2} direction="row" spacing={2}>
            <RoundBtn onClick={updateAddress} border={`1px solid ${theme.palette.prime}`}>
              주소 수정
            </RoundBtn>
            <RoundBtn
              onClick={handleGoSearchPage}
              backgroundColor="#FFFFFF"
              border={`1px solid ${theme.palette.prime}`}
              color={theme.palette.prime}>
              수정 취소
            </RoundBtn>
          </Stack>
        </OrderFormWrapper>
        <OrderFormWrapper>
          <DaumPostCodeModal
            open={openPostcode}
            setOpen={setOpenPostCode}
            setAddress={setAddress}
          />
        </OrderFormWrapper>
      </DeviceOrderAddressUpdatePageBlock>
    </>
  );
}

export default OrderAddressUpdatePage;
