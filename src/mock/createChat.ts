import { Chat, Message } from "../store/features/chatsSlice";

export const mockServerCreateChat = (messageText: string): Promise<Chat> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const chatId = `${Date.now()}`;
      const newMessage: Message = {
        messageId: `${Date.now()}-msg`,
        chatId,
        messageText,
        createdAt: new Date().toISOString(),
        senderType: "user",
      };
      const newChat: Chat = {
        id: chatId,
        name: `Chat ${chatId}`,
        messages: [newMessage],
        userId: "mockUserId", // Мокаем идентификатор пользователя
        createdAt: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
      };
      resolve(newChat);
    }, 1000); // Задержка 1 секунда
  });
};
