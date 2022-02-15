import { Module } from "vuex";
import { RootState } from "../store";

import { UserState, UsersReactive } from "@/interfaces/user.interface";

const initReactiveProperties = (user: UsersReactive) => {
  user.connected = true;
  user.messages = [];
  user.hasNewMessages = false;
};

const chatModule: Module<UserState, RootState> = {
  namespaced: true,
  state() {
    return {
      users: [],
      selectedUser: null
    };
  },
  mutations: {
    userConnected(state, payload) {
      initReactiveProperties(payload);
      state.users.push(payload);
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
    users(state, payload) {
      const allUsers = payload.allUsers;
      allUsers.forEach((user: any) => {
        user.self = user.userId === payload.socket.id;
        initReactiveProperties(user);
      });

      state.users = allUsers.sort((a: any, b: any) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
    },
    userDisconnected(state, payload) {
      for (let i = 0; i < state.users.length; i++) {
        const user = state.users[i];
        if (user.userId === payload) {
          user.connected = false;
          break;
        }
      }
    },
    getMessage(state, {msg , from}){
      for (let i = 0; i < state.users.length; i++){
        const user = state.users[i];
        if (user.userId === from) {
          user.messages.push(msg)
          if (user !== state.selectedUser) {
            user.hasNewMessages = true;
            console.log(user);
          }
        }
      }
    },
    selectUser(state, payload){
      state.selectedUser = payload
      if (payload !== null) state.selectedUser!.hasNewMessages = false
    },
    sendMessage(state, payload){
      state.selectedUser!.messages.push(payload)
    }
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
    getMessage({commit}, payload){
      commit('getMessage', payload)
    },
    selectUser({commit}, payload){
      commit('selectUser', payload)
    },
    sendMessage({commit}, payload){
      commit('sendMessage', payload)
    }
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    selectedUser(state){
      return state.selectedUser;
    }
  },
};

export default chatModule;
