import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Router from './router';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { planActions } from './modules/actions/planSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(planActions.getPlanList(5));
    dispatch(planActions.getPlanList(4));
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
