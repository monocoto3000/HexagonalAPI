
import { Message } from "../domain/Message";
import { MessageRepository } from "../domain/MessageRepository";

export class CreateMessageUseCase {
    constructor(readonly messageRepository: MessageRepository) {}
  
    async run(
      username: string,
      content: string,
    ): Promise<Message | null> {
      try {
        const message = await this.messageRepository.createMessage(
          username,
          content,
        );
        return message;
      } catch (error) {
        return null;
      }
    }
  }
  