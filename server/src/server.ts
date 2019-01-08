import * as express from "express";
import * as http from "http";
import { AddressInfo } from "net";
import * as io from 'socket.io';

const app = express();

// initialize a simple http server
const server = http.createServer(app);

// initialize the WebSocket server instance
const wss = io(server);

function createMessage(sender: string, content: any, type: Type): Message {
    return new Message(sender, content, type);
}

function addMessage(message: Message): void {
    messages.push(message);
    messages.slice(Math.max(messages.length - 25, 1));
}

function addUser(socketId: string, user: string): boolean {
    if (!users[socketId]) {
        users[socketId] = user;
        return true;
    }
    return false;
}

enum Type {
    Users,
    User,
    Messages,
    Message
}

class Message {
    constructor(
        public sender: string,
        public content: any,
        public type: Type,
    ) { }
}

const messages: Message[] = [];
const users: { [s: string]: string; } = {};

const getUsers = () => {
    return Object.keys(users).map(key => users[key]);
};

wss.on("connection", (ws: io.Socket) => {
console.log("client connected");
    ws.on("message", (message: Message) => {
console.log("on message");
        try {
            addMessage(message);
            if (addUser(ws.id, message.sender)) {
                wss.send(createMessage("Server", users, Type.Users));
            }
            wss.emit("message", message);
        } catch (e) {
            console.warn(e);
        }
    });

    ws.on('disconnect', function () {
        delete users[ws.id];
        wss.send(createMessage("Server", getUsers(), Type.Users));
    });

    wss.send(createMessage("Server", getUsers(), Type.Users));
    ws.send(createMessage("Server", messages, Type.Messages));

    ws.on("error", (err) => {
console.log("on error");
        console.warn(`Client disconnected - reason: ${err}`);
    });
});

// start our server
server.listen(process.env.PORT || 13666, () => {
    const { port } = server.address() as AddressInfo;
    console.log(`Server started on port ${port} :)`);
});
