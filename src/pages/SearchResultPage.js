import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import DeviceSearchList from '../components/device/search/DeviceSearchList';
import { useSearchParams } from 'react-router-dom';
import { getSearchResult } from '../lib/api/search';
import { Box, Tab, Tabs } from '@mui/material';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get('searchResult');
  const networkType = searchParams.get('network-type');
  const [results, setResults] = useState([]);
  useEffect(() => {
    getResults(searchParam);
  }, [searchParam]);

  const getResults = async (searchParam) => {
    try {
      const res = await getSearchResult({ query: searchParam });
      setResults(res.data.searchList);
    } catch (e) {
      console.log('error');
    }
  };

  console.log(props);

  return (
    <div>
      <Title>
        <Query>"{searchParam}"</Query> 검색결과
      </Title>
      <Box sx={{ padding: '20px 0' }}>
        <StyledTabs value="mobile">
          <Tab value="mobile" label={networkType === null ? '전체' : networkType + 'G'} />
        </StyledTabs>
      </Box>
      <CountTab>전체 3개</CountTab>
      <DeviceSearchList results={results} />
    </div>
  );
}

export default SearchResultPage;
