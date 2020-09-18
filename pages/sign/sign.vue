<template>
  <div class="hello">
    <!-- 界面上方文字 -->
    <div class="text">
	  <p class='kong'></p>
      <p class="one">轩然</p>
      <p class="two">Xuan Ran</p>
      <p class="three">认真做绿化 踏实做品质</p>
    </div>
    <!-- 主体部分 -->
    <div class="main">
      <div class="box">
        <div>
          <div class="kong"></div>
          <div class="top">
            <div v-show='num != 2' v-for="(item, index) in tabs" :key="index" :class="{active:num==index}" @click="table(index)">
				<text>{{ item }}</text>
				<div :class="{ block:num == index }"></div>
			</div>
			<div class='modification active' v-if='num==2' >
				<text>修改密码</text>
				<div :class="{ block:num == 2 }"></div>
			</div>
          </div>
          <ul class="conent">
            <li class="sign_in" v-show="num == 0">
              <form action="" method="post">
                <p>输入手机号码</p>
                <input type="text" placeholder="输入手机号码" id="accounts">
                <p>输入验证码</p>
                <input type="text" placeholder="输入8-16位密码" id="password">
                <p type="default" class="forget" @click='forget'>忘记密码？</p>
				<button class="sign_btn" @click="goInd">登录</button>
              </form>
              <div class="other">
                <p>金 山 银 山 不 如 绿 水 青 山</p>
                <div></div>
                <p>第三方登录</p>
                <a href="javascript:;" style='margin-left: 24px;'>
					<image :src="require('../../static/weixin.png')" mode=""></image>
				</a>
                <a href="javascript:;">
					<image :src="require('../../static/weibo.png')" mode=""></image>
				</a>
                <a href="javascript:;">
					<image :src="require('../../static/dingding.png')" mode=""></image>
				</a>
              </div>
            </li>
            <li class="register" v-show="num == 1"> 
              <form action="" method="post">
                <p>输入手机号码</p>
                <input type="text" placeholder="输入手机号码">
				<p>输入验证码</p>
				<div class='get'>
					<input type="text" placeholder="输入6位短信验证码" id="password">
					<button type="default" class="re_code">获取验证码</button>
				</div>
				<p>输入密码</p>
				<input type="text" placeholder="输入8-16位密码" />
				<p>再次输入密码</p>
				<input type="text" placeholder="输入8-16位密码" />
                <button class="register_btn">立即注册</button>
              </form>
            </li>
			<li class='xg register' v-show='num == 2'>
				<form action="" method="post">
				  <p>输入手机号码</p>
				  <input type="text" placeholder="输入手机号码">
					<p>输入验证码</p>
					<div class='get'>
						<input type="text" placeholder="输入6位短信验证码" id="password">
						<button type="default" class="re_code">获取验证码</button>
					</div>
					<p>输入新密码</p>
					<input type="text" placeholder="输入8-16位密码" />
					<p>再次输入密码</p>
					<input type="text" placeholder="输入8-16位密码" />
				  <button @click="goSign" class="register_btn">确认修改</button>
				</form>
			</li>
		  </ul>
        </div>

        
      </div>

    </div>


  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      tabs: ['登录', '注册'],
      num: 0, // 控制 '登录' '注册' '修改密码' 三个功能的显示隐藏
    }
  },
  methods: {
    table(index) {
      this.num = index;
	  console.log(this.num)
    },
	goInd() {
		uni.switchTab({
			url: '../ind/ind'
		})
	},
	forget() {
		this.num = 2
	},
	goSign() {
		this.num = 0
	},
  },
  onShow() {
	  
  },onHide() {
	  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	
	/* uni-page-body{
		height: 100%;
	} */
  .hello{
    width: 100%;
    height: 100%; 
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: url(../../static/background.jpg) no-repeat;
	background-size: 100% 100%;
  }
  .text{
    width: 100%;
    /* border: 1px solid red; */
    text-align: left;
    /* padding-left: 5%; */
    /* margin-top: 6%; */
	text-indent: 5%;
	font-family: '微软雅黑';
  }
  .one{
    font-size: 20px;
    font-weight: bolder;
  }
  .three{
    color:#939393;
	font-size: 14px;
  }

  .main{
    width: 600rpx;
    height: 900rpx;
    /* border: 1px solid red; */
	position: absolute !important;
	top: 50%;
	left: 50%;
	margin-top: -370rpx;
	margin-left: -300rpx;
    border-radius: 8px;
    box-shadow: #adadad 1px 1px 10px 0px;
	background-color: white;
    position: relative;
  }
  .box{
    width: 80%;
    height: 60%;
    margin: 40rpx auto;
  }
  .kong{
    height: 52rpx;
  }
  .top{
    width: 100%;
    height: 60rpx;
	line-height: 60rpx;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 2px solid #DCDCDC;
    position: relative;
    padding-bottom: 8rpx;
	margin-bottom: 40rpx;
  }
  .top>div{
	  div{
	  	width: 55px;
	  	height: 3px;
	  	background: #3F5DE3;
	  	position: absolute;
	  	left: -22rpx;
	  	bottom: -1rpx;
	  	display: none;
	  }
  }
  .top .modification{
	  position: absolute;
	  left: 2rpx;
	  bottom: 0rpx;
	  div{
		  left: 0;
		  bottom: 0rpx;
		  width: 120rpx;
	  }
  }
  .top>div:nth-of-type(1){
    position: absolute;
    bottom: 0;
    left: 60rpx;
  }
  .top>div:nth-of-type(2){
    padding-left: 20rpx;
    padding-right: 22rpx;
	position: absolute;
	right: 60rpx;
	top: 14%;
	div{
		left: -.5rpx;
	}
  }
  .top .block{
	  display: block;
  }
  .top .active{
    color: #3F5DE3;
  }
  .conent .sign_in{
    padding-top: 20rpx;
    text-align: left;
  }
  .conent .sign_in #accounts{
	  border: 1px solid #C3C3C3;
	  padding: 8rpx;
	  border-radius: 16rpx;
	  height: 60rpx;
	  line-height: 60rpx;
	  width: 100%;
	  font-size: 15px;
  }
  .conent .sign_in p{
    font-weight: bold;
	font-size: 13px;
	margin-top: 40rpx;
	margin-bottom: 8rpx;
	margin-left: 12rpx;
  }
  .conent .sign_in p:nth-of-type(1){
	  margin-top: 0rpx;
  }
  .conent .sign_in #password{
    width: 100%;
    height: 60rpx;	  
	line-height: 60rpx;
    margin-right: 20rpx;
	border: 1px solid #C3C3C3;
	padding: 8rpx;
	border-radius: 16rpx;	  
	font-size: 15px;
  }
  .conent .sign_in p.forget{
	font-size: 12px;
	text-align: right;
    color: #C3C3C3;
	margin-top: 20rpx;
	margin-right: 0px;
  }
  .sign_btn{
    width: 60%;
    height: 84rpx;
	line-height: 84rpx;
	font-size: 18px;
    position: absolute;
    left: 50%;
    bottom: -44rpx;
    margin-left: -180rpx;
    background: #3F5DE3;
    color: white;
    border-radius: 48rpx;
    border: none;
	text-align: center;
  }
  .other{
    width: 560rpx;
	position: absolute;
	left: 50%;
	bottom: 6%;
	margin-left: -280rpx;
    text-align: center;
  }
  .other p:nth-of-type(1){
    font-size: 14px;
    color: black;
    font-weight: bold;
  }
  .other p:nth-of-type(2){
    font-size: 12px;
	font-weight: 400;
    margin: 20rpx;
    color: #999494;
  }
  .other>div{
    width: 50%;
    margin: 16rpx auto;
    border: 1px solid #DCDCDC;
	border-top: none;
  }
  .other a{
    display: inline-block;
    width: 50rpx;
    height: 50rpx;
    margin-right: 48rpx;
  }
  .other a:nth-of-type(1){
    margin-left: 8rpx;
  }
  .other image{
    width: 100%;
    height: 100%;
  }
  .register{
    width: 100%;
    height: 460rpx;
    margin: 20rpx auto;
	/* border: 1px solid red; */
	text-align: left;
	font-size: 15px;
	position: relative;
  }
  .register p{
	  font-size: 13px;
	  margin-top: 40rpx;
	  margin-bottom: 8rpx;
	  margin-left: 12rpx;
	  font-weight: bold;
  }
  .register p:nth-of-type(1){
	  padding-top: 20rpx;
  }
  .register input{
    width: 100%;
    height: 60rpx;    
	line-height: 60rpx;
    border-radius: 24rpx;
    text-align: left;
    padding-left: 60rpx;
    font-size: 15px;
	border: 1px solid #C3C3C3;
	padding: 8rpx;
	border-radius: 16rpx;
  }
  .register div image{
    width: 40rpx;
    height: 40rpx;
    position: absolute;
    left: 16rpx;
    top: 50%;
    margin-top: -20rpx;
  }
  .register #password{
	  width: 60%;
	  height: 60rpx;
	  line-height: 60rpx;
	  font-size: 15px;
	  margin-right: 30rpx;
	  border: 1px solid #C3C3C3;
	  padding: 8rpx;
	  border-radius: 16rpx;
  }
  .register .re_code{
	  width: 30%;
	  height: 78rpx;
	  line-height: 80rpx;
	  font-size: 12px;
	  text-align: center;
	  background: #3F5DE3;
	  color: white;
	  border-radius: 8rpx;
	  padding: 0 0rpx;
	  border: none;
  }
  .register .register_btn{	
	width: 75%;
	margin-left: -180rpx;
	height: 84rpx;
	position: absolute;
	left: 50%;
	bottom: -284rpx;
	font-size: 18px;
	font-weight: normal;
	background: #3F5DE3;
	color: white;
	border-radius: 48rpx;
	border: none;
	text-align: center;
  }
  .get{
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
  }
</style>
