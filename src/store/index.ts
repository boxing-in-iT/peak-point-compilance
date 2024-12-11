import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./features/chatsSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    chats: chatReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
