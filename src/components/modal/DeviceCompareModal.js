import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

import { styled } from '@mui/system';
import { Dialog, DialogContent } from '@mui/material';
import { Close } from '@mui/icons-material';

import DeviceCompareItem from '../device/compare/DeviceCompareItem';
import DeviceCompareInfo from '../device/compare/DeviceCompareInfo';
import DeviceCompareItemSelector from '../device/compare/DeviceCompareItemSelector';
import { devicesActions } from '../../modules/actions/devicesSlice';

const DeviceCompareModalBlock = styled(Dialog)({
  '& .MuiDialogContent-root': {
    padding: 0,
  },
  '& .MuiDialog-container .MuiPaper-root': {
    width: '100%',
    maxWidth: 1280,
    borderRadius: 10,
  },
});

const HeaderWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '15px 20px',
  background: theme.palette.gray2,
}));

const HeaderTitle = styled('span')({
  fontSize: 20,
});

const HeaderCloseIcon = styled('span')({
  cursor: 'pointer',

  '& svg': {
    fontSize: 30,
    verticalAlign: 'middle',
  },
});

const BodyWrapper = styled(DialogContent)({
  height: 900,
});

const DeviceListWrapper = styled('ul')({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  background: '#fff',
  display: 'flex',
  gap: 10,
  width: '100%',
  height: 200,
  padding: 20,
  '&.shadow': {
    boxShadow: '0 4px 10px 2px #e9e9e9',
  },
  '& li': {
    width: '100%',
  },
});

function DeviceCompareModal({ open, setOpen }) {
  const dispatch = useDispatch();
  const [shadow, setShadow] = useState(false);
  const comparison = useSelector((state) => state.devices.comparison);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onScroll = (e) => {
    const { scrollTop } = e.target;
    if (scrollTop > 0) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  const handleClickRemove = useCallback((id) => {
    dispatch(devicesActions.removeComparison(id));
  }, []);

  return (
    <DeviceCompareModalBlock open={open} onClose={handleClose} z>
      <HeaderWrapper>
        <HeaderTitle>비교결과</HeaderTitle>
        <HeaderCloseIcon onClick={handleClose}>
          <Close />
        </HeaderCloseIcon>
      </HeaderWrapper>
      <BodyWrapper onScroll={onScroll} dividers={true}>
        <DeviceListWrapper className={classnames({ shadow })}>
          {[...comparison, ...Array(3).fill(null)].slice(0, 3).map((data, index) => (
            <li key={`${index}-${data?.id}`}>
              <DeviceCompareItem device={data} isLink={!!data} onClickRemove={handleClickRemove} />
            </li>
          ))}
        </DeviceListWrapper>
        <DeviceCompareInfo devices={comparison}></DeviceCompareInfo>
      </BodyWrapper>
    </DeviceCompareModalBlock>
  );
}

export default DeviceCompareModal;
