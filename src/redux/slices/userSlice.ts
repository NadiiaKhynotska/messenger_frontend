import { createAsyncThunk, createSlice, isFulfilled, isRejected } from "@reduxjs/toolkit";
import { IPagination, IUser } from "../../interfaces";
import { AxiosError } from "axios";
import { userService } from "../../services";

interface IState {
    me: IUser | null;
    allUsers: IPagination<IUser> | null;
    errors: {
        messages?: string[];
        detail?: string;
    } | null;
}

const initialState: IState = {
    me: null,
    allUsers: null,
    errors: null,
}

const findAll = createAsyncThunk<{ data: IPagination<IUser> }, { limit: number, offset: number }>(
    'userSlice/findAll',
    async ({limit, offset} , { rejectWithValue }) => {
        try {
            const response = await userService.getAll(limit, offset);
            return {data:response.data};
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const findMe = createAsyncThunk<IUser, void>(
    'userSlice/findMe',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userService.findMe();
            return response.data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const deleteMe = createAsyncThunk<void, { userId: string }>(
    'userSlice/deleteMe',
    async ({ userId }, { rejectWithValue }) => {
        try {
            await userService.deleteMe(userId);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(findAll.fulfilled, (state, action) => {
            state.allUsers = action.payload.data;
        })
        .addCase(findMe.fulfilled, (state, action) => {
            state.me = action.payload;
        })
        .addCase(deleteMe.fulfilled, (state) => {
            state.me = null;
        })
        .addMatcher(isRejected(), (state, action) => {
            state.errors = action.payload as IState["errors"];
        })
        .addMatcher(isFulfilled(), state => {
            state.errors = null;
        })
});

const { reducer: userReducer, actions } = userSlice;
const userActions = {
    ...actions,
    deleteMe,
    findMe,
    findAll
};

export { userReducer, userActions };
