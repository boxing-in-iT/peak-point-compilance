import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../hooks/useAppSelector";

const ChatAreaContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 100px 50px;
  overflow-y: auto;
`;

const MessageBubble = styled.div<{ isSent: boolean }>`
  max-width: 60%;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 14px;
  line-height: 1.5;
  background-color: ${(props) => (props.isSent ? "#F4F4F4" : "#d8d8d8")};
  color: #2a2a2a;
  align-self: ${(props) => (props.isSent ? "flex-end" : "flex-start")};
  position: relative;
`;

const ChatAreaEmpty = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: #555;
  font-size: 18px;
  padding-bottom: 100px;
  text-align: center;
`;

export default function ChatArea() {
  const messages = useAppSelector((state) => state.chats.messages);

  const [displayedMessages, setDisplayedMessages] = useState<
    { senderType: string; messageText: string }[]
  >([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (messages.length > displayedMessages.length) {
      const newMessage = messages[displayedMessages.length];

      if (newMessage.senderType === "bot") {
        // Start typing effect only if the message is from the bot
        const words = newMessage.messageText.split(" ");
        let wordIndex = 0;

        setIsTyping(true); // Start typing effect

        const interval = setInterval(() => {
          setCurrentMessage(
            (prev) => prev + (wordIndex > 0 ? " " : "") + words[wordIndex]
          );
          wordIndex++;

          if (wordIndex === words.length) {
            clearInterval(interval);
            setDisplayedMessages((prev) => [...prev, newMessage]);
            setCurrentMessage(""); // Reset current message
            setIsTyping(false); // Stop typing effect
          }
        }, 100); // 100ms interval for adding a word
      } else {
        // Directly add user message without typing effect
        setDisplayedMessages((prev) => [...prev, newMessage]);
      }
    }
  }, [messages, displayedMessages]);

  if (!messages || messages.length === 0) {
    return <ChatAreaEmpty>How can I help you?</ChatAreaEmpty>;
  }

  return (
    <ChatAreaContainer>
      {displayedMessages.map((message, index) => (
        <MessageBubble key={index} isSent={message.senderType === "user"}>
          {message.messageText}
        </MessageBubble>
      ))}
      {isTyping && currentMessage && (
        <MessageBubble
          isSent={messages[displayedMessages.length]?.senderType === "user"}
        >
          {currentMessage}
        </MessageBubble>
      )}
    </ChatAreaContainer>
  );
}
