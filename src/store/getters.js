const getters = {
  dark_mode(state) {
    return state.dark_mode
  },
  username(state) {
    return state.user.name
  },
  logs(state) {
    return state.logs
  },
  current_log_id(state) {
    return state.current_log_id
  }
}

export default getters
