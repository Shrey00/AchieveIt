import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/users/authSlice.js';
import userDataReducer from '../features/userData/userSlice';
const store = configureStore({
    reducer:{
        userLogin: authReducer,
        userData: userDataReducer
    }
});
export default store;