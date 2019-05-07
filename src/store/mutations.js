const mutations = {
  dark_mode(state, payload) {
    state.dark_mode = payload
  },
  add_log(state, payload) {
    state.logs.push(payload)
  },
  increment_id(state) {
    state.current_log_id++
  }
}

export default mutations
