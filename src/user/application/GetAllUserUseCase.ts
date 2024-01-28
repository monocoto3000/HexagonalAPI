import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class GetAllUserUseCase {
  constructor(readonly userRepository: UserRepository) {}
  async run(): Promise<User[] | null> {
    try {
      const result = await this.userRepository.getAll();
      return result;
    } catch (error) {
      return null;
    }
  }
}
