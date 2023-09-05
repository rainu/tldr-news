import {defineStore} from 'pinia'

export const useSessionsStore = defineStore('sessions', {
  state: () => ({
    heise: {
      cookies: null
    },
  }),
  getters: {
    isLoggedInHeise: (state) => {
      return !!state.heise.cookies
    }
  },
  actions: {
    heiseLogout(){
      this.heise.cookies = null
    }
  },
  persist: {
    storage: persistedState.localStorage,
  },
})