
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class CreateUserUseCase {
    constructor(readonly userRepository: UserRepository) {}
    async run(
      name: string,
      last_name: string,
      second_last_name: string,
      username: string,
      email: string,
      password: string,
      birthday: string, 
      age: number
    ): Promise<User | null> {
      try {
        const user = await this.userRepository.createUser(
          name,
          last_name,
          second_last_name,
          username,
          email,
          password,
          birthday,
          age
        );
        return user;
      } catch (error) {
        return null;
      }
    }
  }
  