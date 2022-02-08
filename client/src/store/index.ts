import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import API from '../api'

export interface State {
    loggedIn: boolean
  }

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state() {
        return {
            loggedIn: false
        }
    },
    mutations: {
        login(state){
            state.loggedIn = false
        },
        register(state){
            state.loggedIn = false
        }
    },
    actions: {
        async login({commit}, payload){
            const res = await API.post('/login', payload)
            console.log(res);
            commit('login',)
        },
        async register({commit}, payload){
            const res = await API.post('/register', payload)
            console.log(res);
            commit('register')
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