# 这是第一个 Vue 的项目

## [主流开源协议之间有何异同?](https://www.zhihu.com/question/19568896)

## 用（传统方式）命令行把修改过后的代码上传到 github
1. git add .
2. git commit -m "提交信息"
3. git push -u origin master

## 制作首页App组件
1. 完成 Header 区域，使用 Mint-UI 中的 Header 组件
2. 制作底部的 Tabbar 区域，使用 MUI 的 Tabbar.html
  + 在制作 购物车 小图标的时候，操作会相对多一些；
  + 先把 拓展图标的 css 样式，拷贝到 项目中；
  + 拷贝 拓展字体库 ttf 文件，到项目中
  + 为 购物车 图标，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件


## 改造 tabbar 为 router_link

## 设置 路由 高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作 首页 轮播图 布局

## 加载首页轮播图数据
1. 获取数据，如何获取呢？ 使用 axios 和 vue-axios
2. 使用 axios 的 this.$http.get 获取数据
3. 获取到的数据，保存到 data 身上
4. 使用 v-for 循环渲染每个 item 项

## 改造 九宫格 区域的样式