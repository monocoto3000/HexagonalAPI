import * as amqp from 'amqplib';
import { Message } from '../../domain/Message';
import { MessageQueueService } from '../../domain/MessageQueue';

export class AMQPMessageQueueService implements MessageQueueService {
  private connection!: amqp.Connection;
  private channel!: amqp.Channel;
  constructor(private readonly url: string) {}
  async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.url);
      this.channel = await this.connection.createChannel();
    } catch (error) {
      console.error('Error de conexión a RabbitMQ:', error);
      throw error;
    }
  }
  async sendMessage(queueName: string, message: Message): Promise<void> {
    try {
      await this.channel.assertQueue(queueName, { durable: false });
      this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      console.error('Error al enviar el mensaje a la cola', error);
      throw error;
    }
  }
  async close(): Promise<void> {
    try {
      await this.channel.close();
      await this.connection.close();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  async consumeMessages(queueName: string, onMessageReceived: (message: Message) => void): Promise<void> {
    if (!this.channel) {
      throw new Error('Canal no inicializado');
    }
    try {
      await this.channel.assertQueue(queueName, { durable: false });
      await this.channel.consume(queueName, (msg) => {
        if (msg !== null) {
          const message: Message = JSON.parse(msg.content.toString());
          onMessageReceived(message);
          this.channel.ack(msg);
        }
      });
    } catch (error) {
      console.error('Error de consumo de mensajes de la cola', error);
      throw error;
    }
  }
}
