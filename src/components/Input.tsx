import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addMessage, setIsLoading } from "../store/features/chatsSlice";
import { useSendMessageMutation } from "../store/api/chatApi";

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
    resize: none;
    max-height: 150px;
    overflow-y: auto;
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
  const messages = useAppSelector((state) => state.chats.messages);
  const loading = useAppSelector((state) => state.chats.loading);
  const dispatch = useAppDispatch();

  const [sendMessage] = useSendMessageMutation();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    dispatch(setIsLoading(true));
    setMessage("");

    const userMessage = {
      messageId: Date.now().toString(),
      messageText: message,
      createdAt: new Date().toISOString(),
      senderType: "user",
    };

    dispatch(addMessage(userMessage));

    try {
      const response = await sendMessage({ user_query: message }).unwrap();

      const botMessage = {
        messageId: Date.now().toString(),
        messageText: response.response,
        createdAt: new Date().toISOString(),
        senderType: "bot",
      };

      dispatch(addMessage(botMessage));
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      dispatch(setIsLoading(false));
      setMessage("");
    }
  };
  useEffect(() => {
    console.log("currentChat:", messages);
  }, [messages]);

  return (
    <InputArea>
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
