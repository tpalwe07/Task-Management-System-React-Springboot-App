import { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from './Routes';
import AppStoreProvider from './contexts/appStore/store';
import ToastContainer from './components/ToastContainer/ToastContainer';
import { getTheme } from './theme/theme';
import { useTheme } from './hooks/useTheme';

const ThemedApp = () => {
  const { mode } = useTheme();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

ThemedApp.displayName = 'ThemedApp';

const App = () => {
  return (
    <AppStoreProvider>
      <ThemedApp />
    </AppStoreProvider>
  );
};

App.displayName = 'App';

export default App;
