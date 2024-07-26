import { createAsyncThunk, createSlice, isFulfilled, isRejected } from '@reduxjs/toolkit';
import {IMessage, IMessageUpdate, INewMessage} from '../../interfaces';
import { messageService } from '../../services';
import { AxiosError } from 'axios';

interface IState {
    messages: IMessage[];
    errors: {
        messages?: string[];
        detail?: string;
    };
}

const initialState: IState = {
    messages: [],
    errors: null,
};

const postMessage = createAsyncThunk<IMessage[], { recipient_id: string; message: INewMessage }>(
    'messageSlice/postMessage',
    async ({ recipient_id, message }, { rejectWithValue,dispatch }) => {
        try {
            await messageService.postMessage(recipient_id, message);
            await dispatch(getAllMessages())
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getAllMessages = createAsyncThunk<IMessage[], void>(
    'messageSlice/getAllMessages',
    async (_, { rejectWithValue }) => {
        try {
            const data = await messageService.getAllMessages();
            return data.messages
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const updateMessage = createAsyncThunk<IMessage, { message_id: string; messageUpdate: IMessageUpdate }>(
    'messageSlice/updateMessage',
    async ({ message_id, messageUpdate }, { rejectWithValue }) => {
        try {
            return await messageService.updateMessage(message_id, messageUpdate);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const deleteMessage = createAsyncThunk<void, { message_id: string }>(
    'messageSlice/deleteMessage',
    async ({ message_id }, { rejectWithValue }) => {
        try {
            return await messageService.deleteMessage(message_id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(postMessage.fulfilled, (state, action) => {
            state.messages = action.payload
        })
        .addCase(getAllMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
        })
        .addCase(updateMessage.fulfilled, (state, action) => {
            const index = state.messages.findIndex(m => m.id === action.payload.id);
            if (index !== -1) {
                state.messages[index] = action.payload;
            }
        })
        .addCase(deleteMessage.fulfilled, (state, action) => {
            state.messages = state.messages.filter(m => m.id !== action.meta.arg.message_id);
        })
        .addMatcher(isRejected(), (state, action) => {
            state.errors = action.payload;
        })
        .addMatcher(isFulfilled(), state => {
            state.errors = null;
        })
});

const { reducer: messageReducer, actions } = messageSlice;
const messageActions = {
    ...actions,
    postMessage,
    getAllMessages,
    updateMessage,
    deleteMessage,
};

export { messageReducer, messageActions };
