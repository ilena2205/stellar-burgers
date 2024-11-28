import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
import feedsReducer from '../slices/feedSlice';
import userReducer from '../slices/userSlice';
import ordersReducer from '../slices/orderSlice';
import burgerConstructorReducer from '../slices/constructorSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  user: userReducer,
  orders: ordersReducer,
  burgerConstructor: burgerConstructorReducer
});
