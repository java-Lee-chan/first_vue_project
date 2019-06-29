<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dataFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <vue-preview :slides="slide1" @close="handleClose" style="height: 100px width:100px"></vue-preview>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>
        <hr>
        <!-- 放置现成的评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>
<script>
// 1. 导入评论子组件 
import comment from '../subcomponents/comment.vue'
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            id: this.$route.params.id,  // 从路由中获取到的图片id
            photoinfo: {}, // 图片详情
            slide1: [  // 缩略图的数组

            ]
        }
    },
    created(){
        this.getPhotoInfo()
        this.getThumbs()
    },
    methods: {
        getPhotoInfo(){ //获取图片的详情
            this.axios({
                url: '/api/getimageInfo/' + this.id
            }).then(result => {
                if(result.data.status == 0){
                    this.photoinfo = result.data.message[0]
                }else {
                    Toast("图片详情加载失败")
                }
            })
        },
        getThumbs(){    // 获取缩略图
            this.axios.get('/api/getthumimages/' + this.id).then(result => {
                if(result.data.status == 0){
                    // 循环每个图片数据，补全图片的宽和高等属性
                    result.data.message.forEach(element => {
                        element.w = 600
                        element.h = 400
                        element.src = element.src
                        element.msrc = element.src
                    });
                    // 把完整的数据保存到 slider1 中
                    this.slide1 = result.data.message
                }
            })
        },
        handleClose(){
            // console.log('close event')
        }
    },
    components: {   //2. 注册评论子组件
        'cmt-box': comment
    }
}
</script>
<style lang="scss">
.photoinfo-container{
    padding: 3px;
    h3 {
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle {
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        
    }
    .content {
        font-size: 13px;
        line-height: 30px;
    }
    .my-gallery{
        figure {
            display: inline;
            margin: 0;
            a {
                img {
                    width:30%;
                    height:30%;
                    margin: 0 1.2%;
                    box-shadow: 0 0 8px #999;
                }
            }
        }
    }
}
</style>
