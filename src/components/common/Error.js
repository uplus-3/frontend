import React from 'react';
import { ErrorOutline } from '@mui/icons-material';
import { styled } from '@mui/system';

/**
 * 담당자 : 김수현
 */
const ErrorBlock = styled('div')({
  textAlign: 'center',
});

const ErrorIconWrapper = styled('div')(({ theme }) => ({
  '& svg': {
    fontSize: 64,
    color: theme.palette.gray3,
  },
}));

const ErrorPharse = styled('div')({
  fontSize: 24,
});

function Error({ message, children }) {
  return (
    <ErrorBlock>
      <ErrorIconWrapper>
        <ErrorOutline />
      </ErrorIconWrapper>
      <ErrorPharse>{message}</ErrorPharse>
      {children}
    </ErrorBlock>
  );
}

export default Error;
