<template>
    <div class="app-container">
        <!-- 顶部 Header 区域 -->
        <mt-header fixed title="Vue 项目"></mt-header>
        <!-- 中间的路由 router-view 区域 -->
        <!-- <router-view></router-view> -->
        <!-- 底部 Tabber 区域 -->
        <!-- <router-link to="/search">搜索</router-link> -->
        <!-- <router-link to="/shopping">购物车</router-link> -->
        <h1>这是 App 组件</h1>
        <nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" href="#tabbar">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-chat">
				<span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">消息</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-contact">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">通讯录</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</a>
		</nav>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.app-container {
    padding-top: 40px;
}
</style>
