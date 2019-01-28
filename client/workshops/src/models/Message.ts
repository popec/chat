export enum Type {
    Users, // List of users
    User, // Introduce yourself
    Messages, // List of recent messgases from the server
    Message, // Message
}

export class Message {
    constructor(
        public sender: string,
        public content: any,
        public type: Type,
    ) { }
}

export function createMessage(sender: string, content: any, type: Type): Message {
    return new Message(sender, content, type);
}
