import { query } from "../../database/mysql";
import { User } from "../domain/User";
import { CreateUserParams, UserRepository } from "../domain/UserRepository";

export class MysqlUserRepository implements UserRepository {
  async getAll(): Promise<User[] | null> {
    const sql = "SELECT * FROM user";
    try {
      const [data]: any = await query(sql, []);
      const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));
      return dataUsers.map(
        (user: any) =>
          new User(
            user.id,
            user.name,
            user.last_name,
            user.second_last_name,
            user.username,
            user.email,
            user.password,
            user.birthday,
            user.age,
            user.registered_at
          )
      );
    } catch (error) {
      return null;
    }
  }

  async createUser(userParams: CreateUserParams): Promise<User | null> {
    const sql =
      "INSERT INTO user (name, last_name, second_last_name, username, email, password, birthday, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const params: any[] = [
      userParams.name,
      userParams.last_name,
      userParams.second_last_name,
      userParams.username,
      userParams.email,
      userParams.password,
      userParams.birthday,
      userParams.age
    ];
  
    try {
      const [result]: any = await query(sql, params);
      return new User(
        result.insertId,
        userParams.name,
        userParams.last_name,
        userParams.second_last_name,
        userParams.username,
        userParams.email,
        userParams.password,
        userParams.birthday,
        userParams.age,
        Date.toString()
      );
    } catch (error) {
      return null;
    }
  }
}
