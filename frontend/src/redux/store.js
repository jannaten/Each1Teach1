import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import newsSlice from './slices/newsSlice';
import modalSlice from './slices/modalSlice';
import matchSlice from './slices/matchSlice';
import configSlice from './slices/configSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    news: newsSlice,
    modal: modalSlice,
    config: configSlice,
    matches: matchSlice
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
