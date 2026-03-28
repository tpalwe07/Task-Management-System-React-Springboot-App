import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Project from './pages/Project/ProjectPage';

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Project />} />
      {/* Add more routes here as needed */}
    </Route>
  </Routes>
);

AppRoutes.displayName = 'AppRoutes';

export default AppRoutes;
