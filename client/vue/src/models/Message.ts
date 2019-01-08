export enum Type {
    Users,
    User,
    Messages,
    Message,
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
