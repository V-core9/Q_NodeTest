import { configureStore } from '@reduxjs/toolkit';
import counter from './counter.slice';
import auth from './auth.slice';

export * from './auth.slice';
export * from './users.slice';

export const store = configureStore({
  reducer: {
    auth,
    counter,
  },
});
