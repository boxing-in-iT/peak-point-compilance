import { Download } from "lucide-react";
import React from "react";
import styled from "styled-components";
import DownloadDropdown from "./DownloadDropdown";
import { Message } from "../store/features/chatsSlice";

const ChatAreaContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 100px 50px;
  overflow-y: auto; /* Scrollable if messages exceed the view */
`;

const MessageBubble = styled.div<{ isSent: boolean }>`
  max-width: 60%;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 14px;
  line-height: 1.5;
  background-color: ${(props) => (props.isSent ? "#F4F4F4" : "")};
  color: #2a2a2a;
  align-self: ${(props) => (props.isSent ? "flex-end" : "flex-start")};
  position: relative;
  z-index: 1;
`;

const ChatAreaEmpty = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center; /* Align text to bottom */
  color: #555;
  font-size: 18px;
  padding-bottom: 100px; /* Space above input box */
  text-align: center; /* Center text horizontally */
`;

interface ChatAreaProps {
  messages: Message[];
}

export default function ChatArea({ messages }: ChatAreaProps) {
  if (messages.length === 0) {
    return <ChatAreaEmpty>How can I help you?</ChatAreaEmpty>;
  }

  return (
    <ChatAreaContainer>
      {messages.map((message, index) => (
        <MessageBubble key={index} isSent={message.senderType === "user"}>
          {message.messageText}
          {message.senderType !== "user" && <DownloadDropdown />}
        </MessageBubble>
      ))}
    </ChatAreaContainer>
  );
}
