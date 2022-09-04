import React, { useEffect } from 'react';
import { styled } from '@mui/system';

import { Dialog } from '@mui/material';
import DaumPostcodeEmbed from 'react-daum-postcode';

const DaumPostCodeModalBlock = styled(Dialog)({});
function DaumPostCodeModal({ open, setOpen, setAddress }) {
  const handleComplete = ({ zonecode, address }) => {
    setAddress(`(${zonecode}) ${address}`);
    setOpen(false);
  };
  return (
    <DaumPostCodeModalBlock open={open} onClose={() => setOpen(false)}>
      <DaumPostcodeEmbed
        style={{ width: 500, height: 600 }}
        onComplete={handleComplete}
        isDaumPost={open}
        autoClose
      />
    </DaumPostCodeModalBlock>
  );
}

export default DaumPostCodeModal;
