import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

const Protected = ({
  onlyUnAuth = false,
  component
}: TProtectedProps): React.JSX.Element => {
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();
  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return component;
};

export const OnlyAuth = Protected;

export const OnlyUnAuth = ({ component }: { component: React.JSX.Element }) => (
  <Protected onlyUnAuth component={component} />
);
