<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最多120字）" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="i">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}发表时间：{{ item.add_time | dataFormat }}
                </div>                
                <div class="cmt-body">
                    {{ item.content == ""? "无评论":item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            pageIndex: 1,    // 默认展示第1页数据
            comments: []
        }
    },
    created(){
        this.getComments()
    },
    methods: {
        getComments(){  // 获取评论
            this.axios.get('/api/getcomments/' + this.id + '?pageindex=' + this.pageIndex).then(result => {
                if(result.data.status === 0 ){
                    // this.comments = result.data.message
                    // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
                    this.comments = this.comments.concat(result.data.message)
                }else {
                    Toast('获取评论失败')
                }
            })
        },
        getMore(){
            this.pageIndex ++ 
            this.getComments()
        }
    },
    props:["id"]
}
</script>
<style lang="scss" scoped>
.cmt-container {
    h3 {
        font-size: 18px;
    }
    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list {
        margin: 5px 0;
        .cmt-item {
            font-size: 13px;
            .cmt-title {
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body {
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>
