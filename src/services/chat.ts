import * as redis from "redis";
import * as WebSocket from "ws";
import { ChatMessage } from "../models/chat-message";
import * as moment from "moment";
import { ChatChannel } from "../models/chat-channel";

const publisher = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD
});
const subscriber = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD
});

class Client {
  constructor(
    protected readonly id: number,
    protected readonly socket: WebSocket,
    protected readonly chat: Chat
  ) {
    socket.on("message", this.onMessage);
    socket.on("close", this.onClose);
  }

  onMessage = data => {
    publisher.publish("messages", data);
  };

  onClose = () => {
    delete this.chat.clients[this.id];
  };

  async send(message) {
    this.socket.send(JSON.stringify(message));
  }
}

class Chat {
  clients: { [id: number]: Client };
  wss: WebSocket.Server;

  async createChannel(from, to) {
    let channel = await ChatChannel.query().findOne({ from, to });

    if (!channel) {
      channel = await ChatChannel.query().insert({ from, to });
    }
  }

  async save(message) {
    await Promise.all([
      this.createChannel(message.to, message.from),
      this.createChannel(message.from, message.to)
    ]);

    await ChatMessage.query().insert({
      from: message.from,
      to: message.to,
      text: message.text,
      created_at: moment().utc(),
      viewed: false
    });
  }

  constructor(server) {
    this.clients = {};
    this.wss = new WebSocket.Server({ server });
    this.wss.on("connection", this.onConnect);

    subscriber.subscribe("messages");
    subscriber.on("message", (channel, data) => {
      const message = JSON.parse(data);
      const client = this.clients[message.to];
      this.save(message);
      if (client) {
        client.send(message);
      }
    });
  }

  onConnect = (ws: WebSocket) => {
    ws.on("message", data => {
      const message = JSON.parse(data);
      if (message.text === "auth") {
        const client = new Client(message.from, ws, this);
        this.clients[message.from] = client;
      }
    });
  };
}

export default Chat;
