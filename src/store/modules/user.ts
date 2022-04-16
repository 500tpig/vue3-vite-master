import { defineStore } from 'pinia'
import { store } from '@/store'
import { getAccessStorage, setAccessStorage, removeAccessStorage } from '@/utils/accessStorage'
import config from '@/config'
import { login } from '@/api/modules/user'
import { type RouteRecordRaw } from 'vue-router'

export interface IUserState {
  token: string
  menus: RouteRecordRaw[]
}

const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: getAccessStorage(config.tokenName, config.tokenStorage),
    menus: []
  }),

  getters: {
    getToken(): string {
      return this.token
    }
  },

  actions: {
    login(params: { username: string; password: string }) {
      const { username, password } = params
      return new Promise<void>((resolve, reject) => {
        login({ username: username.trim(), password: password, type: 0, client: 'test-vue3' })
          .then(async response => {
            this.token = response.token
            setAccessStorage(config.tokenName, response.token, config.tokenStorage)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout() {
      return new Promise<void>((resolve, reject) => {
        removeAccessStorage(config.tokenName, config.tokenStorage)
        // commit('RESET_STATE')
        resolve()
        // .catch(error => {
        //   reject(error)
        // })
      })
    }
  }
})

const useUserStoreWithOut = () => {
  return useUserStore(store)
}

export { useUserStore, useUserStoreWithOut }
