/**
 * 담당자 : 성아영
 */
export const PriceFormatter = (price) => {
  if (typeof price !== 'number') return;
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const PhoneFormatter = (num) => {
  num = num.replace(/[^0-9]/g, '');
  let formattedNum = '';
  if (num.length < 4) {
    return num;
  } else if (num.length < 7) {
    formattedNum += num.substr(0, 3);
    formattedNum += '-';
    formattedNum += num.substr(3);
    return formattedNum;
  } else if (num.length < 11) {
    formattedNum += num.substr(0, 3);
    formattedNum += '-';
    formattedNum += num.substr(3, 3);
    formattedNum += '-';
    formattedNum += num.substr(6);
    return formattedNum;
  } else {
    formattedNum += num.substr(0, 3);
    formattedNum += '-';
    formattedNum += num.substr(3, 4);
    formattedNum += '-';
    formattedNum += num.substr(7);
    return formattedNum;
  }
};
