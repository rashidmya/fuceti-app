import { Module } from "vuex";
import { RootState } from "../store";
import { UserState, UserReactive, User } from "@/interfaces/user.interface";
import { Message } from "@/interfaces/message.interface";
import socket from "@/utils/socket";

const initReactiveProperties = (user: UserReactive) => {
  user.connected = true;
  user.messages = [];
  user.hasNewMessages = false;
};

const chatModule: Module<UserState, RootState> = {
  namespaced: true,
  state() {
    return {
      users: [],
      selectedUser: null,
    };
  },
  mutations: {
    userConnected(state, payload) {
      const user = payload;
      for (let i = 0; i < state.users.length; i++) {
        const existingUser = state.users[i] as UserReactive;
        if (existingUser.userId === user.userId) {
          existingUser.connected = true;
          return;
        }
      }
      initReactiveProperties(user);
      state.users.push(user);
    },
    connect(state) {
      state.users.forEach((user: any) => {
        if (user.self) {
          user.connected = true;
        }
      });
    },
    disconnect(state) {
      state.users.forEach((user: any) => {
        if (user.self) {
          user.connected = false;
        }
      });
    },
    users(state, { users }) {
      (<Array<UserReactive>>users).forEach((user) => {
        for (let i = 0; i < state.users.length; i++) {
          const existingUser = state.users[i] as UserReactive;
          if (existingUser.userId === user.userId) {
            existingUser.connected = user.connected;
            return;
          }
        }
        user.self = user.userId === socket.userId;
        initReactiveProperties(user);
        state.users.push(user);
      });
      // put the current user first, and sort by username
      state.users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
    },
    userDisconnected(state, payload: string) {
      for (let i = 0; i < state.users.length; i++) {
        const user = state.users[i] as UserReactive;
        if (user.userId === payload) {
          user.connected = false;
          break;
        }
      }
    },
    getMessage(state, { content, from, to }) {
      const fromSelf = socket.userId === from;
      for (let i = 0; i < state.users.length; i++) {
        const user = state.users[i] as UserReactive;
        if (user.userId === (fromSelf ? to : from)) {
          content.sent = fromSelf;
          user.messages.push(content);
          if (user !== state.selectedUser) {
            user.hasNewMessages = true;
          }
        }
      }
    },
    selectUser(state, payload: UserReactive) {
      state.selectedUser = payload;
      if (payload !== null) state.selectedUser!.hasNewMessages = false;
    },
    sendMessage(state, payload: Message) {
      state.selectedUser!.messages.push(payload);
    },
  },
  actions: {
    connect({ commit }) {
      commit("connect");
    },
    disconnect({ commit }) {
      commit("disconnect");
    },
    users({ commit }, payload) {
      commit("users", payload);
    },
    userConnected({ commit }, payload) {
      commit("userConnected", payload);
    },
    userDisconnected({ commit }, payload) {
      commit("userDisconnected", payload);
    },
    getMessage({ commit }, payload) {
      commit("getMessage", payload);
    },
    selectUser({ commit }, payload) {
      commit("selectUser", payload);
    },
    sendMessage({ commit }, payload) {
      commit("sendMessage", payload);
    },
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    selectedUser(state) {
      return state.selectedUser;
    },
  },
};

export default chatModule;
