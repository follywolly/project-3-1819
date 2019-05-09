const getters = {
  dark_mode: state => state.dark_mode,
  username: state => state.user.name,
  logs: state => id => {
    if (!id) {
      return state.logs
    }
    const found = state.logs.find(log => log.id === id)
    if (found) {
      return found
    }
    return {title: 'Error: Log not found'}
  },
  current_log_id: state => state.current_log_id
}

export default getters
