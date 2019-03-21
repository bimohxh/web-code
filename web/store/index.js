// const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  session: null
})

export const mutations = {
  setAuth(state, session) {
    state.session = session
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    const res = await app.$axios().get('session')
    commit('setAuth', res.data.data)
  }
}
