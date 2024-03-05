// domain/MessageQueueService.ts
import { Message } from "./Message";

export interface MessageQueueService {
  sendMessage(queueName: string, message: Message): Promise<void>;
  consumeMessages(queueName: string, onMessageReceived: (message: Message) => void): Promise<void>;
}
