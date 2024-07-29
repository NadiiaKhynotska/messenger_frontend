
import {authReducer, userReducer} from "./slices";
import {configureStore} from "@reduxjs/toolkit";
import {messageReducer} from "./slices";


const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        message: messageReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {

            ignoredActions: ['authSlice/findMe/fulfilled'],

            ignoredActionPaths: ['meta.arg', 'payload.headers'],

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
