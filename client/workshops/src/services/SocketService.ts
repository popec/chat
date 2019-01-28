import io from 'socket.io-client';
import { Message, Type } from '@/models/Message';
import store from '@/store';

class SocketService {
    public socket: any;

    constructor() {
        this.socket = io('localhost:13666');

        this.socket.on('message', (message: Message) => {
            switch (message.type) {
                // get last message from server
                case Type.Message:
                    console.log('[socket] Type.Message', message);
                    break;

                // get some recent messages from server
                case Type.Messages:
                    console.log('[socket] Type.Messages', message);
                    break;

                // get users list from server
                case Type.Users:
                    console.log('[socket] Type.Users, message');
                    store.commit('setUsers', message.content);
                    break;
            }
        });
    }
}

export default new SocketService();
