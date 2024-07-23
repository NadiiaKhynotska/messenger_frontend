import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {IAuth, IUser} from "../../interfaces";
import {authService} from "../../services/authService";
import {AxiosError} from "axios";


interface IState{
    errors: {
        messages?: string[];
        detail?: string;
    }
    me: IUser;
}

const initialState:IState={
    errors: null,
    me: null,
}

const register = createAsyncThunk<void, { user: IAuth }>(
    'authSlice/register',
    async ({user}, {rejectWithValue}) => {
        try {
            await authService.register(user)

        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const login = createAsyncThunk<IUser, { user: IAuth }>(
    'authSlice/login',
    async ({user}, {rejectWithValue}) => {
        try {
            return await authService.login(user);



        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)


const authSlice = createSlice({
   name: 'authSlice',
    initialState,
    reducers:{},
    extraReducers:builder => builder
        .addCase(login.fulfilled, (state, action) => {
            state.me = action.payload
        })
        .addMatcher(isRejected(),(state, action) => {
            state.errors = action.payload
        })
        .addMatcher(isFulfilled(), state => {
            state.errors = null
        })
})


const {reducer:authReducer,actions} = authSlice

const authActions ={
    ...actions,
    register,
    login,
}

export {
    authActions,
    authReducer
}
