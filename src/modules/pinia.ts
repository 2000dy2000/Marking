import type { App } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export const pinia = createPinia()

export const setupPinia = (app: App<Element>) => app.use(pinia)

export const piniaInstall = (app: App) => {
  pinia.use(
    createPersistedState({
      storage: {
        getItem(key: string): string | null {
          return uni.getStorageSync(key)
        },
        setItem(key: string, value: string) {
          uni.setStorageSync(key, value)
        },
      },
    }),
  )
  app.use(pinia)
}
