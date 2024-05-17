import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import modalSlice from './slices/modalSlice';
import configSlice from './slices/configSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalSlice,
    config: configSlice
  },
  // JSX can't be serialized to Redux state
  // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['modal/openModal'],
        ignoredPaths: ['modal.content']
      },
      immutableCheck: {
        ignoredPaths: ['modal.content']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
