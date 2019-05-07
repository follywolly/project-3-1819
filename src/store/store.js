import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

import state from './state.js'
import mutations from './mutations.js'
import getters from './getters.js'

const store = new Vuex.Store({
  state,
  mutations,
  getters
})

export default store
