import React from 'react';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import RoundBtn from '../components/common/RoundBtn';
import { useNavigate } from 'react-router-dom';

/**
 * 담당자 : 성아영
 */
const NotFoundBlock = styled('div')({
  marginTop: '10%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  padding: '100px 0',
});

const EmptyIconWrapper = styled('div')(({ theme }) => ({
  '& svg': {
    fontSize: 64,
    color: theme.palette.gray3,
  },
}));

const EmptyPharse = styled('div')({
  fontSize: 24,
});

const ButtonWrapper = styled('div')({
  marginTop: 20,
});

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <NotFoundBlock>
      <Helmet>
        <title> 페이지를 찾을 수 없습니다. | 엘지유플 최강 3조</title>
      </Helmet>
      <EmptyIconWrapper>
        <ErrorOutline />
      </EmptyIconWrapper>
      <EmptyPharse>접근할 수 없는 페이지 입니다.</EmptyPharse>
      <ButtonWrapper>
        <RoundBtn onClick={() => navigate('/')} content="메인페이지로 이동" padding="10px 35px" />
      </ButtonWrapper>
    </NotFoundBlock>
  );
}

export default NotFoundPage;
