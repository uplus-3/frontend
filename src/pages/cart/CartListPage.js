import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet-async';

import styled from '@emotion/styled';
import { Box, Tab, Tabs } from '@mui/material';

import { getCartList } from '../../lib/api/cart';
import CartList from '../../components/cart/CartList';
import CartListEmpty from '../../components/cart/CartListEmpty';

/**
 * 담당자 : 성아영
 */
const Title = styled('h1')({
  paddingTop: 30,
  paddingBottom: 10,
  fontWeight: 'normal',
  fontSize: 40,
});

const CountTab = styled('div')({
  color: 'gray',
});

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.gray3}`,

  '& .MuiTabs-indicator': {
    background: theme.palette.prime,
  },
  '& .MuiTab-root.Mui-selected': {
    color: theme.palette.prime,
    fontSize: 24,
    fontWeight: 600,
  },
}));

function CartListPage() {
  const [value, setValue] = useState('mobile');
  const [cartCount, setCartCount] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [cookie, setCookie] = useCookies(['cartCount']);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getCartItemList = async () => {
    if (cookie?.cartCount && cookie?.cartId) {
      try {
        const res = await getCartList(cookie.cartId);
        setCartList(res.data.carts);
      } catch (e) {
        setCartCount(0);
      }
    }
  };
  useEffect(() => {
    setCartCount(parseInt(cookie?.cartCount || 0));
    getCartItemList();
  }, [cookie.cartCount]);

  return (
    <div>
      <Helmet>
        <title> 장바구니 | 엘지유플 최강 3조</title>
      </Helmet>
      <Title>장바구니</Title>
      {cartCount ? (
        <>
          <Box sx={{ padding: '20px 0' }}>
            <StyledTabs value={value} onChange={handleChange}>
              <Tab value="mobile" label="모바일 기기" />
            </StyledTabs>
          </Box>
          <CountTab>전체 {cartCount}개</CountTab>
          <CartList cartList={cartList} setCartList={setCartList} />
        </>
      ) : (
        <CartListEmpty />
      )}
    </div>
  );
}

export default CartListPage;
