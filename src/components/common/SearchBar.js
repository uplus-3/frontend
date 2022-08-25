import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';

import { IconButton, Popper, Paper, ToggleButton, ToggleButtonGroup, Divider } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate, createSearchParams } from 'react-router-dom';
import useInput from '../../lib/hooks/useInput';

const SearchBarBlock = styled('div')({
  position: 'absolute',
  left: '50%',
  transform: `translate(-50%)`,
});

const SearchInput = styled('input')(({ theme }) => ({
  fontFamily: 'LGSmart',
  width: 500,
  textAlign: 'center',
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

const SearchMenu = styled(Paper)(({ theme }) => ({
  width: 500,
  height: 300,
  padding: 10,
}));

const CategoryToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  fontFamily: 'LGSmart',
  '& .MuiToggleButtonGroup-grouped': {
    margin: 5,
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: 10,
      color: theme.palette.prime,
      border: `1px solid ${theme.palette.prime}`,
    },
    '&:first-of-type': {
      borderRadius: 10,
      color: theme.palette.prime,
      border: `1px solid ${theme.palette.prime}`,
    },
    '&.Mui-selected': {
      borderRadius: 10,
      background: theme.palette.prime,
      color: '#FFFFFF',
      border: '1px solid #00000030',
      boxShadow: `inset 0 0 13px #00000040`,
    },
  },
}));

function SearchBar() {
  const lenValidator = (value) => value.length <= 30;

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchCategory, setSearchCategory] = useState(null);
  const navigate = useNavigate();
  const [searchResult, onChange, setSearchResult] = useInput('', lenValidator);

  // 검색시 호출되는 함수
  const handleSearch = (event) => {
    if (searchResult === '') return;
    if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
      navigate({
        pathname: 'search/result',
        search: createSearchParams({ searchResult: searchResult }).toString(),
      });
      saveRecentSearch(searchResult);
      setSearchResult('');
    }
  };

  // 검색 메뉴 닫는 함수
  const handleMenuClose = () => {
    if (!!!searchResult) {
      setAnchorEl(null);
    }
  };

  // 카테고리 토글버튼 클릭 시 실행되는 함수
  const handleSearchCategory = (event, category) => {
    setSearchCategory(category);
  };

  const saveRecentSearch = (searchTerm) => {
    const currentRecentSearchTerms = JSON.parse(localStorage.getItem('recent_search_terms')) || [];
    console.log(currentRecentSearchTerms);
    localStorage.setItem(
      'recent_search_terms',
      JSON.stringify([searchTerm, ...currentRecentSearchTerms].slice(0, 5)),
    );
  };

  const deleteRecentSearch = (idx) => {};

  return (
    <SearchBarBlock>
      <SearchInput
        onFocus={(event) => setAnchorEl(event.currentTarget)}
        placeholder="갤럭시 Z Fold4"
        value={searchResult}
        onChange={onChange}
        onKeyDown={handleSearch}
      />
      <IconButton onClick={handleSearch}>
        <Search />
      </IconButton>
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} disablePortal>
        <SearchMenu>
          카테고리
          <Divider />
          <CategoryToggleButtonGroup
            exclusive
            value={searchCategory}
            onChange={handleSearchCategory}>
            <ToggleButton value="5G" aria-label="centered" size="small">
              5G 휴대폰
            </ToggleButton>
            <ToggleButton value="4G" aria-label="right aligned" size="small">
              4G 휴대폰
            </ToggleButton>
          </CategoryToggleButtonGroup>
          최근검색어
          <Divider />
          <div>
            {JSON.parse(localStorage.getItem('recent_search_terms')).map((term) => {
              return <div>{term}</div>;
            })}
          </div>
          연관검색어
          <Divider />
        </SearchMenu>
      </Popper>
    </SearchBarBlock>
  );
}

export default SearchBar;
