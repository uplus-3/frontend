import React, { useCallback, useState } from 'react';
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

const DetailWapper = styled('div')({
  width: '100%',
});

function DeviceCompareInfo() {
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <DeviceCompareInfoBlock>
      <Accordion expanded={expanded === 0} onChange={handleChange(0)}>
        <StyledAccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontSize: 24, fontWeight: 600 }}>월 납부금액</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <DetailWapper>
            <DeviceCompareInfoPrice />
          </DetailWapper>
          <DetailWapper>
            <DeviceCompareInfoPrice />
          </DetailWapper>
          <DetailWapper>
            <DeviceCompareInfoPrice />
          </DetailWapper>
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 1} onChange={handleChange(1)}>
        <StyledAccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontSize: 24, fontWeight: 600 }}>할인유형, 요금제</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <DetailWapper>
            <DeviceCompareInfoPlan />
          </DetailWapper>
          <DetailWapper>
            <DeviceCompareInfoPlan />
          </DetailWapper>
          <DetailWapper>
            <DeviceCompareInfoPlan />
          </DetailWapper>
        </StyledAccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 2} onChange={handleChange(2)}>
        <StyledAccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontSize: 24, fontWeight: 600 }}>기기 성능</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <DetailWapper>
            <DeviceCompareInfoSpec />
          </DetailWapper>
          <DetailWapper>
            <DeviceCompareInfoSpec />
          </DetailWapper>
          <DetailWapper>
            <DeviceCompareInfoSpec />
          </DetailWapper>
        </StyledAccordionDetails>
      </Accordion>
    </DeviceCompareInfoBlock>
  );
}

export default DeviceCompareInfo;
