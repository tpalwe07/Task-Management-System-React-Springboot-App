import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './layout/Layout';
import Loader from './components/Loader';

const Project = lazy(() => import('./pages/Project/ProjectPage'));
const ProjectDetailsPage = lazy(() => import('./pages/Project/ProjectDetailsPage'));

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route
        path='/projects'
        element={
          <Suspense fallback={<Loader height='60vh' />}>
            <Project />
          </Suspense>
        }
      />
      <Route
        path='/projects/:id'
        element={
          <Suspense fallback={<Loader height='60vh' />}>
            <ProjectDetailsPage />
          </Suspense>
        }
      />
      {/* Add more routes here as needed */}
    </Route>
  </Routes>
);

AppRoutes.displayName = 'AppRoutes';

export default AppRoutes;
