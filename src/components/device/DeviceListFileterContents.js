export const SORT_TYPE = [
  {
    name: '출시순',
    value: 'launch',
  },
  {
    name: '실구매가순',
    value: 'purchase',
  },
  {
    name: '정상가순',
    value: 'price',
  },
];

export const FILTER_DATA = {
  plan_type: {
    name: 'plan',
  },
  discount_type: {
    name: 'discount',
    data: [
      {
        name: '추천',
        value: -1,
      },
      {
        name: '공시지원금',
        value: 0,
      },
      {
        name: '선택약정24개월',
        value: 1,
      },
    ],
  },
  company_type: {
    name: 'company',
    data: [
      {
        name: '전체',
        value: 'all',
      },
      {
        name: '삼성',
        value: '삼성',
      },
      {
        name: '애플',
        value: '애플',
      },
      {
        name: '기타',
        value: 'etc',
      },
    ],
  },
  storage_type: {
    name: 'storage',
    data: [
      {
        name: '전체',
        value: 'all',
      },
      {
        name: '1TB',
        value: '1TB',
      },
      {
        name: '512GB 이상',
        value: '512GB',
      },
      {
        name: '256GB',
        value: '256GB',
      },
    ],
  },
  price_range: {
    name: 'price',
    config: {
      MIN: 0,
      MAX: 200000,
      STEP: 1000,
    },
  },
};
