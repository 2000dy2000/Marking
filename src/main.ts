import uviewPlus from 'uview-plus'
import { createSSRApp } from 'vue'
import App from './App.vue'

// modules
import { piniaInstall, setupPinia } from '~/modules/pinia'

import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)

  app.use(piniaInstall)

  // Configure store
  // https://pinia.vuejs.org/
  app.use(uviewPlus)
  setupPinia(app)

  return {
    app,
  }
}
