import io from 'socket.io-client';
import { Message, Type } from '@/models/Message';
import store from '@/store';

class SocketService {
    public socket: any;

    constructor() {
        this.socket = io('localhost:13666');

        this.socket.on('message', (message: Message) => {
            switch (message.type) {
                case Type.Message:
                    store.dispatch('onMessage', message);
                    break;
                case Type.Messages:
                    store.dispatch('onMessages', message.content);
                    break;
                case Type.Users:
                    store.commit('setUsers', message.content);
                    break;
            }
        });
    }
}

export default new SocketService();
