import React, { useCallback, useState } from 'react';
import { styled } from '@mui/system';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const DeviceCompareInfoBlock = styled('div')({});

const StyledAccordion = styled(Accordion)({});

const StyledAccordionSummary = styled(AccordionSummary)({
  padding: '0 20px',

  '& .MuiAccordionSummary-expandIconWrapper svg': {
    fontSize: 35,
  },
});

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  background: theme.palette.gray1,
  padding: 20,
  display: 'flex',
  gap: 10,
  boxShadow: 'inset 0px 3px 5px 0px #bbbbbb',
}));

const DetailWapper = styled('div')({
  background: '#fff',
  width: '100%',
});

function DeviceCompareInfo({ title, children }) {
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <DeviceCompareInfoBlock>
      <Accordion expanded={expanded === 0} onChange={handleChange(0)}>
        <StyledAccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontSize: 24, fontWeight: 600 }}>{title}</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <DetailWapper></DetailWapper>
          <DetailWapper>여기는 비교할 곳</DetailWapper>
          <DetailWapper>여기는 비교할 곳</DetailWapper>
        </StyledAccordionDetails>
      </Accordion>
    </DeviceCompareInfoBlock>
  );
}

export default DeviceCompareInfo;
