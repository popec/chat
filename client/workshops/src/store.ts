import Vue from 'vue';
import Vuex from 'vuex';
import { Message } from '@/models/Message';

Vue.use(Vuex);

const USER_NAME = 'YOUR team';
const MESSAGES: Message[] = [];
const USERS: string[] = [];

export default new Vuex.Store({
  state: {
    name: USER_NAME,
    users: USERS,
    messages: MESSAGES,
  },
  mutations: {
    setUsers: (state, users: string[]) => {
      console.log('mutations.setUsers', users);
      state.users = users;
    },
  },
  actions: {},
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
