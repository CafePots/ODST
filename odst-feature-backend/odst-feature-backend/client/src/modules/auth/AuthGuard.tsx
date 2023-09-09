import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from './AuthContext';


interface Props {
  readonly children: React.ReactElement | React.ReactElement[];
}

export default function AuthGuard(props: Props) {
  const location = useLocation();
  const auth = React.useContext(AuthContext);

  if (!auth.user && isProtected(location.pathname)) {
    return <Navigate to="/" />;
  }

  if (auth.user && !isProtected(location.pathname)) {
    return <Navigate to="/publications" />;
  }

  return (
    <div>{props.children}</div>
  );
}

/**
 * Helpers
 */

const unprotectedRoutes: string[] = ['/'];

function isProtected(pathname: string) {
  return !unprotectedRoutes.includes(pathname);
}
