<template>
    <div class="goodsinfo-container">
        
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbolist" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价: <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;
                        销售价：<span class="now-price">￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
                        <!-- 1. 按钮属于 goodsinfo 页面，数字 属于 numbbox 组件 -->
                        <!-- 2. 涉及到了 父子组件 的嵌套，无法直接在 goodsinfo 页面中 获取到 选中的商品数量值 -->
                        <!-- 3. 如何解决？涉及到 子组件向父组件传值（事件调用机制） -->
                        <!-- 4. 事件调用的本质：父向子传递方法，子调用这个方法，同时把 数据当作参数 传递给这个方法 -->
                    </p>
                </div>
            </div>
        </div>
        
        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsinfo.add_time | dataFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import swiper from '../subcomponents/swiper.vue'
// 导入 数字选择框 组件
import numbox from '../subcomponents/goodsinfo_numbox.vue'
export default {
    data(){
        return {
            id: this.$route.params.id,
            lunbolist:[],   // 轮播图的数据
            goodsinfo: {},  // 获取到的商品的信息
            ballFlag: false, // 控制小球的隐藏和显示的标识符
            selectedCount: 1    // 保存用户选中的商品数量，默认为1
        }
    },
    created(){
        this.getLunbo()
        this.getGoodsInfo()
    },
    methods: {
        getLunbo(){
            this.axios.get('/api/getthumimages/' + this.id).then(result => {
                if(result.data.status == 0){
                    this.lunbolist = result.data.message;
                    // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识
                    // item.img , 不认识 item.src
                    this.lunbolist.forEach(element => {
                        element.img = element.src
                    });
                }
            })
        },
        getGoodsInfo(){
            this.axios.get('/api/goods/getinfo/' + this.id).then(result => {
                if(result.data.status == 0 ){
                    this.goodsinfo = result.data.message[0]
                }
            })
        },
        goDesc(id){
            // 点击使用编程式导航跳转到 图文介绍页面
            this.$router.push({ name: 'goodsdesc', params: { id }})
        },
        goComment(id){
            // 点击使用编程式导航跳转到 评论页面
            this.$router.push({ name: 'goodscomment', params: { id }})
        },
        addToShopCar(){
            // 添加到购物车
            this.ballFlag = !this.ballFlag
            // 商品对象：{id: id, count: 数量, price: price,selected: 是否被选中}
            // 拼接出一个，要保存到 store 中 cart 数组里的 商品信息对象
            var goodsinfo = { 
                id: this.id, 
                count: this.selectedCount, 
                price: this.goodsinfo.sell_price, 
                selected: true 
            };
            // 调用 store 中的 mutations 来讲商品加入购物车
            this.$store.commit('addToCart', goodsinfo)

        },
        beforeEnter: (el) => {
            el.style.transform = "translate(0, 0)"
        },
        enter(el, done){
            el.offsetWidth;

            // 小球动画优化思路：
            // 1. 分析导致 动画 不准确的 本质原因：小球 最终位置 已经局限在了 某一分辨率 下的 滚动条未滚动 的情况下
            // 2. 只要分辨率 和 测试的时候 不同，或者，滚动条 滚动了一定距离，问题就出现了
            // 3. 经过分析，不能把 位置的横纵坐标 直接写死，应该根据不同情况，动态计算这个坐标值 
            // 4. 通过 徽标 的 横纵坐标 和 小球 的 横纵坐标，两者相减，就是横纵坐标要位移的距离
            // 5. 如何 获取 徽标 和小球的位置??     domObject.getBoundingClientRect()

            // 获取 小球 在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取 徽标 在页面中的位置
            const badgePosition = document.getElementById("badge").getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`
            el.style.transition = "all 0.5s cubic-bezier(0.4, -0.3, 1, 0.68)"
            done()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag
        },
        getSelectedCount(count){
            // 当子组件 把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
            this.selectedCount = count;
            // console.log('数量为：'+ this.selectedCount)
        }
    },
    components: {
        swiper,
        numbox
    }
}
</script>
<style lang="scss" scoped>
.goodsinfo-container {
    background-color: #eee;
    overflow: hidden;

    .now-price {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }

    .mui-card-footer {
        display: block;
        button {
            margin: 15px 0;
        }
    }
    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 148px;
    }
}
</style>
