import React from 'react';
import { styled } from '@mui/system';
import { CircularProgress } from '@mui/material';

/**
 * 담당자 : 김수현
 */
const StyledProgress = styled(CircularProgress)(({ theme, color }) => ({
  color: color || theme.palette.prime,
}));

function Loading({ color }) {
  return (
    <div>
      <StyledProgress color={color} />
    </div>
  );
}

export default Loading;
