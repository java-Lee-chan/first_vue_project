<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!-- 商品列表项区域 -->
            <div class="mui-card" v-for="item in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]"></numbox>
                                <!-- 问题： 如果从购物车中获取商品的数量？ -->
                                <!-- 1. 先创建一个 空对象 ，然后循环购物车中所有商品的数据，把 当前循环这条商品的 Id
                                作为 对象 的属性名， count 值作为 对象的 属性值，当把所有的商品循环一遍，就会得到一个对象
                                { 88: 2, 89: 1, 90: 4} -->
                                <a href="#">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 结算区域 -->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        11
                    </div>
                </div>
            </div>
        </div>
        <span>{{ $store.getters.getGoodsCount }}</span>
    </div>
</template>
<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data(){
        return {
            goodslist: []   // 购物车中所有商品的数据
        }
    },
    created(){
        this.getGoodsList()
    },
    methods: {
        getGoodsList(){
            // 1. 获取到 store 中所有商品的id，然后拼接出一个 用逗号分隔的字符串
            var idArr = []
            this.$store.state.cart.forEach(element => {
                idArr.push(element.id)
            });
            // 如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
            if(idArr.length <= 0){
                return;
            }
            // 获取购物车商品列表
            this.axios.get('/api/goods/getshopcarlist/' + idArr.join(',')).then(result=>{
                if(result.data.status == 0){
                    this.goodslist = result.data.message
                }
            })
        }
    },
    components:{
        numbox
    }
}
</script>
<style lang="scss" scoped>
.shopcar-container {
    .goods-list {
        background-color: #eee;
        overflow: hidden;
        .mui-card-content-inner {
            display: flex;
            align-items: center;
        }

        img {
            width: 60px;
            height: 60px;
            margin: 5px;
        }
        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            h1 {
                font-size: 13px;
                padding-left:10px;
            }
            .price {
                color: red;
                font-weight: bold;
            }
            p {
                margin: 5px;
            }
        }
    }
}
</style>
