import styled from '@emotion/styled';
import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import CartList from '../../components/cart/CartList';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Title>장바구니</Title>
      <Box sx={{ padding: '20px 0' }}>
        <StyledTabs value={value} onChange={handleChange}>
          <Tab value="mobile" label="모바일 기기" />
        </StyledTabs>
      </Box>
      <CountTab>전체 3개</CountTab>
      <CartList />
    </div>
  );
}

export default CartListPage;
