import VueRouter from 'vue-router'

import './main/search.vue'
import './main/shopping.vue'


// 3. 创建路由对象
const router = new VueRouter({
    // routes: [
    //     { path: '/search', component: search },
    //     { path: '/shopping', component: shopping }
    // ]
})

// 把路由对象暴露出去
export default router