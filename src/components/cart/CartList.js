import React from 'react';
import { styled } from '@mui/system';
import CartListEmpty from './CartListEmpty';
import CartLIstItem from './CartLIstItem';

const CartListBlock = styled('div')({});

function CartList() {
  return (
    <CartListBlock>
      <CartLIstItem />
      <CartLIstItem />
      <CartLIstItem />
      {/* <CartListEmpty /> */}
    </CartListBlock>
  );
}

export default CartList;
