import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

const RoundBtnBlock = styled('div')({});
const CustomButton = styled(Button)(({ theme }) => ({
  fontFamily: 'LGSmart',
  color: '#FFF',
  fontSize: 14,
  borderRadius: 100,
  padding: '4px 20px 4px 20px',
  background: theme.palette.prime,
  '&:hover': {
    background: theme.palette.prime + '90',
  },
}));
function RoundBtn({
  content,
  backgroundColor = '',
  color = '',
  disabled = false,
  width = '',
  height = '',
  padding = '',
  children,
  onClick,
}) {
  return (
    <RoundBtnBlock>
      <CustomButton
        sx={{
          backgroundColor: backgroundColor,
          color: color,
          width: width,
          padding: padding,
          minWidth: 'fit-content',
          height: height,
          '&:hover': {
            backgroundColor: backgroundColor + '90',
          },
        }}
        disabled={disabled}
        onClick={onClick}>
        {content}
        {children}
      </CustomButton>
    </RoundBtnBlock>
  );
}

RoundBtn.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
};

export default RoundBtn;
