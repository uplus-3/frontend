import { createTheme } from '@mui/material';

const palette = {
  prime: '#E6007E',
  dark: '#2B2926',
  bg: '#FFFFFF',
  gray1: '#F8F8F8',
  gray2: '#EEEEEE',
  gray3: '#D0D0D0',
  gray4: '#F2F2F2',
};

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          width: '100%',
          height: '100%',
        },
        body: {
          fontFamily: [
            'LGSmart',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Oxygen',
            'Ubuntu',
            'Cantarell',
            'Fira Sans',
            'Droid Sans',
            'Helvetica Neue',
            ' sans-serif',
          ].join(','),
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      },
    },
  },
  palette: {
    prime: palette.prime,
    dark: palette.dark,
    bg: palette.bg,
    gray1: palette.gray1,
    gray2: palette.gray2,
    gray3: palette.gray3,
    gray4: palette.gray4,
  },
  typography: {
    fontFamily: [
      'LGSmart',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      ' sans-serif',
    ].join(','),
  },
});
