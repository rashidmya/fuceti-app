import { Module } from "vuex";
import { RootState } from "../store";
import { CallState } from "@/interfaces/call.interface";

const chatModule: Module<CallState, RootState> = {
  namespaced: true,
  state() {
    return {
      request: false,
      incoming: false,
      connected: false,
      user: null,
    };
  },
  mutations: {
    request(state, payload) {
      state.request = true;
      state.user = payload;
    },
    incoming(state, payload) {
      state.incoming = true;
      state.user = payload;
    },
    hangup(state) {
      state.request = false;
      state.incoming = false;
      state.connected = false;
      state.user = null;
    },
    answer(state) {
      state.request = false;
      state.incoming = false;
      state.connected = true;
    },
  },
  actions: {
    request({ commit }, payload) {
      commit("request", payload);
    },
    incoming({ commit }, payload) {
      commit("incoming", payload);
    },
    hangup({ commit }) {
      commit("hangup");
    },
    answer({ commit }) {
      commit("answer");
    },
  },
  getters: {
    call(state) {
      const call = {
        request: state.request,
        incoming: state.incoming,
        connected: state.connected,
        user: state.user,
      };
      return call;
    },
  },
};

export default chatModule;
