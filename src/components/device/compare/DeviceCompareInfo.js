import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDevicePrice } from '../../../lib/api/device';
import { devicesActions } from '../../../modules/actions/devicesSlice';

import { styled } from '@mui/system';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import DeviceCompareInfoPrice from './DeviceCompareInfoPrice';
import DeviceCompareInfoPlan from './DeviceCompareInfoPlan';
import DeviceCompareInfoSpec from './DeviceCompareInfoSpec';

const DeviceCompareInfoBlock = styled('div')({});

const StyledAccordion = styled(Accordion)({});

const StyledAccordionSummary = styled(AccordionSummary)({
  padding: '0 20px',

  '& .MuiAccordionSummary-expandIconWrapper svg': {
    fontSize: 35,
  },
});

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  background: theme.palette.gray4,
  padding: 20,
  display: 'flex',
  gap: 10,
  boxShadow: 'inset 0px 3px 5px 0px #bbbbbb',
}));

const DetailWrapper = styled('div')({
  width: '100%',
});

// TODO - expanded 다 되도록 수정
function DeviceCompareInfo({ devices }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangePriceFilter = async (deviceId, planId, discountType, installmentPeriod) => {
    // 요금제, 할인유형이 바뀐것을 감지
    // 요금제, 할인유형, 할부개월에 따른 가격 정보를 가져온다
    // redux에서 index의 정보에 덮어쓴다.

    try {
      const res = await getDevicePrice({
        deviceId,
        discountType,
        installmentPeriod,
        planId,
      });
      console.log(res.data);
      dispatch(
        devicesActions.updateComparisonDevicePrice({
          deviceId,
          price: res.data,
        }),
      );
    } catch (e) {}
  };

  return (
    <DeviceCompareInfoBlock>
      <Accordion expanded={expanded === 0} onChange={handleChange(0)}>
        <StyledAccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontSize: 24, fontWeight: 600 }}>월 납부금액</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          {[...devices, ...Array(3).fill(null)].slice(0, 3).map((data, index) => (
            <DetailWrapper key={`${index}-${data?.id}`}>
              <DeviceCompareInfoPrice device={data} />
            </DetailWrapper>
          ))}
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 1} onChange={handleChange(1)}>
        <StyledAccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontSize: 24, fontWeight: 600 }}>할인유형, 요금제</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          {[...devices, ...Array(3).fill(null)].slice(0, 3).map((data, index) => (
            <DetailWrapper key={`${index}-${data?.id}`}>
              <DeviceCompareInfoPlan
                index={index}
                device={data}
                onChangePriceFilter={handleChangePriceFilter}
              />
            </DetailWrapper>
          ))}
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 2} onChange={handleChange(2)}>
        <StyledAccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontSize: 24, fontWeight: 600 }}>기기 성능</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <DetailWrapper>
            <DeviceCompareInfoSpec />
          </DetailWrapper>
          <DetailWrapper>
            <DeviceCompareInfoSpec />
          </DetailWrapper>
          <DetailWrapper>
            <DeviceCompareInfoSpec />
          </DetailWrapper>
        </StyledAccordionDetails>
      </Accordion>
    </DeviceCompareInfoBlock>
  );
}

export default DeviceCompareInfo;
