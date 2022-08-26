export const getFormattedPrice = (price) => {
  if (typeof price !== 'number') return;
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
