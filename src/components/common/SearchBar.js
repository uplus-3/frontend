import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';

import {
  IconButton,
  Popper,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Tooltip,
  Chip,
  ClickAwayListener,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
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
  margin: 5,
  width: 650,
  minHeight: 500,
  padding: 10,
  boxShadow: '0px 4px 5px 0px rgb(0 0 0 / 12%)',
  ':first-of-type': {
    fontSize: '0.8rem',
  },
}));

const SearchSubMenuWrapper = styled('div')(({ theme }) => ({
  marginBottom: 25,
}));

const NetworkTypeToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
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
      ':hover': {
        background: theme.palette.prime + 'c0',
      },
    },
  },
}));

const RecentSearchTerm = styled(Chip)(({ theme }) => ({
  background: 'transparent',
  display: 'flex',
  borderRadius: 3,
  width: 'fit-content',
  height: 'fit-content',
  padding: 2,
  flexBasis: 'content',
  alignItems: 'center',
  justifyContent: 'start',
  '&:hover': {
    background: theme.palette.gray1,
  },
  '.MuiChip-deleteIcon': {
    fontSize: '1rem',
  },
}));

const RelatedSearchTermWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const RelatedSearchTermImage = styled('div')(({ theme }) => ({
  textAlign: 'center',
  width: 200,
  color: '#000000a0',
}));

const RelatedSearchTerm = styled('div')(({ theme }) => ({
  fontSize: '14px',
  padding: 2,
  borderRadius: 3,
  margin: 4,
  cursor: 'pointer',
  '&:hover': {
    background: theme.palette.gray1,
  },
}));

const HighlightRelatedSearchTerm = styled('span')(({ theme }) => ({
  color: theme.palette.prime,
  fontWeight: 600,
}));

const EmptyRecentSearchTerm = styled('div')(({ theme }) => ({
  textAlign: 'center',
  margin: 30,
  color: theme.palette.gray3,
}));

const tempRelatedSearchTerm = {
  results: [
    {
      id: 'SM-F721N',
      name: '갤럭시 Z Flip 4 (1)',
      networkType: '5g',
      image:
        'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-021216-097-IrwyS2Zu.jpg',
    },
    {
      id: 'SM-F721N-MK',
      name: '갤럭시 Z Flip 4 메종키츠네 에디션 (2)',
      networkType: '5g',
      image:
        'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-030104-557-H2uealCE.jpg',
    },
    {
      id: 'SM-F721N',
      name: '갤럭시 Z Flip 4 (3)',
      networkType: '5g',
      image:
        'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-021216-097-IrwyS2Zu.jpg',
    },
    {
      id: 'SM-F721N-MK',
      name: '갤럭시 Z Flip 4 메종키츠네 에디션 (4)',
      networkType: '5g',
      image:
        'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-030104-557-H2uealCE.jpg',
    },
    {
      id: 'SM-F721N',
      name: '가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나',
      networkType: '5g',
      image:
        'https://image.lguplus.com/static/pc-contents/images/prdv/20220812-021216-097-IrwyS2Zu.jpg',
    },
  ],
};

function SearchBar() {
  const lenValidator = (value) => value.length <= 30;

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchNetworkType, setSearchNetworkType] = useState(null);
  const [recentSearchTerm, setRecentSearchTerm] = useState(
    JSON.parse(localStorage.getItem('recent_search_terms') || []),
  );
  const [relatedSearchTerm, setRelatedSearchTerm] = useState({ results: [] });
  const [selectedRelatedTerm, setSelectedRelatedSearchTerm] = useState(null);
  const navigate = useNavigate();
  const [searchResult, onChange, setSearchResult] = useInput('', lenValidator);

  useEffect(() => {
    getRelatedSearchTerm();
  }, []);

  // axios 요청을 통해 관련 검색어를 받아옴.
  const getRelatedSearchTerm = () => {
    setRelatedSearchTerm(tempRelatedSearchTerm);
  };

  // 검색시 호출되는 함수
  const handleSearch = (event, searchTerm) => {
    // 클릭해서 검색한 경우 && 검색어를 입력해서 검색한 경우
    if (!(!!searchTerm || !!searchResult)) return;
    let searchParams = { searchResult: searchTerm || searchResult };
    if (!!searchNetworkType) {
      searchParams = { ...searchParams, 'network-type': searchNetworkType };
    }
    if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
      event.currentTarget.blur();
      navigate({
        pathname: 'search/result',
        search: createSearchParams(searchParams).toString(),
      });
      saveRecentSearch(searchTerm || searchResult);
      resetSearchBar();
    }
  };

  // 검색창 초기화
  const resetSearchBar = () => {
    setSearchResult('');
    setAnchorEl(null);
  };

  // 카테고리 토글버튼 클릭 시 실행되는 함수
  const handleSearchNetworkType = (event, networkType) => {
    setSearchNetworkType(networkType);
  };

  const handleDetailClick = (device) => {
    navigate(`/${device.networkType === '5g' ? '5g-phone' : '4g-phone'}/${device.id}`);
    resetSearchBar();
  };
  // 최근 검색한 검색어 저장하는 함수
  const saveRecentSearch = (searchTerm) => {
    if (!!!searchTerm) return;
    const currentRecentSearchTerms = JSON.parse(localStorage.getItem('recent_search_terms')) || [];
    const newRecnetSearchTerms = [searchTerm, ...currentRecentSearchTerms].slice(0, 5);
    localStorage.setItem('recent_search_terms', JSON.stringify(newRecnetSearchTerms.slice(0, 5)));
    setRecentSearchTerm(newRecnetSearchTerms.slice(0, 5));
  };

  // 최근 검색한 검색어 지우는 함수
  const deleteRecentSearch = (idx) => {
    const currentRecentSearchTerms = JSON.parse(localStorage.getItem('recent_search_terms')) || [];
    currentRecentSearchTerms.splice(idx, 1);
    localStorage.setItem('recent_search_terms', JSON.stringify([...currentRecentSearchTerms]));
    setRecentSearchTerm([...currentRecentSearchTerms]);
  };

  // 특정 검색어 하이라이팅 기능
  const HightlightSearchTerm = (text, query) => {
    if (query === '') return text;
    const initial = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {initial.map((normal, idx) =>
          normal.toLowerCase() === query.toLowerCase() ? (
            <>
              <HighlightRelatedSearchTerm key={`highlight-related-search-term-${idx}`}>
                {normal}
              </HighlightRelatedSearchTerm>
            </>
          ) : (
            <>{normal}</>
          ),
        )}
      </>
    );
  };

  return (
    <SearchBarBlock>
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <div>
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
            <SearchMenu elevation={3}>
              <SearchSubMenuWrapper>
                <div>카테고리</div>
                <Divider />
                <NetworkTypeToggleButtonGroup
                  exclusive
                  value={searchNetworkType}
                  onChange={handleSearchNetworkType}>
                  <ToggleButton value="5G" aria-label="centered" size="small">
                    5G 휴대폰
                  </ToggleButton>
                  <ToggleButton value="4G" aria-label="right aligned" size="small">
                    4G 휴대폰
                  </ToggleButton>
                </NetworkTypeToggleButtonGroup>
              </SearchSubMenuWrapper>
              <SearchSubMenuWrapper>
                <div>최근검색어</div>
                <Divider />
                {!!recentSearchTerm.length ? (
                  recentSearchTerm?.map((term, idx) => {
                    return (
                      <RecentSearchTerm
                        key={`recent-search-term-${idx}`}
                        label={term}
                        onClick={(event) => {
                          deleteRecentSearch(idx);
                          handleSearch(event, term);
                        }}
                        onDelete={() => {
                          deleteRecentSearch(idx);
                        }}
                        deleteIcon={<Clear />}
                      />
                    );
                  })
                ) : (
                  <EmptyRecentSearchTerm>최근 검색어가 없습니다.</EmptyRecentSearchTerm>
                )}
              </SearchSubMenuWrapper>
              <SearchSubMenuWrapper>
                <div>연관검색어</div>
                <Divider />
                <RelatedSearchTermWrapper>
                  <div>
                    {relatedSearchTerm?.results?.map((result, idx) => {
                      return (
                        <RelatedSearchTerm
                          onClick={(event) => {
                            handleSearch(event, result.name);
                          }}
                          onMouseEnter={() => {
                            setSelectedRelatedSearchTerm(result);
                          }}
                          key={`related-search-term-${idx}`}>
                          {HightlightSearchTerm(result.name, searchResult)}
                        </RelatedSearchTerm>
                      );
                    })}
                  </div>
                  {!!selectedRelatedTerm && (
                    <RelatedSearchTermImage>
                      <img width={200} src={selectedRelatedTerm.image} alt="연관검색어 이미지" />
                      <Tooltip title="상세페이지로 이동하기">
                        <span
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            handleDetailClick(selectedRelatedTerm);
                          }}>
                          [상세보기]
                        </span>
                      </Tooltip>
                    </RelatedSearchTermImage>
                  )}
                </RelatedSearchTermWrapper>
              </SearchSubMenuWrapper>
            </SearchMenu>
          </Popper>
        </div>
      </ClickAwayListener>
    </SearchBarBlock>
  );
}

export default SearchBar;
