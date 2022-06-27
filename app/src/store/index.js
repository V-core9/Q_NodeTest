import { configureStore } from '@reduxjs/toolkit';
import counter from './counter.slice';
import auth from './auth.slice';
import users from './users.slice';
import books from './books.slice';

export * from './auth.slice';
export * from './users.slice';
export * from './books.slice';

export const store = configureStore({
  reducer: {
    auth,
    counter,
    users,
    books
  },
});
