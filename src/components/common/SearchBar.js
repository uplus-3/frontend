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
import { Search, Clear, Work } from '@mui/icons-material';
import { useNavigate, createSearchParams } from 'react-router-dom';
import useInput from '../../lib/hooks/useInput';
import { getSearchRelatedKeyword } from '../../lib/api/search';

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
  width: 700,
  minHeight: 500,
  padding: 10,
  boxShadow: '0px 4px 5px 0px rgb(0 0 0 / 12%)',
  ':first-of-type': {
    fontSize: '0.8rem',
  },
}));

const SearchSubMenuWrapper = styled('div')(({ theme }) => ({
  marginBottom: 25,
  minHeight: 220,
  width: 320,
}));

const SearchCategoryWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 25,
}));

const SearchMenuWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
});

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

const RelatecSearchImage = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  padding: 10,
  width: 210,
  cursor: 'pointer',
  border: `1px solid ${theme.palette.gray2}`,
}));

const RelatedSearchImageWrapper = styled('div')({
  paddingTop: 20,
  display: 'flex',
  gap: 20,

  justifyContent: 'center',
});

const HighlightRelatedSearchTerm = styled('span')(({ theme }) => ({
  color: theme.palette.prime,
  fontWeight: 600,
}));

const EmptyRecentSearchTerm = styled('div')(({ theme }) => ({
  textAlign: 'center',
  margin: 30,
  color: theme.palette.gray3,
}));

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
          <span key={`highlight-related-search-term-${idx}`}>{normal}</span>
        ),
      )}
    </>
  );
};

function SearchBar() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchNetworkType, setSearchNetworkType] = useState(null);
  const [recentSearchTerm, setRecentSearchTerm] = useState(
    JSON.parse(localStorage.getItem('recent_search_terms')) || [],
  );
  const [relatedSearchTerm, setRelatedSearchTerm] = useState([]);

  const [searchResult, setSearchResult] = useState('');

  // axios 요청을 통해 관련 검색어를 받아옴.
  const getRelatedSearchTerm = async (term) => {
    try {
      const res = await getSearchRelatedKeyword({
        query: term,
        networkType: searchNetworkType || 0,
      });
      setRelatedSearchTerm(res.data.searchKeywordList || []);
    } catch (e) {}
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
    setRelatedSearchTerm([]);
    setAnchorEl(null);
  };

  const handleChangeSearchResult = (event) => {
    const {
      target: { value },
    } = event;

    const newSearchResult = value.replace(/ +/g, ' ');
    if (newSearchResult.length > 30) return;

    setSearchResult(newSearchResult);
  };

  // 카테고리 토글버튼 클릭 시 실행되는 함수
  const handleSearchNetworkType = (event, networkType) => {
    setSearchNetworkType(networkType);
  };

  // 상세페이지로 이동하는 버튼
  const handleDetailClick = (device) => {
    navigate(
      `/${device.networkType === '5g' ? '5g-phone' : '4g-phone'}/${device.serialNumber}?id=${
        device.id
      }`,
    );
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

  useEffect(() => {
    if (!!!anchorEl && !!!relatedSearchTerm.length) return;
    getRelatedSearchTerm(searchResult);
  }, [searchNetworkType, anchorEl]);

  useEffect(() => {
    if (!!anchorEl && !!searchResult) {
      getRelatedSearchTerm(searchResult);
    } else if (!!anchorEl && !!!searchResult) {
      setRelatedSearchTerm([]);
    }
  }, [searchResult]);
  return (
    <SearchBarBlock>
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <div>
          <SearchInput
            onFocus={(event) => setAnchorEl(event.currentTarget)}
            placeholder="갤럭시 Z Fold4"
            value={searchResult}
            onChange={handleChangeSearchResult}
            onKeyDown={handleSearch}
          />
          <IconButton onClick={handleSearch}>
            <Search />
          </IconButton>
          <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} disablePortal>
            <SearchMenu elevation={3}>
              <SearchCategoryWrapper>
                <div>카테고리</div>
                <NetworkTypeToggleButtonGroup
                  exclusive
                  value={searchNetworkType}
                  onChange={handleSearchNetworkType}>
                  <ToggleButton value="5" aria-label="centered" size="small">
                    5G 휴대폰
                  </ToggleButton>
                  <ToggleButton value="4" aria-label="right aligned" size="small">
                    4G 휴대폰
                  </ToggleButton>
                </NetworkTypeToggleButtonGroup>
              </SearchCategoryWrapper>
              <SearchMenuWrapper>
                <SearchSubMenuWrapper>
                  <Divider>최근검색어</Divider>
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
                  <Divider>연관검색어</Divider>
                  <RelatedSearchTermWrapper>
                    <div>
                      {relatedSearchTerm?.map((result, idx) => {
                        return (
                          <RelatedSearchTerm
                            onClick={(event) => {
                              handleSearch(event, result.name);
                            }}
                            key={`related-search-term-${idx}`}>
                            {HightlightSearchTerm(result.name, searchResult)}
                          </RelatedSearchTerm>
                        );
                      })}
                    </div>
                  </RelatedSearchTermWrapper>
                </SearchSubMenuWrapper>
              </SearchMenuWrapper>
              <Divider>연관상품</Divider>
              <RelatedSearchImageWrapper>
                {relatedSearchTerm.slice(0, 3).map((result, idx) => (
                  <RelatecSearchImage
                    key={`related-search-image-${idx}`}
                    onClick={() => {
                      handleDetailClick(result);
                    }}>
                    <img width={150} src={result.imageUrl} alt="연관상품" />
                    <div>{HightlightSearchTerm(result.name, searchResult)}</div>
                  </RelatecSearchImage>
                ))}
              </RelatedSearchImageWrapper>
            </SearchMenu>
          </Popper>
        </div>
      </ClickAwayListener>
    </SearchBarBlock>
  );
}

export default SearchBar;
