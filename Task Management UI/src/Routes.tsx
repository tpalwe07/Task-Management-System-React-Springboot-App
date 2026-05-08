import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './layout/Layout';
import Loader from './components/Loader';
import TaskPage from './pages/Task/TaskPage';
import PrivateRoute from './routes/PrivateRoute';
import LoginPage from './pages/Login/LoginPage';
import { isAuthenticated } from './services/auth';
import NotFoundPage from './pages/NotFound/NotFoundPage';

const Project = lazy(() => import('./pages/Project/ProjectPage'));
const ProjectDetailsPage = lazy(() => import('./pages/Project/ProjectDetailsPage'));

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Outlet />}>
      {/* Redirect root based on auth */}
      <Route index element={<Navigate to={isAuthenticated() ? '/projects' : '/login'} replace />} />
      <Route path='login' element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route
            path='projects'
            element={
              <Suspense fallback={<Loader height='60vh' />}>
                <Project />
              </Suspense>
            }
          />
          <Route
            path='projects/:id'
            element={
              <Suspense fallback={<Loader height='60vh' />}>
                <ProjectDetailsPage />
              </Suspense>
            }
          />
          <Route
            path='tasks'
            element={
              <Suspense fallback={<Loader height='60vh' />}>
                <TaskPage />
              </Suspense>
            }
          />
          {/* Add more routes here as needed */}
        </Route>
      </Route>
      <Route
        path='*'
        element={isAuthenticated() ? <NotFoundPage /> : <Navigate to='/login' replace />}
      />
    </Route>
  </Routes>
);

AppRoutes.displayName = 'AppRoutes';

export default AppRoutes;
