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
            <span v-show='num != 2' v-for="(item, index) in tabs" :key="index" :class="{active:num==index}" @click="table(index)">{{ item }}</span>
			<span class='modification active' v-if='num==2' >修改密码</span>
          </div>
          <ul class="conent">
            <li class="sign_in" v-show="num == 0">
              <form action="" method="post">
                <p>输入手机号码</p>
                <input type="text" placeholder="输入手机号码" id="accounts" style="height:40px;width:100%;font-size: 10px;">
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
				<input type="text" placeholder="输入6位短信验证码" id="password">
				<button type="default" class="re_code">获取验证码</button>
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
					<input type="text" placeholder="输入6位短信验证码" id="password">
					<button type="default" class="re_code">获取验证码</button>
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
<style scoped>
	
	uni-page-body{
		height: 100%;
	}
  .hello{
    width: 100%;
    height: 100%; 
	background: url(../../static/background.jpg) no-repeat;
	background-size: 100%;
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
    width: 300px;
    height: 450px;
    /* border: 1px solid red; */
    margin: 130px auto;
    position: relative;
    border-radius: 2px;
    box-shadow: #D2D2D2 1px 2px 4px 2px;
	background-color: white;
  }
  .box{
    width: 80%;
    height: 60%;
    /* border: 1px solid red; */
    margin: 20px auto;
  }
  .top{
    width: 100%;
    height: 30px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 2px solid #DCDCDC;
    position: relative;
    padding-bottom: 4px;
	margin-bottom: 34px;
  }
  .top .modification{
	  position: absolute;
	  left: 2px;
	  bottom: 0;
  }
  .kong{
    height: 26px;
  }
  .top span{
    padding-bottom: 6px;
  }
  .top span:nth-of-type(1){
    position: absolute;
    top: 18%;
    left: 30px;
    display: block;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 5px;
  }
  .top span:nth-of-type(2){
    padding-left: 10px;
    padding-right: 11px;
	position: absolute;
	right: 30px;
	top: 17%;
  }
  .top .active{
    color: #3F5DE3;
    border-bottom: 2.5px solid #3F5DE3;
  }
  .conent .sign_in{
    padding-top: 10px;
    text-align: left;
  }
  .conent .sign_in #accounts{
	  border: 1px solid #C3C3C3;
	  padding: 4px;	  
	  /* color: #C3C3C3; */
	  border-radius: 8px;
  }
  .conent .sign_in p{
    font-weight: bold;
	font-size: 13px;
	margin-top: 20px;
	margin-bottom: 4px;
	margin-left: 6px;
  }
  .conent .sign_in p:nth-of-type(1){
	  margin-top: 0px;
  }
  .conent .sign_in #password{
    width: 100%;
    height: 40px;
    font-size: 12px;	  
	/* color: #C3C3C3; */
    margin-right: 10px;
	border: 1px solid #C3C3C3;
	padding: 4px;
	border-radius: 8px;
  }
  .conent .sign_in p.forget{
	font-size: 12px;
	text-align: right;
    color: #C3C3C3;
	margin-top: 10px;
	margin-right: 0px;
  }
  .sign_btn{
    width: 60%;
    margin-left: -90px;
    height: 42px;
	font-size: 18px;
    position: absolute;
    left: 50%;
    bottom: -22px;
    background: #3F5DE3;
    color: white;
    border-radius: 24px;
    border: none;
	text-align: center;
  }
  .other{
    width: 80%;
    margin: 50px auto;
    text-align: center;
  }
  .other p:nth-of-type(1){
    font-size: 14px;
    color: black;
    font-weight: bold;
  }
  .other p:nth-of-type(2){
    font-size: 12px;
    margin: 10px;
    color: #999494;
  }
  .other>div{
    width: 80%;
    margin: 4px auto;
    border: 1px solid #DCDCDC;
  }
  .other a{
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 24px;
  }
  .other a:nth-of-type(1){
    margin-left: 4px;
  }
  .other image{
    width: 100%;
    height: 100%;
  }
  .register{
    width: 100%;
    height: 230px;
    margin: 10px auto;
	/* border: 1px solid red; */
	text-align: left;
	font-size: 14px;
  }
  .register p{
	  font-size: 13px;
	  margin-top: 20px;
	  margin-bottom: 4px;
	  margin-left: 6px;
	  font-weight: bold;
  }
  .register p:nth-of-type(1){
	  padding-top: 10px;
  }
  .register input{
    width: 100%;
    height: 40px;    
	line-height: 40px;
    border-radius: 12px;
    text-align: left;
    padding-left: 30px;
    /* color: #C3C3C3; */
    font-size: 12px;
	border: 1px solid #C3C3C3;
	padding: 4px;
	border-radius: 8px;
  }
  .register div image{
    width: 20px;
    height: 20px;
    position: absolute;
    left: 8px;
    top: 50%;
    margin-top: -10px;
  }
  .register #password{
	  width: 60%;
	  height:40px;
	  font-size: 12px;
	  margin-right: 10px;
	  border: 1px solid #C3C3C3;
	  padding: 4px;
	  border-radius: 8px;
  }
  .register .re_code{
	  width: 24%;
	  height: 39px;
	  line-height: 40px;
	  position: absolute;
	  right: 11%;
	  top: 47%;
	  font-size: 12px;
	  text-align: center;
	  background:#3F5DE3;
	  color: white;
	  border-radius: 4px;
	  padding: 0 4px;
	  border: none;
  }
  .register .register_btn{	
	width: 59.6%;
	margin-left: -90px;
	height: 42px;
	position: absolute;
	left: 50%;
	bottom: -22px;
	font-size: 18px;
	font-weight: normal;
	background: #3F5DE3;
	color: white;
	border-radius: 24px;
	border: none;
	text-align: center;
  }
</style>
