import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';
import { UserStatus } from '../utils/UserStatus';
import { ProtectedRoutePropsI } from '../Interfaces/ProtectedRoutePropsI';

const ProtectedRoute: React.FC<ProtectedRoutePropsI> = memo(({ children, isAllowed }) => {
  if (isAllowed !== UserStatus.LOGGED_IN) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
});

export default ProtectedRoute;
