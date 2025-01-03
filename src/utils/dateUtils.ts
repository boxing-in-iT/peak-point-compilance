import { IChat } from "../types/chat";

export const getChatsForToday = (chats: IChat[]): IChat[] => {
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0]; // Форматируем как YYYY-MM-DD
  return chats.filter((chat) => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    return lastMessage && lastMessage.createdAt.startsWith(formattedToday);
  });
};

export const getChatsForYesterday = (chats: IChat[]): IChat[] => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedYesterday = yesterday.toISOString().split("T")[0];
  return chats.filter((chat) => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    return lastMessage && lastMessage.createdAt.startsWith(formattedYesterday);
  });
};

export const getChatsForLast7Days = (
  chats: IChat[],
  chatsForToday: IChat[],
  chatsForYesterday: IChat[]
): IChat[] => {
  const today = new Date();
  const last7Days = new Date();
  last7Days.setDate(today.getDate() - 7);

  // Форматируем дату для последующих сравнений
  // const formattedLast7Days = last7Days.toISOString().split("T")[0];

  // Сначала отфильтровываем чаты, которые за последние 7 дней, но не попадают в категории "сегодня" или "вчера"
  return chats.filter((chat) => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    // const lastMessageDate = new Date(lastMessage?.createdAt)
    //   .toISOString()
    //   .split("T")[0];

    // Исключаем чаты за сегодня и вчера, оставляя только те, что за последние 7 дней
    const isInLast7Days =
      lastMessage && new Date(lastMessage.createdAt) >= last7Days;
    const isNotToday = !chatsForToday.includes(chat);
    const isNotYesterday = !chatsForYesterday.includes(chat);

    return isInLast7Days && isNotToday && isNotYesterday;
  });
};
