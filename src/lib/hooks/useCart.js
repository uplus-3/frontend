import { useCookies } from 'react-cookie';
import { createCartItem, deleteCartItem } from '../api/cart';
import useAlert from './useAlert';
import { useNavigate } from 'react-router-dom';

/**
 * 담당자 : 성아영
 */
function useCart() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(['cartId', 'cartCount']);
  const Calert = useAlert();

  const addCart = async ({
    colorId,
    discountType,
    installmentPeriod,
    planId,
    registrationType,
  }) => {
    try {
      const res = await createCartItem({
        cartId: cookie.cartId || -1,
        colorId,
        discountType,
        installmentPeriod,
        planId,
        registrationType,
      });
      let date = new Date();
      date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
      setCookie('cartId', res.data.carts[0].cartId, {
        path: '/',
        expires: date,
      });
      setCookie('cartCount', res.data.carts.length, {
        path: '/',
        expires: date,
      });

      Calert.fire({
        icon: 'success',
        title: '장바구니에 물건을 담았습니다.',
        text: '장바구니로 이동하시겠습니까?',
        confirmButtonText: '이동하기',
        showCancelButton: true,
        cancelButtonText: '쇼핑 계속하기',
      }).then((res) => {
        if (res.isConfirmed) {
          navigate('/cart');
        }
      });
    } catch (e) {
      Calert.fire({
        title: '장바구니에 담을 수 없습니다.',
      });
    }
  };

  const deleteCart = (cartItemId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await deleteCartItem(cartItemId);
        let curCartCount = parseInt(cookie.cartCount || 1);
        let date = new Date();
        date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
        setCookie('cartCount', curCartCount - 1, { path: '/', expires: date });
        resolve(true);
      } catch (e) {
        reject(false);
      }
    });
  };
  return { addCart, deleteCart };
}

export default useCart;
