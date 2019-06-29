<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 在组件中，使用v-for循环一定要使用key -->
            <!-- 谁使用次 轮播图组件，谁为我们传递 lunbotuList -->
            <!-- 此时，lunbotuList 应该是 父组件向子组件传值来设置 -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.img" alt="item.url"  :class="{full: isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>

    <!-- 分析:为什么 商品评论中的 轮播图那么丑 -->
    <!-- 1. 首页中的图片，它的 宽 和 高，都使用了 100%  -->
    <!-- 2. 在商品详情页面中，轮播图的图片，如果也使用 宽高 为 100% 的话，页面不好看 -->
    <!-- 3. 商品详情页面中的轮播图，期望 高度是 100%， 但是 宽度为 自适应 -->
    <!-- 4. 经过分析，问题的原因： 首页中的 轮播图 和详情 中的轮播图，差别是 宽度到底是 100% 还是 自适应 -->
    <!-- 5. 这两个 轮播图，其他方面都没有冲突，值是宽度有分歧，定义一个属性，让 使用轮播图的调用者，手动指定是否为 100% -->
</template>
<script>
export default {
    props: ["lunbotuList", "isfull"]
}
</script>
<style lang="scss" scoped>
.mint-swipe{
    height:200px;

    .mint-swipe-item {
        text-align: center;

        img {
            // width: 100%;
            height: 100%;
        }
    }
}
.full {
    width: 100%
}
</style>
