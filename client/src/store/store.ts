import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import auth from "./modules/auth.module";
import user from "./modules/user.module"
import call from "./modules/call.module"

export interface RootState {
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  modules: {
    auth,
    user,
    call
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
