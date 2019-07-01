// 这是 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 注册 vuex 
import Vuex from 'vuex'
Vue.use(Vuex)
// 每次刚进入 网站， 肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，
// 放到 store 中

// 切记调用JSON 相关方法时，字符串一定要用双引号！！
var cart = JSON.parse(localStorage.getItem("cart")) || []
const store = new Vuex.Store({
    state: {    // this.$store.state.***
        cart: cart, // 将购物车中的商品的数据，用一个数组存储起来, 在 cart 数组中，存储一些商品的对象
                // 可以 暂时将这个商品对象设计成这样    
                // {id: id, count: 数量, price: price,selected: 是否被选中}
    },
    mutations:{ // this.$store.commit('方法名', 唯一参数)
        addToCart(state, goodsinfo){
            // 点击加入购物车，把商品嘻嘻，保存到 store 中的 cart 上
            // 分析：
            // 1. 如果购物车中，之前就有这个对应的商品，就只需要更新数量
            // 2. 如果没有，则直接把 商品 push 到 cart 中即可

            // 假设在购物车中没有找到对应的商品
            var flag = false

            state.cart.some(item=>{
                if(item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            // 如果循环完毕，得到的 flag 还是 false， 则把商品数据直接 push 到 购物车中
            if(!flag){
                state.cart.push(goodsinfo)
            }

            // 当 更新 cart 之后，把 cart 数组，存储到 本地的 localStorage 中
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        updateGoodsInfo(state, goodsinfo){
            // 修改购物车中商品的数量值
            // 分析：
            // 
            state.cart.some(element => {
                if(element.id == goodsinfo.id){
                    element.count = parseInt(goodsinfo.count)
                    return true
                }
            });
            // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        removeFromCart(state, id){
            // 根据 id，从 store 中的购物车中删除对应的商品数据
            state.cart.some((item, i)=>{
                if( item.id == id ){
                    state.cart.splice(i, 1)
                    return true
                }
                // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
                localStorage.setItem("cart", JSON.stringify(state.cart))
            })
        },
        updateGoodsSelected(state, info){
            state.cart.some(element=>{
                if(element.id == info.id){
                    element.selected = info.selected
                }
            })
            // // 将最新的购物车状态，保存到 本地存储中
            localStorage.setItem("cart", JSON.stringify(state.cart))
        }
    }, 
    getters: {  // this.$store.getters.***
        // 相当于 计算属性， 也相当于 filters
        getAllCount(state){
            var c = 0;
            state.cart.forEach(item=>{
                c += item.count
            })
            return c
        },
        getGoodsCount(state){
            var obj = {}
            state.cart.forEach(element => {
                obj[element.id] = element.count
            });
            return obj
        },
        getGoodsSelected(state){
            var obj = {}
            state.cart.forEach(element=>{
                obj[element.id] = element.selected
            })
            return obj
        },
        getGoodsCountAndAmount(state){
            var obj = {
                count: 0,   // 勾选的数量
                amount: 0   // 勾选的总量
            }
            state.cart.forEach(element=>{
                if(element.selected){
                    obj.count += element.count
                    obj.amount += element.count * element.price
                }
            })
            return obj
        }
    }
});

// 导入格式化时间的插件
import moment from 'moment'

// 2.1 导入 axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// 2.2 安装 axios
Vue.use(VueAxios, axios)
// 设置请求的根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3005';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 按需导入 Mint-UI 中的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

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

import app from './App.vue'
// 1.3 导入自己的 router.js 路由模块
import router from './router.js'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

// 定义全局的过滤器
Vue.filter('dataFormat', function(dataStr, pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

var vm = new Vue({
    el: '#app',
    render: c=>c(app),
    router: router,  // 1.4 挂载路由对象到 vm 实例上
    store: store    // 挂载 store 状态管理对象
});