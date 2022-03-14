
import * as VueRouter from 'vue-router'

import home from './page/home.vue'
import card from './page/card.vue'

const routes = [
    {
        path: '/card/:cardName',
        component: card,
        name: "card",
        props: true
    },
    {
        path: '/',
        component: home,
        name: "home"
    },
]


const router = VueRouter.createRouter({
    //  内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router