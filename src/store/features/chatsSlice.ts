// chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

export interface Message {
  messageId: string;
  chatId: string;
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
}

const initialState: ChatState = {
  chats: [], // массив всех чатов
  currentChat: null, // текущий чат, с которым работает пользователь
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
  },
});

export const { setChats, setCurrentChat, addChat } = chatSlice.actions;
export default chatSlice.reducer;
