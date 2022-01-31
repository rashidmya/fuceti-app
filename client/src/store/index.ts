import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export interface State {
    loggedIn: Boolean
  }

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state() {
        return {
            loggedIn: true
        }
    },
    mutations: {
        login(state){
            state.loggedIn = true
            console.log(state.loggedIn);
        }
    },
    actions: {
        login({commit}){
            commit('login')
        }
    },
    getters: {
       isLoggedIn(state) {
            return state.loggedIn
        }
    }
})

export function useStore() {
    return baseUseStore(key);
}