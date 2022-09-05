import client from './client';

/**
 * 담당자 : 성아영
 */
export const getCartList = (cartId) => {
  return client.get(`/carts/${cartId}`);
};

export const createCartItem = ({
  cartId,
  colorId,
  discountType,
  installmentPeriod,
  planId,
  registrationType,
}) => {
  return client.post(`/carts/${cartId}`, {
    colorId,
    discountType,
    installmentPeriod,
    planId,
    registrationType,
  });
};

export const deleteCartItem = (cartItemId) => {
  return client.delete(`/carts/${cartItemId}`);
};
