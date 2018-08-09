
import * as redis from 'redis';
import * as WebSocket from 'ws';

const publisher = redis.createClient();
const subscriber = redis.createClient();

interface Message {
    from: number;
    to?: number;
    text: String;
}

class Client {
    constructor(protected readonly id: number, protected readonly socket: WebSocket, protected readonly chat: Chat) {
        socket.on('message', this.onMessage);
        socket.on('close', this.onClose);
    }

    onMessage = (data) => {
        publisher.publish('messages', data);
    };

    onClose = () => {
        delete this.chat.clients[this.id];
    };

    send(message) {
        console.log('message from', message.from, 'to', this.id, message.text, message.name);
        this.socket.send(JSON.stringify(message));
    }
}

class Chat {
    clients: { [id: number]: Client };
    wss: WebSocket.Server;

    constructor(server) {
        this.clients = {};
        this.wss = new WebSocket.Server({ server });
        this.wss.on('connection', this.onConnect);

        subscriber.subscribe('messages');
        subscriber.on('message', (channel, data) => {
            const message: Message = JSON.parse(data);
            const client = this.clients[message.to];
            if (client) {
                client.send(message);
            }
        });
    }

    onConnect = (ws: WebSocket) => {
        ws.on('message', (data) => {
            const message: Message = JSON.parse(data);
            if (message.text === 'auth') {
                const client = new Client(message.from, ws, this);
                this.clients[message.from] = client;
            }
        });
    };
}

export default Chat;