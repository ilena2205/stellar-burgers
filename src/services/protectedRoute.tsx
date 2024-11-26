import { Navigate, useLocation } from 'react-router-dom';
import { authChecked, selectUserData } from '../slices/userSlice';
import { useSelector } from './store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isChecked } = useSelector(selectUserData);

  if (!isChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        replace
        to={'/login'}
        state={{
          from: {
            ...location,
            background: location.state?.background,
            state: null
          }
        }}
      />
    );
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    const backgroundLocation = location.state?.from?.background || null;
    return (
      <Navigate replace to={from} state={{ background: backgroundLocation }} />
    );
  }

  return children;
};
