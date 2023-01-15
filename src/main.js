import { createApp } from 'vue'
import App from './App.vue'
import Unicon from 'vue-unicons'
import router from './router'
import store from './store'
import Notifications from '@kyvg/vue3-notification'
import "./assets/tailwind.css"
import { uniPlus, uniPlay, uniStepBackward, uniTrash } from 'vue-unicons/dist/icons'

Unicon.add([uniPlus, uniPlay, uniStepBackward, uniTrash])

createApp(App).use(store).use(Unicon).use(Notifications).use(router).mount('#app')
