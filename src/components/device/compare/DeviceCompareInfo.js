import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDevicePrice } from '../../../lib/api/device';
import { devicesActions } from '../../../modules/actions/devicesSlice';

import { styled } from '@mui/system';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { ExpandMore } from '@mui/icons-material';

import DeviceCompareInfoPrice from './DeviceCompareInfoPrice';
import DeviceCompareInfoPlan from './DeviceCompareInfoPlan';
import DeviceCompareInfoSpec from './DeviceCompareInfoSpec';

/**
 * 담당자 : 김수현
 */
const DeviceCompareInfoBlock = styled('div')({});

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

function DeviceCompareInfo({ devices }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState([0]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? [...expanded, panel] : expanded.filter((e) => e === panel));
  };

  const handleChangePriceFilter = useCallback(
    async (deviceId, planId, discountType, installmentPeriod) => {
      try {
        const res = await getDevicePrice({
          deviceId,
          discountType,
          installmentPeriod,
          planId,
        });
        dispatch(
          devicesActions.updateComparisonDevicePrice({
            deviceId,
            price: res.data,
          }),
        );
      } catch (e) {}
    },
    [dispatch],
  );

  return (
    <DeviceCompareInfoBlock>
      <Accordion expanded={expanded.includes[0]} onChange={handleChange(0)}>
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
      <Accordion expanded={expanded.includes[1]} onChange={handleChange(1)}>
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
      <Accordion expanded={expanded.includes[2]} onChange={handleChange(2)}>
        <StyledAccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontSize: 24, fontWeight: 600 }}>기기 성능</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          {[...devices, ...Array(3).fill(null)].slice(0, 3).map((data, index) => (
            <DetailWrapper key={`${index}-${data?.id}`}>
              <DeviceCompareInfoSpec device={data} />
            </DetailWrapper>
          ))}
        </StyledAccordionDetails>
      </Accordion>
    </DeviceCompareInfoBlock>
  );
}

export default DeviceCompareInfo;
