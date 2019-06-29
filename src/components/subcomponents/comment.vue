<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最多120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="i">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}发表时间：{{ item.add_time | dataFormat }}
                </div>                
                <div class="cmt-body">
                    {{ item.content == undefined? "无评论":item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from "mint-ui"
import qs from 'qs'
export default {
    data(){
        return {
            pageIndex: 1,    // 默认展示第1页数据
            comments: [],   // 所有的评论数据
            msg: '' // 评论输入的内容
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
        },
        postComment(){ 
            // 校验是否为空对象
            if (this.msg.trim().length === 0 ){
                return this.$toast("评论内容不能为空")
            }

            // 发表评论
            // 请求的方式
            // 请求的URL地址
            // 提交给服务器的数据对象 { content: this.msg }
            // 定义提交时候，表单中数据的格式 (application / x-www-form-urlencoded)
            const data = { content: this.msg.trim() }
            const options = {
                method: 'post',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url: '/api/postcomment/' + this.id
            }
            this.axios(options).then(result => {
                // console.log(result)
                if(result.data.status === 0 ){
                    // 1. 拼接出一个评论对象
                    var cmt = {
                        user_name: '匿名用户', 
                        add_time: Date.now(), 
                        content: this.msg.trim() 
                    }
                    this.comments.unshift(cmt)
                    this.msg = ''
                }else {
                    this.$toast('评论发表失败')
                }
            })
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
