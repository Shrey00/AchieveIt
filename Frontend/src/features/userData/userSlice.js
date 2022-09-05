import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserLoginState, } from '../users/authSlice';
const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    userData: {
        todo: [],
        doing: [],
        done: [],
    },
    goals: [],
    isLoading: false,
    isFullfilled: false,
    isRejected: false,
}

export const getUserData = createAsyncThunk('user/getUserData', async (user, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:5000/me', { headers: { Authorization: `Bearer ${user.token}` } });
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
})

export const reqAddTodo = createAsyncThunk('user/reqAddTodo', async (todoItem) => {
    const { user, text, check, deadline } = todoItem;
    await axios.post('http://localhost:5000/addTodo', { text, deadline, check },
        {
            headers: { Authorization: `Bearer ${user.token}` }
        });
})

export const reqTransferTodoToDoing = createAsyncThunk('user/reqTransferTodoToDoing', async (Item) => {
    const { user, index } = Item;
    await axios.post('http://localhost:5000/transferTodoToDoing', { index },
        {
            headers: { Authorization: `Bearer ${user.token}` }
        });
});

export const reqTransferDoneToDoing = createAsyncThunk('user/reqTransferTodoToDoing', async (Item) => {
    const { user, index } = Item;
    await axios.post('http://localhost:5000/transferDoneToDoing', { index },
        {
            headers: { Authorization: `Bearer ${user.token}` }
        });
})

export const reqDoneTodoFromDoing = createAsyncThunk('user/reqDoneTodoFromDoing', async (Item) => {
    const { user, index } = Item;
    console.log('vbnm,.ghjkm,ASDFGHJKLasdfghjkldfghjklcvgbhnjmk,')

    await axios.post('http://localhost:5000/doneTodoFromDoing', { index },
        {
            headers: { Authorization: `Bearer ${user.token}` }
        });
});

export const reqDoneTodoFromTodo = createAsyncThunk('user/doneTodoFromTodo', async (Item) => {

    const { user, index } = Item;
    await axios.post('http://localhost:5000/doneTodoFromTodo', { index },
        {
            headers: { Authorization: `Bearer ${user.token}` }
        });
});

export const moveToTodo = createAsyncThunk('user/moveToTodo', async (Item) => {
    const { user, index } = Item;
    await axios.post('http://localhost:5000/moveToTodo', { index },
        {
            headers: { Authorization: `Bearer ${user.token}` }
        });
});

export const reqRemoveTodo = createAsyncThunk('user/removeTodo', async (Item) => {
    const { user, index } = Item;
    await axios.post('http://localhost:5000/removeTodo', { index },
        {
            headers: { Authorization: `Bearer ${user.token}` }
        });
});

export const reqRemoveDone = createAsyncThunk('user/removeDone', async (Item) => {
    const { user, index } = Item;
    await axios.post('http://localhost:5000/removeDone', { index },
        {
            headers: { Authorization: `Bearer ${user.token}` }
        });
});


const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        reset: (state) => {
            state.email = '';
            state.firstName = '';
            state.lastName = '';
            state.userData.todo = [];
            state.userData.doing = [];
            state.userData.done = [];
            state.goals = [];
        },
        TransferTodoToDoing: (state, action) => {
            const todoToDoing = state.userData.todo.splice(action.payload, 1);
            console.log(current(todoToDoing[0]))
            state.userData.doing.push(todoToDoing[0]);
        },
        TransferDoneToDoing: (state, action) => {
            const doneToDoing = state.userData.done.splice(action.payload, 1);
            doneToDoing[0].check = false;
            state.userData.doing.push(doneToDoing[0]);
        },
        addTodo: (state, action) => {
            state.userData.todo.push(action.payload);
        },
        doneTodoFromDoing: (state, action) => {
            const doneTodoItem = state.userData.doing.splice(action.payload, 1);
            doneTodoItem[0].check = true;
            state.userData.done.push(doneTodoItem[0]);
        },
        doneTodoFromTodo: (state, action) => {
            const doneTodoItem = state.userData.todo.splice(action.payload, 1);
            // doneTodoItem[0].check = true;
            state.userData.done.push(doneTodoItem[0]);
            console.log(current(state.userData.done))
            // const len = state.userData.done.length-1;
            // state.userData.done[len].check = tr
        },
        checkTodo: (state, action) => {
            state.userData.todo[action.payload.index].check = action.payload.check;
        },
        undoDoneTodo: (state, action) => {
            const doneTodoItem = state.userData.done.splice(action.payload, 1);
            doneTodoItem[0].check = false;
            state.userData.todo.push(doneTodoItem[0]);
        },
        undoDoneDoing: (state, action) => {
            const doneTodoItem = state.userData.done.length > 0 ? state.userData.done.splice(action.payload, 1) : null;
            if (doneTodoItem.length > 0)
                doneTodoItem[0].check = false;
            state.userData.doing.push(doneTodoItem[0]);
        },
        removeItem: (state, action) => {
            if (action.payload.id === 0) {
                state.userData.todo.splice(action.payload.index, 1);
            }
            if (action.payload.id === 1) {
                state.userData.done.splice(action.payload.index, 1);
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getUserData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                const { firstName, email, lastName, userData, goals } = action.payload;
                state.isLoading = false;
                state.email = email;
                state.firstName = firstName;
                state.lastName = lastName;
                state.userData = userData;
                state.goals = goals;
            })
            .addCase(getUserData.rejected, (state, action) => {
                console.log(action.payload);
            })
            .addCase(reqAddTodo.rejected, () => {
                console.log('Error saving the Todo item in database. It will not be saved if you leave the page, or reload the page.s')
            })
    }
})

export const { reset, TransferTodoToDoing, TransferDoneToDoing,
    addTodo, doneTodoFromDoing, doneTodoFromTodo, undoDoneDoing,
    undoDoneTodo, checkTodo, removeItem } = userSlice.actions;
export const selectUserData = (state) => state.userData;
export const selectUserTodo = (state) => state.userData.userData.todo;
export const selectUserDoing = (state) => state.userData.userData.doing;
export const selectUserDone = (state) => state.userData.userData.done;
export const selectUserGoals = (state) => state.userData.userData.goals;
export default userSlice.reducer;