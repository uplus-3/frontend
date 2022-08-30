import React from 'react';
import { styled } from '@mui/system';
import { ErrorOutline } from '@mui/icons-material';

import RoundBtn from '../common/RoundBtn';

const CartListEmptyBlock = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  padding: '100px 0',
});

const EmptyIconWapper = styled('div')(({ theme }) => ({
  '& svg': {
    fontSize: 64,
    color: theme.palette.gray3,
  },
}));

const EmptyPharse = styled('div')({
  fontSize: 24,
});

const ButtonWapper = styled('div')({
  marginTop: 20,
});

function CartListEmpty() {
  return (
    <CartListEmptyBlock>
      <EmptyIconWapper>
        <ErrorOutline />
      </EmptyIconWapper>
      <EmptyPharse>장바구니에 담은 상품이 없습니다.</EmptyPharse>
      <ButtonWapper>
        <RoundBtn content="상품 둘러보기" padding="10px 35px" />
      </ButtonWapper>
    </CartListEmptyBlock>
  );
}

export default CartListEmpty;
