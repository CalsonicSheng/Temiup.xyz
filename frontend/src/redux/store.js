import { configureStore } from '@reduxjs/toolkit';
import { loyaltySlice } from './slices/loyaltySlice';

const reduxStore = configureStore({
  reducer: {
    loyaltyReducer: loyaltySlice.reducer,
  },
});

export { reduxStore };
