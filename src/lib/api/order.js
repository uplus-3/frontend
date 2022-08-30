import client from './client';

export const postOrder = (orderForm) => {
  return client.post('/orders', orderForm);
};
