import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import auth from "./modules/auth.module";

export interface RootState {
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  modules: {
    auth
  },
  state() {
    return {
    };
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
});

export function useStore() {
  return baseUseStore(key);
}
