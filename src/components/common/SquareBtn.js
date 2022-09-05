import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

/**
 * 담당자 : 성아영
 */
const SquareBtnBlock = styled('div')({});
const CustomButton = styled(Button)(({ theme }) => ({
  fontFamily: 'LGSmart',
  color: '#000',
  fontSize: 14,
  height: 'auto',
  borderRadius: 10,
  border: `1px solid ${theme.palette.gray3}`,
  padding: '4px 20px 4px 20px',
  background: 'transparent',
  '&:hover': {
    background: theme.palette.prime + '0a',
  },
}));
function SquareBtn({
  content,
  backgroundColor = '',
  border = '',
  color = '',
  disabled = false,
  width = '',
  height = '',
  padding = '',
  children,
  onClick,
}) {
  return (
    <CustomButton
      disableRipple
      sx={{
        backgroundColor: backgroundColor,
        color: color,
        width: width,
        border: border,
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
  );
}

SquareBtnBlock.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  border: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
};

export default SquareBtn;
