<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsinfo/' + item.id ">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{ item.title }}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{ item.add_time | dataFormat }}</span>
                            <span>点击: {{ item.click }}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            newslist: []
        }
    },
    created(){
        this.getNewslist()
    },
    methods: {
        getNewslist(){
            this.axios.get('/api/getnewslist').then(result => {
                if(result.data.status === 0 ){
                    // 成功了
                    this.newslist = result.data.message
                }else {
                    // 失败的
                    Toast({
                        message: '加载新闻失败',
                        duration: 2000
                    })
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.mui-table-view {
    h1{
        font-size: 14px;
    }
    .mui-ellipsis{
        font-size: 12px;
        color: '#226aff';
        display: flex;
        justify-content: space-between;
    }
}
</style>
