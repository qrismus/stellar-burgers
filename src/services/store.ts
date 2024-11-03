import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import burgerConstructorSlice from '../services/slices/burgerConstructorSlice';
import ingredientsSlice from '../services/slices/ingredientsSlice';
import userSlice from '../services/slices/userSlice';
import feedsSlice from '../services/slices/feedSlice';
import orderSlice from '../services/slices/orderSlice';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorSlice,
  ingredients: ingredientsSlice,
  user: userSlice,
  feed: feedsSlice,
  order: orderSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
