
import { Message } from "../domain/Message";
import { MessageRepository } from "../domain/MessageRepository";
  
  export class DeleteByIdMessageUseCase {
    constructor(readonly messageRepository: MessageRepository) {}
    async run(id: number): Promise<Message | null> {
      try {
        const result = await this.messageRepository.deleteMessageById(id);
        return result;
      } catch (error) {
        return null;
      }
    }
  }