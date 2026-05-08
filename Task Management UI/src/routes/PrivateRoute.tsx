import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
const PrivateRoute = () => {
  const location = useLocation();
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  );
};

PrivateRoute.displayName = 'PrivateRoute';

export default PrivateRoute;

