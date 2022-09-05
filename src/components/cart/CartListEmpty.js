import React from 'react';
import { styled } from '@mui/system';
import { ErrorOutline } from '@mui/icons-material';

import RoundBtn from '../common/RoundBtn';
import { useNavigate } from 'react-router-dom';

/**
 * 담당자 : 성아영
 */
const CartListEmptyBlock = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  padding: '100px 0',
});

const EmptyIconWrapper = styled('div')(({ theme }) => ({
  '& svg': {
    fontSize: 64,
    color: theme.palette.gray3,
  },
}));

const EmptyPharse = styled('div')({
  fontSize: 24,
});

const ButtonWrapper = styled('div')({
  marginTop: 20,
});

function CartListEmpty() {
  const navigate = useNavigate();
  return (
    <CartListEmptyBlock>
      <EmptyIconWrapper>
        <ErrorOutline />
      </EmptyIconWrapper>
      <EmptyPharse>장바구니에 담은 상품이 없습니다.</EmptyPharse>
      <ButtonWrapper>
        <RoundBtn
          onClick={() => navigate('/5g-phone')}
          content="상품 둘러보기"
          padding="10px 35px"
        />
      </ButtonWrapper>
    </CartListEmptyBlock>
  );
}

export default CartListEmpty;
