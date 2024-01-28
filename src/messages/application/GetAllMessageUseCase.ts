import { Message } from "../domain/Message";
import { MessageRepository } from "../domain/MessageRepository";

export class GetAllMessageUseCase {
  constructor(readonly messageRepository: MessageRepository) {}

  async run(): Promise<Message[] | null> {
    try {
      const result = await this.messageRepository.getAll();
      return result;
    } catch (error) {
      return null;
    }
  }
}
