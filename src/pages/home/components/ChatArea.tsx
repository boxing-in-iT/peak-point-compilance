import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../hooks/useAppSelector";

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

const formatMessageText = (messageText: string) => {
  const boldTextRegex = /\*\*(.*?)\*\*/g;
  const linkRegex = /\[(.*?)\]\((.*?)\)/g;
  const listRegex = /^(\d+)\.\s(.+)$/gm;
  const baseUrl = "https://www.ndis.gov.au";

  let formattedText = messageText.replace(boldTextRegex, (_, p1) => {
    return `<strong>${p1}</strong>`;
  });

  formattedText = formattedText.replace(linkRegex, (_, text, href) => {
    const absoluteHref = href.startsWith("http") ? href : `${baseUrl}${href}`;
    return `<a href="${absoluteHref}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });

  formattedText = formattedText.replace(listRegex, (_, __, text) => {
    return `<li>${text.trim()}</li>`;
  });

  if (formattedText.includes("<li>")) {
    formattedText = `<ol>${formattedText}</ol>`;
  }

  return formattedText;
};

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
          <div
            dangerouslySetInnerHTML={{
              __html: formatMessageText(message.messageText),
            }}
          />
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
