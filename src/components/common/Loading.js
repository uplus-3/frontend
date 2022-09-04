import React from 'react';
import { styled } from '@mui/system';
import { CircularProgress } from '@mui/material';

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
