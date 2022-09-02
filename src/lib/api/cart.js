import client from './client';

export const getCartList = (cartId) => {
  return client.get(`/carts/${cartId}`);
};

export const createCartItem = ({
  colorId,
  discountType,
  installmentPeriod,
  planId,
  registrationType,
}) => {
  return client.post('/carts', {
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
