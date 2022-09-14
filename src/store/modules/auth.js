/* eslint-disable no-console */
export default {
  state: {
    data: false,
  },
  getters: {
    //
  },
  actions: {
    logout(context) {
      context.commit("updateAuth", false)
    },
  },
  mutations: {
    updateAuth(state, data) {
      if (data == false) {
        data = {
          token: false,
        }
      }
      return state.data = data
    }
  }
}
/* eslint-disable no-console */