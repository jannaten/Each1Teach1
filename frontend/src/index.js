import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from './redux/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </HashRouter>
);
