// chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

// export interface Message {
//   messageId: string;
//   chatId: string;
//   messageText: string;
//   createdAt: string;
//   senderType: "user" | "bot"; // "user" — сообщение от пользователя, "bot" — сообщение от ИИ
// }

interface Message {
  messageId: string;
  messageText: string;
  createdAt: string;
  senderType: "user" | "bot"; // "user" — сообщение от пользователя, "bot" — сообщение от ИИ
}

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
  userId: string;
  createdAt: string;
  date: string;
}

interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  messages: Message[];
  loading: boolean;
}

const initialState: ChatState = {
  chats: [], // массив всех чатов
  currentChat: null, // текущий чат, с которым работает пользователь
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
