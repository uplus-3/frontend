import React from 'react';
import LogoUplus from '../../assets/images/logo_uplus.png';

import { AppBar, Toolbar, ButtonBase, IconButton, styled } from '@mui/material';
import { Search } from '@mui/icons-material';

import RoundBtn from './RoundBtn';

import { useNavigate, createSearchParams } from 'react-router-dom';
import useInput from '../../lib/hooks/useInput';

const CustomAppbar = styled(AppBar)(({ theme }) => ({
  height: 60,
  minWidth: 1440,
  background: theme.palette.bg,
  boxShadow:
    '0px 2px 4px -1px rgb(0 0 0 / 3%), 0px 4px 5px 0px rgb(0 0 0 / 6%), 0px 1px 10px 0px rgb(0 0 0 / 4%)',
}));

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  width: 1440,
  margin: '0 auto',
}));

const SearchInput = styled('input')(({ theme }) => ({
  fontFamily: 'LGSmart',
  width: 500,
  borderRadius: 100,
  border: `1px solid ${theme.palette.gray3}`,
  padding: 10,
  '&:focus': {
    outline: `1px solid ${theme.palette.prime}`,
    '::-webkit-input-placeholder': {
      color: 'transparent',
    },
  },
  '&::-webkit-input-placeholder': {
    color: theme.palette.prime,
    textAlign: 'center',
  },
}));

const LogoImage = styled('img')({
  height: 24,
});

const SearchBar = styled('div')({
  position: 'absolute',
  left: '50%',
  transform: `translate(-50%)`,
});

const BtnWrapper = styled('div')({
  position: 'absolute',
  right: 0,
});

function Navbar() {
  const lenValidator = (value) => value.length <= 30;
  const [searchResult, onChange, setSearchResult] = useInput('', lenValidator);
  const navigate = useNavigate();

  // 로고 클릭시 홈으로 이동
  const handleLogoClick = () => {
    navigate('/');
  };

  // 검색시 호출되는 함수
  const handleSearch = (event) => {
    if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
      navigate({
        pathname: 'search/result',
        search: createSearchParams({ searchResult: searchResult }).toString(),
      });
      setSearchResult('');
    }
  };
  return (
    <CustomAppbar position="relative">
      <CustomToolbar disableGutters>
        <ButtonBase onClick={handleLogoClick}>
          <LogoImage alt="로고" src={LogoUplus} />
        </ButtonBase>
        <SearchBar>
          <SearchInput
            placeholder="갤럭시 Z Fold4"
            value={searchResult}
            onChange={onChange}
            onKeyDown={handleSearch}
          />
          <IconButton onClick={handleSearch}>
            <Search />
          </IconButton>
        </SearchBar>
        <BtnWrapper>
          <RoundBtn>구매조회</RoundBtn>
        </BtnWrapper>
      </CustomToolbar>
    </CustomAppbar>
  );
}

export default Navbar;
