import { Message } from "./Message";

export interface MessageRepository {
  getAll(): Promise<Message[] | null>;
  // getById(userId: number): Promise<Message | null>;
  createMessage(
    username: string,
    content: string,
  ): Promise<Message | null>;
}
