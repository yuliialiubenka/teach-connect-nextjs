// redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authUserSlice } from './sliceAuth';
import { filterSlice } from './sliceFilter';

const persistConfig = {
  key: 'authUser',
  storage,
  whitelist: ['token'],
};

const persistedAuthUserReducer = persistReducer(persistConfig, authUserSlice.reducer);

export const store = configureStore({
  reducer: {
    authUser: persistedAuthUserReducer,
    filter: filterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);