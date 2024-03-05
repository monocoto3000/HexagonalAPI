import { Message } from "../domain/Message";
import { MessageRepository } from "../domain/MessageRepository";
import { AMQPMessageQueueService } from "../infrastructure/Adapters/AmqpQueueService";

export class CreateMessageUseCase {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly messageQueueService: AMQPMessageQueueService 
  ) {}

  async run(
    username: string,
    content: string,
  ): Promise<Message | null> {
    try {
      const message = await this.messageRepository.createMessage(
        username,
        content,
      );
      if (message) {
        await this.messageQueueService.connect();
        await this.messageQueueService.sendMessage('mensajes', message);
        await this.messageQueueService.close();
      }
      return message;
    } catch (error) {
      return null;
    }
  }
}
