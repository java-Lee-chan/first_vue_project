<template>
<!-- 问题：不知道什么时候能够拿到 max 值，但是总归有一刻会得到真正的 max 值 -->
<!-- 我们可以时候 watch 属性监听，来监听 父组件传递过来的 max 值，不管 watch 会被触发几次，但是，最后一次，肯定是合法的 max 数值 -->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
    <!-- 分析： 子组件什么时候把数据传递给父组件 -->
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted(){
        mui(".mui-numbox").numbox()
        console.log(this.max)
    },
    methods: {
        countChanged(){
            // 每当 文本框的数据被修改，立即把最新的数据通过事件调用传递给父组件
            // console.log(this.$refs.numbox.value)
            this.$emit('getcount', parseInt(this.$refs.numbox.value))
        }
    },
    props: ['max'],
    watch:{
        // 属性监听
        'max': function(newValue, oldValue){
            // 使用 JS API 设置 numbox 的最大值
            mui(".mui-numbox").numbox().setOption('max',newValue)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
