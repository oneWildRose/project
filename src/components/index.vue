<template>
    <div class="all">
        <div class="head">
            <img src="../assets/option.png" alt="">
            <span>首页</span>
        </div>
        <div class="seach">
            <img src="../assets/fangdajing.png" alt="">
            <input type="search" name="" id="" placeholder="搜索案例、专家、项目">
        </div>
        <div style="margin-top: 12px;margin-bottom: 12px;">
            <p>banner表达项目专家设计项目，在线专家设计项目，专业项目方案申请</p>
        </div>
        <div class="case">
            <div class="top">
                <span>推荐案例</span>
                <a href="javascript:;">更多</a>
            </div>
            <ul> <!-- 循环遍历 -->
                <li>

                </li>
            </ul>
        </div>
        <div class="footprint">
            <p>项目足迹（目前已经服务过的项目足迹）</p>
        </div>
        <div class="hot">
            <p>热点资讯</p>
        </div>
        <div class="foot">
            <a href="javascript:;" class="iconfont icon-shouye active"></a>
            <a href="javascript:;" class="iconfont icon-xinicon_huabanfuben"></a>
            <a href="javascript:;" class="iconfont icon-jiahao"></a>
            <a href="javascript:;" class="iconfont icon-ziyuan"></a>
            <a href="javascript:;" class="iconfont icon-wodeqianfenleishouye"></a>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .all{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .all .head{
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        position: relative;
    }
    .all .head img{
        width: 24px;
        height: 16px;
        position: absolute;
        left: 10px;
        top: 50%;
        margin-top: -8px;
    }
    .seach{
        width: 96%;
        height: 26px;
        line-height: 26px;
        margin: 0 auto;
        position: relative;
    }
    .seach img{
        width: 24px;
        height: 24px;
        position: absolute;
        left: 2%;
        top: 50%;
        margin-top: -12px;
    }
    .seach input{
        width: 100%;
        height: 100%;
        border: 1px solid #EDEDED;
        outline: none;
        color: #EDEDED;
        font-size: 12px;
        text-align: center;
        border-radius: 6px;
    }


    .foot{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 48px;
        line-height: 48px;
        font-size: 20px;
        border-top: 1px solid #D9D9D9;
        display: flex;
        justify-content: space-around;
    }
    .foot .active{
        color: #268FFF;
    }
</style>