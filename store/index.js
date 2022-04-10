export const state = () => ({
  user: {},
  messages: [],
  users: []
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  cleatData(state) {
    state.user = {}
    state.messages = []
    state.users = []
  },
  SOCKET_clearMessage(state,message) {
    let deleteMessage = state.messages.findIndex(item => item.id === message.name && item.text === message.text);
    state.messages.splice(deleteMessage, 1)
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message)
  },
  SOCKET_updateUsers(state, users) {
    state.users = users
  }
}
