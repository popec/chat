import Vue from 'vue';
import Vuex from 'vuex';
import { Message } from '@/models/Message';

Vue.use(Vuex);

const messages: Message[] = [];
const users: string[] = [];

export default new Vuex.Store({
  state: {
    name: '',
    users: users,
    messages: messages,
  },
  mutations: {
    setName: (state, name: string) => {
      state.name = name;
    },
    addMessages: (state, messages: Message[]) => {
      console.log('addMessages', messages);
      messages.forEach((message: Message) => {
        state.messages.push(message);
      });
    },
    addMessage: (state, message: Message) => {
      console.log('addMessage', message);
      state.messages.push(message);
    },
    setUsers: (state, users: string[]) => {
      console.log('setUsers', users);
      state.users = users;
    },
  },
  actions: {
    onMessage: (context, message) => {
      context.commit('addMessage', message);
    },
    onMessages: (context, messages) => {
      context.commit('addMessages', messages);
    },
  },
  getters: {
    name: (state) => {
      return state.name;
    },
    messages: (state) => {
      return state.messages;
    },
    users: (state) => {
      return state.users;
    },
  },
});
