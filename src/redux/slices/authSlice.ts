import { createAsyncThunk, createSlice, isFulfilled, isRejected } from "@reduxjs/toolkit";
import { IAuth, IUser } from "../../interfaces";
import { authService } from "../../services/authService";
import { AxiosError } from "axios";
import { userService } from "../../services/userService";

interface IState {
    errors: {
        messages?: string[];
        detail?: string;
    };
    me: IUser | null;
}

const initialState: IState = {
    errors: null,
    me: null,
};

const register = createAsyncThunk<void, { user: IAuth }>(
    'authSlice/register',
    async ({ user }, { rejectWithValue }) => {
        try {
            await authService.register(user);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const login = createAsyncThunk<IUser, { user: IAuth }>(
    'authSlice/login',
    async ({ user }, { rejectWithValue }) => {
        try {
            return await authService.login(user);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const logout = createAsyncThunk<void>(
    'authSlice/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout();
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const findMe = createAsyncThunk<IUser, void>(
    'authSlice/findMe',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userService.findMe();
            return response.data; // Return the actual user data
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(findMe.fulfilled, (state, action) => {
            state.me = action.payload;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.me = action.payload;
        })
        .addCase(logout.fulfilled, (state) => {
            state.me = null;
        })
        .addMatcher(isRejected(), (state, action) => {
            state.errors = action.payload;
        })
        .addMatcher(isFulfilled(), state => {
            state.errors = null;
        })
});

const { reducer: authReducer, actions } = authSlice;
const authActions = {
    ...actions,
    register,
    login,
    logout,
    findMe,
};

export {
    authActions,
    authReducer
};
