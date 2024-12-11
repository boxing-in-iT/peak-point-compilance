import { ArrowRight, Edit, Paperclip, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DownloadDropdown from "./DownloadDropdown";
import Input from "./Input";
import ChatArea from "./ChatArea";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setCurrentChat } from "../store/features/chatsSlice";
import LoaderComponent from "./Loader";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 20px; /* Adds external margins */
  border-radius: 20px; /* Rounded corners */
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
  padding: 20px;
  position: relative; /* Keeps input box inside container */

  @media (max-width: 850px) {
    padding-top: 50px;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Avatar = styled.div`
  background-color: #ddd;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  background-image: url("https://via.placeholder.com/36");
  background-size: cover;
`;

interface ChatContainerProps {
  messages?: string[];
}

export default function ChatContainer({ messages }: ChatContainerProps) {
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector((state) => state.chats.currentChat);
  const [loading, setLoading] = useState(true);

  const habdleClearCurrentChat = () => {
    dispatch(setCurrentChat(null));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Симулируем завершение загрузки
    }, 3000); // 3 секунды задержки
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <LoaderComponent />
      ) : (
        <Container>
          <TopBar>
            <div style={{ display: "flex", gap: "15px" }}>
              <Search size={20} />
              <Edit
                style={{ cursor: "pointer" }}
                size={20}
                onClick={habdleClearCurrentChat}
              />
            </div>
            <Avatar />
          </TopBar>

          <ChatArea messages={currentChat?.messages || []} />

          <Input />
        </Container>
      )}
    </>
  );
}
