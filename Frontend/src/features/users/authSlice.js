import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
export let user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isSuccess: false,
    isFailed: false,
    isLoading: false,
    message: ''
};

export const signup = createAsyncThunk('userregister/fetch', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('/signup', userData);
        console.log('jyst mila response vro ' + response.data)
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        const message = error.toString();
        thunkAPI.rejectWithValue(message);
    }

})


export const login = createAsyncThunk('user/fetch', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('/signin', userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;   
    } catch (error) {
        const message = error.toString();
        // console.log(message)
        return thunkAPI.rejectWithValue(message);
    }
})



export const addTodo = createAsyncThunk('user/addTodo', async (todoItem) => {
     axios.post('http://localhost:5000/postTodo', {
        headers: { Authorization: `Bearer ${user.token}` },
        body: todoItem
    });
    console.log(`${todoItem} added`);
})

export const doneTodo = createAsyncThunk('user/doneTodo', async (todoItemId) => {
    axios.post('http://localhost:5000/doneTodo', {
        headers: { Authorization: `Bearer ${user.token}` },
        body: todoItemId
    });
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isSuccess = false
            state.isFailed = false
            state.isLoading = false
            state.message = ''
        },
        logout : (state) => {
            localStorage.removeItem('user');
            state.user = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state,action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isFailed = true;
                state.message = "Network Error";
                state.user = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
    }
})

export const { reset, logout } = authSlice.actions;
export const selectUserLoginState = (state) => state.userLogin;
export default authSlice.reducer;