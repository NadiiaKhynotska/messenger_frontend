import {createAsyncThunk, createSlice, isFulfilled, isRejected, PayloadAction} from '@reduxjs/toolkit';
import {IMessage, IMessageUpdate, INewMessage, IPagination} from '../../interfaces';
import {messageService} from '../../services';
import {AxiosError} from 'axios';

interface IState {
    messages: IPagination<IMessage> | null;
    errors: {
        messages?: string[];
        detail?: string;
    } | null;
    messageForUpdate: IMessageUpdate,
}

const initialState: IState = {
    messages: null,
    errors: null,
    messageForUpdate: null,
};

const postMessage = createAsyncThunk<void, {
    recipient_id: string;
    message: INewMessage,
    limit: number,
    offset: number
}>(
    'messageSlice/postMessage',
    async ({recipient_id, message, limit, offset}, {rejectWithValue, dispatch}) => {
        try {
            await messageService.postMessage(recipient_id, message);
            await dispatch(getAllMessages({limit, offset, recipientId:recipient_id}))
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getAllMessages = createAsyncThunk<{ data: IPagination<IMessage> }, {recipientId:string, limit: number, offset: number }>(
    'messageSlice/getAllMessages',
    async ({limit, offset, recipientId}, {rejectWithValue}) => {
            try {
                const response = await messageService.getAllMessages(limit, offset,recipientId);
                console.log('Response from getAllMessages:', response.data);  // Log the response
                return { data: response.data };
            } catch (e) {
                const err = e as AxiosError;
                console.error('Error in getAllMessages:', err.response?.data);  // Log the error
                return rejectWithValue(err.response.data);
            }
    }
);

const updateMessage = createAsyncThunk<void, {
    message_id: string;
    messageUpdate: IMessageUpdate,
    limit: number,
    offset: number
}>(
    'messageSlice/updateMessage',
    async ({message_id, messageUpdate, limit, offset}, {rejectWithValue, dispatch}) => {
        try {
            await messageService.updateMessage(message_id, messageUpdate);
            // await dispatch(getAllMessages({limit, offset}))
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const deleteMessage = createAsyncThunk<void, { message_id: string, limit: number, offset: number }>(
    'messageSlice/deleteMessage',
    async ({message_id, limit, offset}, {rejectWithValue, dispatch}) => {
        try {
            await messageService.deleteMessage(message_id);
            // await dispatch(getAllMessages({limit, offset}))
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState,
    reducers: {
        setMessageForUpdate: (state, action: PayloadAction<{ message: IMessageUpdate }>) => {
            state.messageForUpdate = action.payload.message
        }
    },
    extraReducers: builder => builder
        .addCase(getAllMessages.fulfilled, (state, action) => {
            console.log('State after getAllMessages fulfilled:', action.payload.data);  // Log the state
            state.messages = action.payload.data;
        })
        .addCase(updateMessage.fulfilled, (state) => {
            state.messageForUpdate = null;
        })
        .addMatcher(isRejected(), (state, action) => {
            state.errors = action.payload;
            console.error('Error:', action.payload);  // Log the error
        })
        .addMatcher(isFulfilled(), state => {
            state.errors = null;})
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
