<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!-- 商品列表项区域 -->
            <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 问题： 如果从购物车中获取商品的数量？ -->
                                <!-- 1. 先创建一个 空对象 ，然后循环购物车中所有商品的数据，把 当前循环这条商品的 Id
                                作为 对象 的属性名， count 值作为 对象的 属性值，当把所有的商品循环一遍，就会得到一个对象
                                { 88: 2, 89: 1, 90: 4} -->
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 结算区域 -->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner jiesuan">
                        <div class="left">
                            <p>总计(不含运费):</p>
                            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>件，
                            总价:<span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
                    </div>
                </div>
            </div>
        </div>
        <span>{{ $store.getters.getGoodsCount }}</span>
        <p> {{ $store.getters.getGoodsSelected }}</p>
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
        },
        remove(id, index){
            // 点击删除， 把商品从 store 中传递的 Id 删除，同时根据 index 把当前组件中的 goodslist 中对应商品 删除
            this.goodslist.splice(index, 1)
            this.$store.commit('removeFromCart', id)
        },
        selectedChanged(id, val){
            // 每当点击开关， 把最新的 开关状态，同步到 store 中
            this.$store.commit('updateGoodsSelected', {id: id, selected: val})
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
        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red {
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
}
</style>
