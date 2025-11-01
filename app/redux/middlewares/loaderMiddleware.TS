import { Middleware } from '@reduxjs/toolkit';
import { showLoader, hideLoader } from '../slices/loaderSlice';

export const loaderMiddleware: Middleware = (store) => (next) => (action) => {
  const { type } = action;

  if (type.endsWith('/pending')) {
    store.dispatch(showLoader());
  } else if (type.endsWith('/fulfilled') || type.endsWith('/rejected')) {
    store.dispatch(hideLoader());
  }

  return next(action);
};