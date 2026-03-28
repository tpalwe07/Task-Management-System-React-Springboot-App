import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from './Routes';
import AppStoreProvider from './contexts/appStore/store';
import ToastContainer from './components/ToastContainer/ToastContainer';
import { theme } from './theme/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppStoreProvider>
        <BrowserRouter>
          <AppRoutes />
          <ToastContainer />
        </BrowserRouter>
      </AppStoreProvider>
    </ThemeProvider>
  );
};

App.displayName = 'App';

export default App;
