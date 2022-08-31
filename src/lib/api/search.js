import client from './client';

export const getSearchRelatedKeyword = ({ query, networkType }) => {
  return client({
    url: '/search/keyword',
    method: 'get',
    params: {
      'network-type': networkType || 0,
      q: query,
    },
  });
};

export const getSearchResult = ({ query, networkType }) => {
  return client({
    url: '/search',
    method: 'get',
    params: {
      'network-type': networkType || 0,
      q: query,
    },
  });
};
