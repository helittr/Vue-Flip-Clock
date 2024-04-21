import { createApp } from 'vue'
import App from './App.vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
// import './assets/index.css'
// import router from './router'
import './style.css'

const app = createApp(App)

// app.use(ElementPlus)
// app.use(router)

app.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
