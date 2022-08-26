import React from 'react';
import { styled } from '@mui/system';
import { Dialog } from '@mui/material';

const PriceCompareModalBlock = styled(Dialog)({});

function PriceCompareModal({ open, setOpen }) {
  return (
    <PriceCompareModalBlock open={open} onClose={() => setOpen(false)}>
      모달창
    </PriceCompareModalBlock>
  );
}

export default PriceCompareModal;
