import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useTheme } from '@mui/material';

const MySwal = withReactContent(Swal);

function useAlert() {
  const theme = useTheme();
  return MySwal.mixin({
    icon: 'warning',
    confirmButtonColor: theme.palette.prime,
    cancelButtonColor: theme.palette.gray3,
    color: '#000000',
    background: theme.palette.bg,
    confirmButtonText: '닫기',
    cancelButtonText: '취소',
  });
}

export default useAlert;
