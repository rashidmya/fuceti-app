import { Module } from "vuex";
import { RootState } from "../store";
import API from "../../api/index.api";

export interface AuthState {
  user: {
    userId: string | null;
    username: string | null;
  };
}

enum AuthMode {
  Login = 0,
  Register = 1,
}

const authModule: Module<AuthState, RootState> = {
  namespaced: true,
  state() {
    return {
      user: {
        userId: null,
        username: null,
      },
    };
  },
  mutations: {
    setUser(state, payload) {
      state.user.userId = payload.id;
      state.user.username = payload.username;
    }
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
      localStorage.setItem("username", res.data.username);

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
      if (resVerify.status === 500){
        throw new Error(resVerify.data)
      }
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
      const username = localStorage.getItem('username');

      if (userId) {
        commit("setUser", { userId, username });
      }
    },
    logout({ commit }) {
      const jwt = localStorage.getItem("jwt");
      const userId = localStorage.getItem("userId");
      const username = localStorage.getItem("username");

      if (jwt) localStorage.removeItem("jwt");
      if (userId) localStorage.removeItem("userId");
      if (username) localStorage.removeItem("username");
      commit("setUser", { userId: null, username: null });
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user.userId;
    },
    user(state) {
      return state.user;
    }
  },
};

export default authModule;
