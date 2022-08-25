import React from 'react';

import { styled } from '@mui/material';
import RoundBtn from '../components/common/RoundBtn';

const MainDiv = styled('div')({
  zIndex: 0,
  position: 'absolute',
  background: `url(https://image.lguplus.com/static/pc-contents/images/fcmm/cnts/imge/20220822-123958-160-h0WGG9kU.jpg)`,
  backgroundSize: 'cover',
  width: '100%',
  height: '100%',
  left: 0,
});

const ContentDiv = styled('div')({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  gap: 30,
  left: 240,
  bottom: 400,
});

const Title = styled('div')({
  color: '#fff',
  fontWeight: 700,
  fontSize: '2rem',
});

const SubTitle = styled('div')({
  color: '#fff',
  fontSize: '1.5rem',
});

function MainPage() {
  return (
    <MainDiv>
      <ContentDiv>
        <Title>Galaxy Z Filp4 | Z Fold4</Title>
        <div>
          <SubTitle> 유플러스 단독 메종키츠네 리미티드 에디션부터</SubTitle>
          <SubTitle>갤럭시 워치5와 버즈2까지</SubTitle>
        </div>
        <RoundBtn>구매하러 가기</RoundBtn>
      </ContentDiv>
    </MainDiv>
  );
}

export default MainPage;
