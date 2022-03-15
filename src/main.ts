import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'


import router from './router'

import store from './store/index'

import App from './App.vue'

//按需引用有问题,没有手动调用组件模板的需要手动引入一下
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'


const app = createApp(App)

app.use(store)
app.use(router)
// app.use(ElementPlus)


router.isReady().then(() => app.mount('#app'))
