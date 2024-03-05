import { query } from "../../database/mysql";
import { Message } from "../domain/Message";
import { MessageRepository } from "../domain/MessageRepository";

export class MysqlMessageRepository implements MessageRepository {
  async getAll(): Promise<Message[] | null> {
    const sql = "SELECT * FROM messages";
    try {
      const [data]: any = await query(sql, []);
      const dataMessages = Object.values(JSON.parse(JSON.stringify(data)));
      return dataMessages.map(
        (message: any) =>
          new Message(
            message.id,
            message.username,
            message.content,
            message.date
          )
      );
    } catch (error) {
      return null;
    }
  }


  async createMessage(
    username: string,
    content: string,
  ): Promise<Message | null> {
    const sql =
      "INSERT INTO messages (username, content) VALUES (?, ?)";
    const params: any[] = [username, content];
    try {
      const [result]: any = await query(sql, params);
      return new Message(result.insertId, username, content, Date.toString());
    } catch (error) {
      return null;
    }
  }

  async deleteMessageById(id: number): Promise<any | null> {
    const sql = "DELETE FROM messages WHERE id=?";
    const params: any[] = [id];
    try {
      const [result]: any = await query(sql, params);
      if (result && result.affectedRows > 0) {
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

}
