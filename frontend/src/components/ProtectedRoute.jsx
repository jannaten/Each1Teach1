import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const LoadingSpinner = () => {
  return (
    <div className='text-center'>
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default function ProtectedRoute({ access, children, ...rest }) {
  const location = useLocation();
  const userState = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    setHasAccess(false);
    if (!userState.data) {
      setLoading(false);
      return;
    }
    checkAccess();
  }, [userState.data]);

  const checkAccess = () => {
    const isLoggedIn = !!userState.data;
    if (isLoggedIn && access) {
      const accessArray = Array.isArray(access) ? [...access] : [access];
      if (userState.data.roles.some((r) => accessArray.includes(r))) {
        setHasAccess(true);
      }
    } else if (isLoggedIn && !access) {
      setHasAccess(true);
    }
    setLoading(false);
  };

  if (loading) return <LoadingSpinner />;

  if (!hasAccess) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
}
