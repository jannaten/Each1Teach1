import { Toaster } from 'react-hot-toast';
import { unwrapResult } from '@reduxjs/toolkit';
import { ThemeProvider } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import { themes } from './utilities/colors';
import ProtectedRoute from './components/ProtectedRoute';
import { getUserInfo, updateUser } from './redux/slices/userSlice';
import { AllNews, ChatPage, NewsPage, NotFoundPage } from './pages';
import { MatchManagementPage, ProfileManagementPage } from './pages';
import { HomePage, LoginPage, RegisterPage, MatchesPage } from './pages';
import { ErrorBoundary, NavBar, ModalRootComponent } from './components';
import { UserManagementPage, NewsManagementPage, DashboardPage } from './pages';

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const userState = useSelector((state) => state.user);

  const isRootPage =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/register';

  useEffect(() => {
    if (!isRootPage) loadUser();
  }, []);

  useEffect(() => {
    if (!isRootPage) {
      const interval = setInterval(() => {
        const formData = new FormData();
        formData.append('id', userState.data.id);
        formData.append('lastUserAccess', new Date());
        dispatch(updateUser({ data: formData }));
        setCount((prevCount) => prevCount + 1);
      }, 300000);
      return () => clearInterval(interval);
    }
  }, [userState.data, location.pathname]);

  const loadUser = async () => {
    try {
      if (!userState?.data && localStorage.getItem('access-token'))
        unwrapResult(dispatch(getUserInfo()));
    } catch (error) {
      console.error('error: ', error);
    }
  };

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
          <Route path='/news/:newsId' element={<NewsPage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/news' element={<AllNews />} />
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
            <Route path='/dashboard/matches' element={<MatchesPage />} />
            <Route path='/dashboard/all-news' element={<AllNews />} />
            <Route path='/dashboard/all-news/:newsId' element={<NewsPage />} />
            <Route path='/dashboard/chat' element={<ChatPage />} />
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
            <Route
              path='/dashboard/match-management'
              element={<MatchManagementPage />}
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
