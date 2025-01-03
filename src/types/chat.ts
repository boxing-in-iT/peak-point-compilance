export interface IMessage {
  messageId: string;
  messageText: string;
  createdAt: string;
  senderType: "user" | "bot";
}

export interface IChat {
  id: string;
  name: string;
  messages: IMessage[];
  userId: string;
  createdAt: string;
  date: string;
}
