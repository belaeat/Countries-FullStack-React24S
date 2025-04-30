import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './slices/countriesSlice';
import weatherReducer from './slices/weatherSlice';
import testReducer from './slices/testSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    weather: weatherReducer,
    test: testReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
