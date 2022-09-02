import client from './client';

export const postOrder = (orderForm) => {
  return client.post('/orders', orderForm);
};

export const getOrderInfoByNameAndNumber = ({ name, number }) => {
  return client.get('/orders', {
    params: {
      name, number
    },
  });
}; 

export const updateOrderInfo = ({ orderId, address }) => {
  return client.patch(`/orders/${orderId}`, address)
};

export const deleteOrder = (orderId) => {
  return client.delete(`/orders/${orderId}`)
}
 



