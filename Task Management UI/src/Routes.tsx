import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Project from './pages/Project/ProjectPage';
import ProjectDetailsPage from './pages/Project/ProjectDetailsPage';

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route path='/projects' element={<Project />} />
      <Route path='/projects/:id' element={<ProjectDetailsPage />} />
      {/* Add more routes here as needed */}
    </Route>
  </Routes>
);

AppRoutes.displayName = 'AppRoutes';

export default AppRoutes;
