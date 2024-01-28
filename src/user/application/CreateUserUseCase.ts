
import { User } from "../domain/User";
import { UserRepository, CreateUserParams } from "../domain/UserRepository";

export class CreateUserUseCase {
    constructor(readonly userRepository: UserRepository) {}
    async run(params: CreateUserParams): Promise<User | null> {
      try {
        const user = await this.userRepository.createUser(params);
        return user;
      } catch (error) {
        return null;
      }
    }
  }
  