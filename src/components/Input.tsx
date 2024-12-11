import { ArrowRight, Paperclip } from "lucide-react";
import React, { useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  addChat,
  Chat,
  Message,
  setCurrentChat,
} from "../store/features/chatsSlice";
import { mockServerCreateChat } from "../mock/createChat";

const InputArea = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
  padding: 10px 15px;
  border-radius: 30px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;

  @media (max-width: 570px) {
    width: 80%;
  }

  textarea {
    flex: 1;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    margin-left: 10px;
    resize: none; /* Убирает возможность изменения размера */
    max-height: 150px; /* Максимальная высота */
    overflow-y: auto; /* Прокрутка при превышении высоты */
  }

  button {
    background-color: #a386f5;
    border: none;
    color: #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: #8465d7;
    }
  }
`;

const Input = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const currentChat = useAppSelector((state) => state.chats.currentChat);
  const dispatch = useAppDispatch();

  const handleSendMessage = async () => {
    console.log("message", message);
    if (!message.trim()) return;

    setLoading(true);

    if (!currentChat) {
      try {
        // создаем новый чат
        const newChat: Chat = await mockServerCreateChat(message);
        dispatch(addChat(newChat));
        dispatch(setCurrentChat(newChat));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const newMessage: Message = {
          messageId: `${Date.now()}-msg`,
          chatId: currentChat.id,
          messageText: message,
          createdAt: new Date().toISOString(),
          senderType: "user",
        };
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }

    setLoading(false);
    setMessage("");
  };

  return (
    <InputArea>
      <Paperclip />
      <textarea
        placeholder="Write your request"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <button onClick={handleSendMessage} disabled={loading}>
        {loading ? "..." : <ArrowRight size={20} />}
      </button>
    </InputArea>
  );
};

export default Input;
