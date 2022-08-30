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
        value: '-1',
      },
      {
        name: '공시지원금',
        value: '0',
      },
      {
        name: '선택약정24개월',
        value: '1',
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
        value: 'samsung',
      },
      {
        name: '애플',
        value: 'apple',
      },
      {
        name: '기타',
        value: 'others',
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
        value: '1tb',
      },
      {
        name: '512GB 이상',
        value: '512gb',
      },
      {
        name: '256GB',
        value: '256gb',
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
