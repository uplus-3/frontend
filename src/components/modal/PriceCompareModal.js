import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { PriceFormatter } from '../../lib/utils';
import {
  Dialog,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material';

const PriceCompareModalBlock = styled(Dialog)({
  '.MuiDialog-paper': {
    width: 960,
    height: 700,
  },
});

const PriceCompareHeader = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  div: {
    fontWeight: 600,
    fontSize: '1.5rem',
  },
});

const TableWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: 20,
});

const PlanDescription = styled('div')({
  display: 'flex',
  fontSize: '0.8rem',
  alignItems: 'center',
  padding: 5,
  span: {
    width: 70,
  },
});

const descendingComparator = (a, b, orderBy) => {
  let orderKey = 'psPrice';
  if (orderBy === 1) orderKey = 'sdPrice';

  if (b[orderKey] < a[orderKey]) {
    return -1;
  }
  if (b[orderKey] > a[orderKey]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

function PriceCompareModal({ open, setOpen, imgUrl, deviceId, name }) {
  const [plans, setPlans] = useState([]);
  const [orderBy, setOrderBy] = useState(0);
  const [isAsc, setIsAsc] = useState(true);
  const getPlans = () => {
    setPlans([
      {
        data: '무제한',
        id: 0,
        name: '5G 시그니처',
        psPrice: 134230,
        sdPrice: 120020,
        shareData: '60GB + 60GB',
        subData: '다 쓰면 최대 5Mbps',
        subVoiceCall: '부가통화 300분',
        voiceCall: '집/이동전화 무제한',
      },
      {
        data: '무제한',
        id: 0,
        name: '5G 프리미어 슈퍼',
        psPrice: 144230,
        sdPrice: 110020,
        shareData: '60GB + 60GB',
        subData: '다 쓰면 최대 5Mbps',
        subVoiceCall: '부가통화 300분',
        voiceCall: '집/이동전화 무제한',
      },
      {
        data: '무제한',
        id: 0,
        name: '5G 프리미어 플러스',
        psPrice: 154230,
        sdPrice: 100020,
        shareData: '60GB + 60GB',
        subData: '다 쓰면 최대 5Mbps',
        subVoiceCall: '부가통화 300분',
        voiceCall: '집/이동전화 무제한',
      },
      {
        data: '무제한',
        id: 0,
        name: '5G 프리미어 레귤러',
        psPrice: 184230,
        sdPrice: 190020,
        shareData: '60GB + 60GB',
        subData: '다 쓰면 최대 5Mbps',
        subVoiceCall: '부가통화 300분',
        voiceCall: '집/이동전화 무제한',
      },
      {
        data: '무제한',
        id: 0,
        name: '5G 프리미어 플러스',
        psPrice: 154230,
        sdPrice: 100020,
        shareData: '60GB + 60GB',
        subData: '다 쓰면 최대 5Mbps',
        subVoiceCall: '부가통화 300분',
        voiceCall: '집/이동전화 무제한',
      },
      {
        data: '무제한',
        id: 0,
        name: '5G 프리미어 레귤러',
        psPrice: 184230,
        sdPrice: 190020,
        shareData: '60GB + 60GB',
        subData: '다 쓰면 최대 5Mbps',
        subVoiceCall: '부가통화 300분',
        voiceCall: '집/이동전화 무제한',
      },
      {
        data: '무제한',
        id: 0,
        name: '5G 프리미어 플러스',
        psPrice: 154230,
        sdPrice: 100020,
        shareData: '60GB + 60GB',
        subData: '다 쓰면 최대 5Mbps',
        subVoiceCall: '부가통화 300분',
        voiceCall: '집/이동전화 무제한',
      },
      {
        data: '무제한',
        id: 0,
        name: '5G 프리미어 레귤러',
        psPrice: 184230,
        sdPrice: 190020,
        shareData: '60GB + 60GB',
        subData: '다 쓰면 최대 5Mbps',
        subVoiceCall: '부가통화 300분',
        voiceCall: '집/이동전화 무제한',
      },
      {
        data: '무제한',
        id: 0,
        name: '5G 프리미어 플러스',
        psPrice: 154230,
        sdPrice: 100020,
        shareData: '60GB + 60GB',
        subData: '다 쓰면 최대 5Mbps',
        subVoiceCall: '부가통화 300분',
        voiceCall: '집/이동전화 무제한',
      },
      {
        data: '무제한',
        id: 0,
        name: '5G 프리미어 레귤러',
        psPrice: 184230,
        sdPrice: 190020,
        shareData: '60GB + 60GB',
        subData: '다 쓰면 최대 5Mbps',
        subVoiceCall: '부가통화 300분',
        voiceCall: '집/이동전화 무제한',
      },
      {
        data: '무제한',
        id: 0,
        name: '5G 프리미어 플러스',
        psPrice: 154230,
        sdPrice: 100020,
        shareData: '60GB + 60GB',
        subData: '다 쓰면 최대 5Mbps',
        subVoiceCall: '부가통화 300분',
        voiceCall: '집/이동전화 무제한',
      },
    ]);
  };

  const handleSort = (orderKey, direction) => {
    setOrderBy(orderKey);
    setIsAsc(direction);
    setPlans((curPlans) => {
      const newPlans = [...curPlans];

      newPlans.sort(getComparator(direction ? 'asc' : 'desc', orderKey));
      return newPlans;
    });
  };

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <PriceCompareModalBlock open={open} onClose={() => setOpen(false)} maxWidth="md">
      {imgUrl && (
        <PriceCompareHeader>
          <img width={160} src={imgUrl} alt="비교하기 이미지" />
          <div>{name}</div>
        </PriceCompareHeader>
      )}
      <TableContainer>
        <TableWrapper>
          <Table sx={{ width: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>요금제</TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === 0}
                    direction={isAsc ? 'asc' : 'desc'}
                    onClick={() => handleSort(0, !isAsc)}>
                    공시지원금
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === 1}
                    direction={isAsc ? 'asc' : 'desc'}
                    onClick={() => handleSort(1, !isAsc)}>
                    선택약정
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans?.map((plan, idx) => (
                <TableRow
                  key={`${plan.name}-${idx}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <Tooltip
                    arrow
                    placement="left"
                    title={
                      <div>
                        <PlanDescription>
                          <span>데이터</span>
                          <div>{plan.data}</div>
                        </PlanDescription>
                        <PlanDescription>
                          <span>공유데이터</span>
                          <div>{plan.shareData}</div>
                        </PlanDescription>
                        <PlanDescription>
                          <span>음성통화</span>
                          <div>{plan.shareData}</div>
                        </PlanDescription>
                        <PlanDescription>
                          <span>공유데이터</span>
                          <div>{plan.shareData}</div>
                        </PlanDescription>
                      </div>
                    }>
                    <TableCell component="th" scope="row">
                      {plan.name}
                    </TableCell>
                  </Tooltip>
                  <TableCell align="center">{PriceFormatter(plan.psPrice)}원</TableCell>
                  <TableCell align="center">{PriceFormatter(plan.sdPrice)}원</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </TableContainer>
    </PriceCompareModalBlock>
  );
}

export default PriceCompareModal;
