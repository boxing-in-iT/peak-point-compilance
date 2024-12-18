import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./features/chatsSlice";
import authReducer from "./features/authSlice";
import { chatApi } from "./api/chatApi";

export const store = configureStore({
  reducer: {
    chats: chatReducer,
    auth: authReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// reducer: {
//   chats: chatReducer,
//   auth: authReducer,
// },
