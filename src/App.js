import './App.css';
import Router from './router';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
