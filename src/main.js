// 这是 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 按需导入 Mint-UI 中的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import moment from 'moment'

// 导入格式化时间的插件
import app from './App.vue'

// 1.3 导入自己的 router.js 路由模块
import router from './router.js'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

// 2.1 导入 axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// 2.2 安装 axios
Vue.use(VueAxios, axios)
// 设置请求的根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3005';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 1.2 安装路由
Vue.use(VueRouter)
Vue.use(MintUI)
import { Toast } from 'mint-ui'
Vue.prototype.$toast = Toast;
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

// 安装 图片预览 插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 定义全局的过滤器
Vue.filter('dataFormat', function(dataStr, pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})


var vm = new Vue({
    el: '#app',
    render: c=>c(app),
    router: router  // 1.4 挂载路由对象到 vm 实例上
});