import { User } from "./User";


export interface CreateUserParams {
  name: string;
  last_name: string;
  second_last_name: string;
  username: string;
  email: string;
  password: string;
  birthday: string;
  age: number;
}


export interface UserRepository {
  getAll(): Promise<User[] | null>;
  createUser(params: CreateUserParams): Promise<User | null>;
}
