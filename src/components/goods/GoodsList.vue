<template>
    <div class="goods-list">
        <div class="goods-item">
            <img src="http://gw.alicdn.com/bao/uploaded/i4/2616108292/O1CN01p5IQ0i2B7mfUkTEf1_!!2616108292.jpg">
            <h1 class="title">华为手机</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥2195</span>
                    <span class="old">￥2499</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="http://gw.alicdn.com/bao/uploaded/i4/2616108292/O1CN01p5IQ0i2B7mfUkTEf1_!!2616108292.jpg">
            <h1 class="title">华为手机2222222222222222222222</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥2195</span>
                    <span class="old">￥2499</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="http://gw.alicdn.com/bao/uploaded/i4/2616108292/O1CN01p5IQ0i2B7mfUkTEf1_!!2616108292.jpg">
            <h1 class="title">华为手机</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥2195</span>
                    <span class="old">￥2499</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 7px;
    .goods-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 310px;
        img {
            width: 100%;
        }
        .title {
            font-size: 14px;
        }
        .info {
            background-color: #eee;
            p {
                margin: 0;
                padding: 5px;
            }
            .price {
                .now {
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old {
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
}
</style>
