import {createApp} from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ClickOutside from "./directives/ClickOutside.js";

import './assets/main.css'
import './assets/scss/all.scss';
import './assets/scss/x_components.scss';

import './style/style_router.scss';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ClickOutside)


app.mount('#app')
