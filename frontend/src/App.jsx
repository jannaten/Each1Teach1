import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components';
import { HomePage, LoginPage, RegisterPage, NotFoundPage } from './pages';

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route element={<NotFoundPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}
