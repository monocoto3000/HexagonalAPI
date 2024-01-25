import { User } from "./User";

export interface UserRepository {
  getAll(): Promise<User[] | null>;
  // getById(userId: number): Promise<User | null>;
  createUser(
    name: string,
    last_name: string,
    second_last_name: string,
    username: string,
    email: string,
    password: string,
    birthday: string,
    age: number
  ): Promise<User | null>;
}
