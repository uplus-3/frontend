import React from 'react';
import { styled } from '@mui/system';

import { Dialog } from '@mui/material';
import DaumPostcodeEmbed from 'react-daum-postcode';

/**
 * 담당자 : 성아영
 */
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
