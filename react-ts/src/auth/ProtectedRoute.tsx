import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContex';
import { hasAllowedRole } from './roleHelper';

type Props = {
  allowedRoles: number[];
};

const PrivateRoute = ({ allowedRoles }: Props) => {
  const auth = useContext(AuthContext);

  // Not authenticated
  if (!auth || !auth.isAuthenticated || !auth.user) {
    return <Navigate to='/login' replace />;
  }

  const roleId = auth.user.roleId ?? null;

  // No role found
  if (!roleId) {
    return <Navigate to='/login' replace />;
  }

  // Role not allowed
  if (!hasAllowedRole(roleId, allowedRoles)) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
