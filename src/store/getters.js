const getters = {
  dark_mode: state => state.dark_mode,
  username: state => state.user.name,
  logs: state => id => {
    if (!id) {
      return state.logs
    }
    return state.logs.find(log => log.id === id)
  },
  current_log_id: state => state.current_log_id
}

export default getters
