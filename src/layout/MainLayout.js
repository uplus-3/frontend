import React from 'react';
import { Outlet } from 'react-router-dom';

import { styled } from '@mui/system';
import Navbar from '../components/common/Navbar';

/**
 * 담당자 : 성아영
 */
const MainLayoutBlock = styled('div')(({ theme }) => ({
  background: theme.palette.bg,
  width: '1440px',
  margin: '0 auto',
}));

function MainLayout(props) {
  return (
    <>
      <Navbar />
      <MainLayoutBlock>
        <Outlet />
      </MainLayoutBlock>
    </>
  );
}

export default MainLayout;
