import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

App.displayName = 'App';

export default App;
