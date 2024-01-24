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
      //El objeto Result es un objeto que contiene info generada de la bd
      /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
            estar dentro de un bloque try/catch si hay error se captura en el catch */
      return new Message(result.insertId, username, content, Date.toString());
    } catch (error) {
      return null;
    }
  }
}
