import React from 'react';
import { styled } from '@mui/system';
import CartLIstItem from './CartLIstItem';

/**
 * 담당자 : 성아영
 */
const CartListBlock = styled('div')({});

function CartList({ cartList, setCartList }) {
  return (
    <>
      {cartList && (
        <CartListBlock>
          {cartList.map((cartItem) => (
            <CartLIstItem
              key={`cart-${cartItem.id}`}
              setCartList={setCartList}
              cartItem={cartItem}
            />
          ))}
        </CartListBlock>
      )}
    </>
  );
}

export default CartList;
