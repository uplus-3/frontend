import client from './client';

export const postOrder = ({
  address,
  colorId,
  discountType,
  installmentPeriod,
  name,
  phoneNumber,
  planId,
  price,
  registrationType,
  shipmentType,
}) => {
  const orderForm = {
    address,
    colorId,
    discountType,
    installmentPeriod,
    name,
    phoneNumber,
    planId,
    price,
    registrationType,
    shipmentType,
  };
  return client.post('/orders', orderForm);
};

export const getOrderInfoByNameAndNumber = ({ name, number }) => {
  return client.get('/orders', {
    params: {
      name,
      number,
    },
  });
};

export const updateOrderInfo = ({ orderId, address }) => {
  return client.patch(`/orders/${orderId}`, address);
};

export const deleteOrder = (orderId) => {
  return client.delete(`/orders/${orderId}`);
};
