import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { unwrapResult } from '@reduxjs/toolkit';
import { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import { themes } from './utilities/colors';
import { getUserInfo } from './redux/slices/userSlice';
import ProtectedRoute from './components/ProtectedRoute';
import { HomePage, LoginPage, RegisterPage } from './pages';
import { ProfileManagementPage, NotFoundPage } from './pages';
import { ErrorBoundary, NavBar, ModalRootComponent } from './components';
import { UserManagementPage, NewsManagementPage, DashboardPage } from './pages';

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const isRootPage = location.pathname === '/';

  useEffect(() => {
    if (!isRootPage) loadUser();
  }, []);

  const loadUser = async () => {
    try {
      if (!userState?.data && localStorage.getItem('access-token')) {
        unwrapResult(await dispatch(getUserInfo()));
      }
    } catch (error) {
      console.error('error: ', error);
    }
  };

  // useEffect(() => {
  //   return () => {
  //     if (localStorage.getItem('access-token')) {
  //       unwrapResult(dispatch(getUserInfo()));
  //     }
  //   };
  // }, [location]);

  return (
    <ErrorBoundary>
      {/* <ThemeProvider theme={themes[theme]}> */}
      <ThemeProvider theme={themes.defaultTheme}>
        {location.pathname === '/login' ||
        location.pathname === '/register' ? null : (
          <NavBar />
        )}
        <ModalRootComponent />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route
            path='/'
            element={
              <ProtectedRoute access={['superuser', 'teacher', 'student']} />
            }>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route
              path='/dashboard/my-profile'
              element={<ProfileManagementPage />}
            />
          </Route>
          <Route
            path='/'
            element={<ProtectedRoute access={['superuser', 'teacher']} />}>
            <Route
              path='/dashboard/user-management'
              element={<UserManagementPage />}
            />
            <Route
              path='/dashboard/news-management'
              element={<NewsManagementPage />}
            />
          </Route>
          <Route element={<NotFoundPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
