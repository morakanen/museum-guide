import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducers'; // Import userReducers from src/store
import authReducer from './authSlice';
import searchReducer from './searchSlice';
import userstateReducer from './userstateSlice';






const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    search: searchReducer,
    userstate: userstateReducer, // Add userstate reducer here
    
    
    
  },
});

export default store;