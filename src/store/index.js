import { createStore } from "vuex";

export default createStore({
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