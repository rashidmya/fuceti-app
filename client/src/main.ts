import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {store, key} from './store'

import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App)

app.use(Quasar, quasarUserOptions)
app.use(router)
app.use(store, key)

app.mount('#app')