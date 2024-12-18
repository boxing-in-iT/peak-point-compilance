import React, { useEffect, useState } from "react";
import MobileHeader from "../../components/MobileHeader";
import ChatContainer from "../../components/ChatContainer";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setChats } from "../../store/features/chatsSlice";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
import SearchPage from "../../components/SearchPage";

const Overlay = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};

  @media (min-width: 850px) {
    display: none;
  }
`;

const mockChats = [
  {
    id: "1",
    name: "Чат с ботом-помощником",
    userId: "user_1",
    createdAt: "2024-12-10T09:00:00Z", // Сегодня
    date: "10.12.2024",
    messages: [
      {
        messageId: "1",
        chatId: "1",
        messageText: "Привет!",
        createdAt: "2024-12-10T09:00:00Z",
        senderType: "user",
      },
      {
        messageId: "2",
        chatId: "1",
        messageText: "Привет! Чем могу помочь?",
        createdAt: "2024-12-10T09:01:00Z",
        senderType: "bot",
      },
      {
        messageId: "3",
        chatId: "1",
        messageText: "Скажи, какая сейчас погода?",
        createdAt: "2024-12-10T09:02:00Z",
        senderType: "user",
      },
      {
        messageId: "4",
        chatId: "1",
        messageText: "Сейчас облачно, +5°C.",
        createdAt: "2024-12-10T09:03:00Z",
        senderType: "bot",
      },
    ],
  },
  {
    id: "2",
    name: "Чат для задач",
    userId: "user_2",
    createdAt: "2024-12-09T14:30:00Z", // Вчера
    date: "09.12.2024",
    messages: [
      {
        messageId: "5",
        chatId: "2",
        messageText: "Создай задачу: Завершить проект",
        createdAt: "2024-12-09T14:30:00Z",
        senderType: "user",
      },
      {
        messageId: "6",
        chatId: "2",
        messageText: "Задача создана. Что-нибудь еще?",
        createdAt: "2024-12-09T14:31:00Z",
        senderType: "bot",
      },
      {
        messageId: "7",
        chatId: "2",
        messageText: "Нет, спасибо.",
        createdAt: "2024-12-09T14:32:00Z",
        senderType: "user",
      },
    ],
  },
  {
    id: "3",
    name: "Чат с генератором идей",
    userId: "user_3",
    createdAt: "2024-12-07T10:00:00Z", // За три дня назад
    date: "07.12.2024",
    messages: [
      {
        messageId: "8",
        chatId: "3",
        messageText: "Придумай слоган для продукта.",
        createdAt: "2024-12-07T10:00:00Z",
        senderType: "user",
      },
      {
        messageId: "9",
        chatId: "3",
        messageText: "Ваш идеальный выбор — каждый день!",
        createdAt: "2024-12-07T10:01:00Z",
        senderType: "bot",
      },
      {
        messageId: "10",
        chatId: "3",
        messageText: "Еще варианты есть?",
        createdAt: "2024-12-07T10:02:00Z",
        senderType: "user",
      },
      {
        messageId: "11",
        chatId: "3",
        messageText: "Конечно! 'Мы работаем для вас' или 'С нами проще!'",
        createdAt: "2024-12-07T10:03:00Z",
        senderType: "bot",
      },
    ],
  },
  {
    id: "4",
    name: "Чат с ботом-переводчиком",
    userId: "user_4",
    createdAt: "2024-12-05T18:45:00Z", // За пять дней назад
    date: "05.12.2024",
    messages: [
      {
        messageId: "12",
        chatId: "4",
        messageText: "Переведи: 'Good morning!'",
        createdAt: "2024-12-05T18:45:00Z",
        senderType: "user",
      },
      {
        messageId: "13",
        chatId: "4",
        messageText: "Доброе утро!",
        createdAt: "2024-12-05T18:46:00Z",
        senderType: "bot",
      },
      {
        messageId: "14",
        chatId: "4",
        messageText: "Спасибо. А 'До завтра'?",
        createdAt: "2024-12-05T18:47:00Z",
        senderType: "user",
      },
      {
        messageId: "15",
        chatId: "4",
        messageText: "See you tomorrow.",
        createdAt: "2024-12-05T18:48:00Z",
        senderType: "bot",
      },
    ],
  },
  {
    id: "5",
    name: "Чат-ассистент",
    userId: "user_5",
    createdAt: "2024-12-02T11:15:00Z", // За неделю назад
    date: "02.12.2024",
    messages: [
      {
        messageId: "16",
        chatId: "5",
        messageText: "Найди ближайшую аптеку.",
        createdAt: "2024-12-02T11:15:00Z",
        senderType: "user",
      },
      {
        messageId: "17",
        chatId: "5",
        messageText: "Ближайшая аптека: 'Здоровье', 500 метров.",
        createdAt: "2024-12-02T11:16:00Z",
        senderType: "bot",
      },
      {
        messageId: "18",
        chatId: "5",
        messageText: "Спасибо!",
        createdAt: "2024-12-02T11:17:00Z",
        senderType: "user",
      },
    ],
  },
];

const MainPage = () => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);

  useEffect(() => {
    dispatch(setChats(mockChats));
  }, [dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearchModal = () => {
    setSearchModalVisible(!isSearchModalVisible);
  };
  return (
    <>
      <Sidebar isOpen={isMenuOpen} />
      <MobileHeader onMenuToggle={toggleMenu} />
      <ChatContainer openModal={toggleSearchModal} />
      <Overlay isVisible={isMenuOpen} />
      <Modal isVisible={isSearchModalVisible} onClose={toggleSearchModal}>
        <SearchPage toggleSearchModal={toggleSearchModal} />
      </Modal>
    </>
  );
};

export default MainPage;
