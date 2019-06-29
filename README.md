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

## 改造 新闻资讯 路由链接

## 新闻资讯 页面 制作
1. 绘制界面，使用 MUI 中的 media-list.html
2. 使用 axios 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link，同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在 路由模块 中， 将 新闻详情的 路由地址 和 组件页面 对应起来

## 实现 新闻详情 的 页面布局 和 数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中，先手动 导入 comment 组件
  + `import comment from './comment.vue'`
3. 在父组件中，使用 `components` 属性，将刚才导入的 comment 组件，注册为自己的 子组件
4. 将注册子组件时候的，注册名称，以 标签形式，在页面中 引用即可

## 获取所有的评论数据显示到页面中
1. getComments

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页 数据
2. 点击 加载更多，让 pageIndex++ ,然后重新调用 this.getComments() 方法重新获取最新一页的数据
3. 为了防止 新数据 覆盖 老数据的情况，在 点击加载更多 的时候，每当获取到新数据，应该让 老数据
调用 数组的 concat 方法，拼接上新数组

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个时间
3. 校验评论内容是否为空，如果为空，则Toast提示用户，评论内容不能为空
4. 通过 axios 发送一个请求，把评论内容提交给 服务器
5. 当发表评论ok后，重新刷新列表，以查看最新的评论
 + 如果调用 getComments 方法重新刷新评论列表的话，可能只能得到 最后一页的评论，前几页的评论获取不到
 + 换一种思路： 当评论成功后，在客户端，手动拼接出一个 最新的 评论对象，然后，调用数组的
 unshift 方法，把最新的评论，追加到 data 中 comments 的开头；这样，就能 实现评论列表的需求

 ## 改造图片分享 按钮为 路由的链接并显示对应的组件页面

 ## 绘制 图片列表 组件页面结构并美化样式
 1. 制作 顶部的滑动条
 2. 制作 底部的图片列表

### 制作顶部滑动条的坑：
1. 需要借助 MUI 中的 tab-top-webview-main.html
2. 需要把 slider 区域的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是一个 JS 组件，需要被初始化:
  + 导入 mui.js
  + 调用官方提供的 方式 去初始化：
  ```
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  ```
4. 在初始化 滑动条 的时候，导入的 mui.js , 但是控制台报错: `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`
  + 经过推测，可能是 mui.js 中用到了 'caller', 'callee', and 'arguments'， 但是 webpack 打包好的 bundle.js 中，
  默认是启用严格模式的，这两者冲突
  + 解决方案： 1. 把 mui.js 中的 非严格 模式的代码改掉，不现实；2、 把 webpack 打包时的严格模式禁用掉
  + 最终，选择方案2 ，移除严格模式: 方法1：
    - 安装 @babel/plugin-transform-modules-commonjs @babel/plugin-transform-strict-mode
    - 修改设置 plugins: [["@babel/plugin-transform-modules-commonjs", { "strictMode": false }]]
  + 方法2：在 options 中 添加 igonre 属性 ignore: ["./src/lib/mui/js/*.js"] // 数组中加需要忽略的文件路径
5. 刚进入 图片分享 页面的时候，滑动条无法正常工作，如果要初始化滑动条，必须要等DOM元素加载完毕，所以要把初始化这个过程放在 mounted 中；
6. 当 滑动条 调式 OK 后，发现， tabbar 无法正常工作，需要把每个 tabbar 按钮的样式中 `mui-tab-item` 重新改名

7. 获取所有分类，并渲染 分类列表

### 制作图片列表区域
1. 图片列表需要使用 懒加载 技术，使用 mint-ui 提供的组件 `lazy-load`
2. 根据 `lazy-load` 的使用文档，尝试使用
3. 渲染图片列表数据

### 实现了 图片列表的 懒加载 改造和 样式美化

## 实现了 点击图片 跳转到 图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为 li 标签


## mint-ui 中 Toast 的坑，使用的2种方式，一种方式不行用另一种，可能两种方式都行，怎么选还不清楚
1. 方式1：在各自页面中导入 Toast，并直接用Toast()作为函数调用；
2. 当第1种方式不行时，出现下面的报警，要用第2种方式
```
[Vue warn]: Error in v-on handler: "ReferenceError: _Toast is not defined"
ReferenceError: _Toast is not defined
```
3. 方式2：在 main.js 中导入Toast，然后 Vue.prototype.$toast = Toast, 在各自页面调用时，用this.$toast()作为函数调用

## 实现 详情页面 的布局和美化，同时获取数据渲染页面

## 实现 图片详情中 缩略图的功能
1. 使用 插件 vue-preview 这个缩略图插件
2. 获取到所有的图片列表， 使用 vue-preview 中的 :sliders 进行绑定
3. 注意： 每个图片数据对象中，必须有 w 和 h 属性

## 绘制 商品列表 页面基本结构并美化

## 尝试在手机上进行 项目的预览和测试
1. 保证自己的手机可以正常运行；
2. 保证 手机 和 开发项目 的电脑处于同一个 WIFI， 手机 可以 访问到 电脑的 ip
3. 打开自己的 项目中 package.json 文件，在 start 脚本中，添加一个 --host 指令，把 当前电脑的
 WIFI IP 地址，设置为 --host 的指令值
4. 查看自己电脑所处ip，在 cmd 中运行 `ipconfig` 查看 无线网 IP 地址
