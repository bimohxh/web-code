export const state = () => ({
  session: null
})

export const mutations = {
  setUser (state, session) {
    state.session = session
  }
}