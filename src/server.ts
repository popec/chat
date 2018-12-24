import * as express from "express";
import * as http from "http";
import { AddressInfo } from "net";
import * as WebSocket from "ws";

const app = express();

// initialize a simple http server
const server = http.createServer(app);

// initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

interface IExtWebSocket extends WebSocket {
    isAlive: boolean;
}

function createMessage(content: string, sender: string): string {
    return JSON.stringify(new Message(content, sender));
}

export class Message {
    constructor(
        public content: string,
        public sender: string,
    ) { }
}

wss.on("connection", (ws: WebSocket) => {

    const extWs = ws as IExtWebSocket;

    extWs.isAlive = true;

    ws.on("pong", () => {
        extWs.isAlive = true;
    });

    // connection is up, let"s add a simple simple event
    ws.on("message", (msg: string) => {
        try {
            const message = JSON.parse(msg) as Message;
            wss.clients
                .forEach((client) => {
                    client.send(createMessage(message.content, message.sender));
                });
        } catch (e) {
            ws.send(createMessage("HELL no!", "Server"));
            console.warn(e);
        }
    });

    // send immediatly a feedback to the incoming connection
    ws.send(createMessage("Welcome to HELL", "Server"));

    ws.on("error", (err) => {
        console.warn(`Client disconnected - reason: ${err}`);
    });
});

setInterval(() => {
    wss.clients.forEach((ws: WebSocket) => {
        const extWs = ws as IExtWebSocket;
        if (!extWs.isAlive) {
            return ws.terminate();
        }
        extWs.isAlive = false;
        ws.ping(null, undefined);
    });
}, 30000);

// start our server
server.listen(process.env.PORT || 13666, () => {
    const { port } = server.address() as AddressInfo;
    console.log(`Server started on port ${port} :)`);
});
