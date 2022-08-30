import React, { useCallback, useState } from 'react';
import DeviceCompareItem from './DeviceCompareItem';
import RoundBtn from '../../common/RoundBtn';
import classnames from 'classnames';

import { styled } from '@mui/system';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import DeviceCompareModal from '../../modal/DeviceCompareModal';

const DeviceCompareTabBlock = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  width: 1440,
  height: 200,
  border: `1px solid ${theme.palette.dark}`,
  borderBottom: 'none',
  boxShadow: '0 -3px 10px rgb(0 0 0 / 20%)',
  background: '#fff',

  transform: 'translateY(140px)',
  transition: 'transform 0.5s',
  '&.active': {
    transform: 'translateY(0px)',
  },
}));

const HeaderWapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.dark,
  height: 62,
  '& span': {
    padding: '0 32px',
    color: '#fff',
    fontSize: 20,
  },
}));

const OpenIcon = styled('span')({
  '& svg': {
    fontSize: 40,
    verticalAlign: 'middle',
    cursor: 'pointer',
  },
});

const BodyWapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 80,
  padding: '17px 30px 17px 30px',
});

const DeviceWapper = styled('ul')({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 20,
  width: '100%',
  height: 105,

  '& > li': {
    width: '100%',
  },
});

const CompareButtonWapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 15,
});
const ResetButton = styled('div')({
  textDecoration: 'underline',
  cursor: 'pointer',
});

function DeviceCompareTab() {
  const [open, setOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const handleClickOpen = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <DeviceCompareTabBlock className={classnames({ active: open })}>
      <HeaderWapper>
        <span>비교하기(1)</span>
        <OpenIcon onClick={handleClickOpen}>{open ? <ExpandMore /> : <ExpandLess />}</OpenIcon>
      </HeaderWapper>
      <BodyWapper>
        <DeviceWapper>
          <li>
            <DeviceCompareItem data={true} />
          </li>
          <li>
            <DeviceCompareItem />
          </li>
          <li>
            <DeviceCompareItem />
          </li>
        </DeviceWapper>
        <CompareButtonWapper>
          <RoundBtn
            content="비교하기"
            width="120px"
            height="fit-content"
            padding="5px 0"
            onClick={() => setModalOpen(true)}
          />
          <ResetButton>전체삭제</ResetButton>
        </CompareButtonWapper>
      </BodyWapper>
      <DeviceCompareModal open={modalOpen} setOpen={setModalOpen} />
    </DeviceCompareTabBlock>
  );
}

export default DeviceCompareTab;
