import React from 'react';
import { styled } from '@mui/system';
import { Fab } from '@mui/material';

/**
 * 담당자 : 김수현
 */
const ScrollTopBtnBlock = styled('div')({
  position: 'fixed',
  bottom: 40,
  right: 40,
});

const StyledFab = styled(Fab)(({ theme }) => ({
  width: 40,
  height: 40,
  background: '#ffa4d6',
  color: theme.palette.prime,

  '&:hover': {
    background: '#ff89ca',
  },
}));

function ScrollTopBtn({ Icon, children }) {
  // 페이지 상단으로 이동
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <ScrollTopBtnBlock>
      <StyledFab onClick={handleClick}>
        {Icon}
        {children}
      </StyledFab>
    </ScrollTopBtnBlock>
  );
}

export default ScrollTopBtn;
