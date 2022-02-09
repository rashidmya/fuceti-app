import { Module } from "vuex";
import { RootState } from "../store";
import API from "../../api/index.api";

export interface AuthState {
  userId: string | null;
}

enum AuthMode {
  Login = 0,
  Register = 1,
}

const authModule: Module<AuthState, RootState> = {
  namespaced: true,
  state() {
    return {
      userId: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
    },
  },
  actions: {
    login({ dispatch }, payload) {
      return dispatch("auth", { data: payload, mode: AuthMode.Login });
    },
    register({ dispatch }, payload) {
      return dispatch("auth", { data: payload, mode: AuthMode.Register });
    },
    async auth({ commit }, payload) {
      const { mode, data } = payload;

      let path = "/login";
      if (mode === AuthMode.Register) path = "/register";

      const res = await API.post(path, data);
      if (res.status !== 200)
        throw new Error(res.data.error.message || "Something went wrong!");

      localStorage.setItem("jwt", res.data.token);
      localStorage.setItem("userId", res.data.id);

      commit("setUser", res.data);
    },
    async verify({ dispatch }) {
      const token = localStorage.getItem("jwt");
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const resVerify = await API.get("/verify", config);
      if (resVerify.data.error.message === "jwt expired") {
        localStorage.removeItem("jwt");
        const res = await API.get("/refresh_token", {});
        if (res.status !== 200) {
          dispatch("logout");
          throw new Error(res.data.error.message || "Something went wrong!");
        }
        localStorage.setItem("jwt", res.data.token);
      } else if (resVerify.data.error.message === "jwt malformed") {
        dispatch("logout");
      }
    },
    autoLogin({ commit }) {
      const userId = localStorage.getItem("userId");

      if (userId) {
        commit("setUser", { userId });
      }
    },
    logout({ commit }) {
      const jwt = localStorage.getItem("jwt");
      const userId = localStorage.getItem("userId");

      if (jwt) localStorage.removeItem("jwt");
      if (userId) localStorage.removeItem("userId");
      commit("setUser", { userId: null });
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.userId;
    },
  },
};

export default authModule;
