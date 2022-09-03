import React from 'react';
import { styled } from '@mui/system';
import { Dialog } from '@mui/material';
import { PriceFormatter } from '../../lib/utils';

const LaunchingDeviceDetailModalBlock = styled(Dialog)({
  '.MuiDialog-paper': {
    width: 500,
    padding: 20,
  },
});

const PriceCompareHeader = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  div: {
    fontWeight: 600,
    fontSize: '1.2rem',
  },
});

const SpecBlock = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  padding: 20,
  background: '#fff',

  '& dt': {
    fontWeight: 'bold',
  },
});

function LaunchingDeviceDetailModal({ open, setOpen, imgUrl, data }) {
  return (
    <LaunchingDeviceDetailModalBlock open={open} onClose={() => setOpen(false)} maxWidth="md">
      {imgUrl && (
        <PriceCompareHeader>
          <img width={160} src={imgUrl} alt="비교하기 이미지" />
          <div>{data?.name}</div>
        </PriceCompareHeader>
      )}
      <SpecBlock>
        <dl>
          <dt>출시가</dt>
          <dd>{PriceFormatter(data?.price)}원</dd>
        </dl>
        <dl>
          <dt>출시일</dt>
          <dd>{data?.launchedDate}</dd>
        </dl>
        <dl>
          <dt>색상</dt>
          <dd>{data?.launchingColors.map((c) => c.name).join(',')}</dd>
        </dl>
        <dl>
          <dt>용량</dt>
          <dd>{data?.storage}</dd>
        </dl>
        <dl>
          <dt>CPU</dt>
          <dd>{data?.cpu}</dd>
        </dl>
        <dl>
          <dt>디스플레이</dt>
          <dd>{data?.display}</dd>
        </dl>
      </SpecBlock>
    </LaunchingDeviceDetailModalBlock>
  );
}

export default LaunchingDeviceDetailModal;
