import Vue from 'vue'
import App from './App.vue'

// === Bootstrap ===
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
// This imports all the layout components such as <b-container>, <b-row>, <b-col>:
import { Layout } from 'bootstrap-vue/es/components'
Vue.use(Layout)
// This imports <b-modal> as well as the v-b-modal directive as a plugin:
import { Modal } from 'bootstrap-vue/es/components'
Vue.use(Modal)
// This imports <b-card> along with all the <b-card-*> sub-components as a plugin:
import { Card } from 'bootstrap-vue/es/components'
Vue.use(Card)
// This imports directive v-b-scrollspy as a plugin:
import { Scrollspy } from 'bootstrap-vue/es/directives'
Vue.use(Scrollspy)

// === Styles ===
import './scss/main.scss'

// === Fontawesome ===
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faEye, faSun, faUserCircle, faChevronRight, faMoon, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faBuffer } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBook, faBuffer, faEye, faSun, faUserCircle, faChevronRight, faMoon, faPlusCircle, faTrash)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// === Store ===
import store from './store/store.js'

// === Router ===
import routes from './router/routes.js'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
