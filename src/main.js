// 这是 入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'

// 按需导入 Mint-UI 中的组件
import { Header, Tabbar, TabItem } from 'mint-ui'


import app from './App.vue'
import router from './router.js'
import './lib/mui/css/mui.css'

Vue.use(VueRouter)
Vue.component(Header.name, Header)


var vm = new Vue({
    el: '#app',
    render: c=>c(app),
    router: router
});