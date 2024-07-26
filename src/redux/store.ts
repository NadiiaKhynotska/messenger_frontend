
import {authReducer, userReducer} from "./slices";
import {configureStore} from "@reduxjs/toolkit";
import {messageReducer} from "./slices/messageSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        message: messageReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            // Ignore these action types
            ignoredActions: ['authSlice/findMe/fulfilled'],
            // Ignore these field paths in all actions
            ignoredActionPaths: ['meta.arg', 'payload.headers'],
            // Ignore these paths in the state
            ignoredPaths: ['auth.me.headers'],
        },
    }),
});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type {
    RootState,
    AppDispatch,
}

export {store}
