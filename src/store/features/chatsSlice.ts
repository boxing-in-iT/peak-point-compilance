// chatSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { IChat, IMessage } from "../../types/chat";

interface ChatState {
  chats: IChat[];
  currentChat: IChat | null;
  messages: IMessage[];
  loading: boolean;
}

const initialState: ChatState = {
  chats: [],
  currentChat: null,
  messages: [],
  loading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    addChat: (state, action) => {
      state.chats.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessageToCurrentChat: (state, action) => {
      if (state.currentChat) {
        state.currentChat.messages.push(action.payload);
      }
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setIsLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setChats,
  setCurrentChat,
  addChat,
  setMessages,
  addMessageToCurrentChat,
  addMessage,
  setIsLoading,
} = chatSlice.actions;
export default chatSlice.reducer;
