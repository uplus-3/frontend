import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeviceSearchList from '../components/device/search/DeviceSearchList';
import { useSearchParams } from 'react-router-dom';
import { getSearchResult } from '../lib/api/search';
import { Box, Tab, Tabs } from '@mui/material';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import { loadingActions } from '../modules/actions/loadingSlice';
import { errorActions } from '../modules/actions/errorSlice';
import { Helmet } from 'react-helmet-async';

/**
 * 담당자 : 이일환
 */
const SearchResultPageWrapper = styled('div')({});

const StatusWrapper = styled('div')({
  textAlign: 'center',
});

const Title = styled('h1')({
  paddingTop: 30,
  paddingBottom: 10,
  fontWeight: 'normal',
  fontSize: 40,
});

const Query = styled('span')({
  fontWeight: 600,
});

const CountTab = styled('div')({
  marginBottom: 20,
  color: 'gray',
});

const EmptyResultWrapper = styled('div')({
  textAlign: 'center',
});

const EmptyResultTop = styled('div')({
  padding: 40,
  fontSize: 40,
});

const Highlight = styled('span')(({ theme }) => ({
  color: theme.palette.prime,
  fontWeight: 600,
}));

const EmptyResultBottom = styled('div')({
  fontSize: 24,
  color: '#8A8A8A',
});

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.gray3}`,

  '& .MuiTabs-indicator': {
    background: theme.palette.prime,
  },
  '& .MuiTab-root.Mui-selected': {
    color: theme.palette.prime,
    fontSize: 24,
    fontWeight: 600,
  },
}));

function SearchResultPage(props) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get('searchResult');
  const networkType = searchParams.get('network-type');
  const [results, setResults] = useState(null);
  const { loading, error } = useSelector(({ loading, error }) => ({
    loading: loading['searchresult'],
    error: error['searchresult'],
  }));

  useEffect(() => {
    getResults(searchParam);
  }, [searchParam, networkType]);

  const getResults = async (searchParam) => {
    try {
      dispatch(loadingActions.startLoading('searchresult'));
      dispatch(errorActions.initError('searchresult'));
      const res = await getSearchResult({ query: searchParam, networkType: networkType });
      setResults(res.data.searchList);
    } catch (e) {
      dispatch(errorActions.setError('searchresult'));
    } finally {
      dispatch(loadingActions.finishLoading('searchresult'));
    }
    console.log(loading);
  };

  console.log(props);

  return (
    <SearchResultPageWrapper>
      <Helmet>
        <title> 검색결과 | 엘지유플 최강 3조</title>
      </Helmet>
      <Title>
        <Query>
          "<Highlight>{searchParam}</Highlight>"
        </Query>{' '}
        검색결과
      </Title>
      <Box sx={{ padding: '20px 0' }}>
        <StyledTabs value="mobile">
          <Tab value="mobile" label={networkType === null ? '전체' : networkType + 'G'} />
        </StyledTabs>
      </Box>
      {error ? (
        <StatusWrapper>
          <Error message="상품을 불러올 수 없습니다." />
        </StatusWrapper>
      ) : loading ? (
        <StatusWrapper>
          <Loading className="loading" />
        </StatusWrapper>
      ) : (
        <div>
          {results && results.length > 0 ? (
            <CountTab>전체 {results.length}개</CountTab>
          ) : (
            <EmptyResultWrapper>
              {results && (
                <div>
                  <EmptyResultTop>검색 결과가 없습니다.</EmptyResultTop>
                  <EmptyResultBottom>
                    <div>단어의 철자 및 띄어쓰기가 정확한지 확인해 보세요.</div>
                    <div>한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.</div>
                  </EmptyResultBottom>
                </div>
              )}
            </EmptyResultWrapper>
          )}
          {results !== null && <DeviceSearchList results={results} />}
        </div>
      )}
    </SearchResultPageWrapper>
  );
}

export default SearchResultPage;
