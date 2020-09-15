<template>
  <div class="hello">
    <!-- 界面上方文字 -->
    <div class="text">
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
            <span v-for="(item, index) in tabs" :key="index" :class="{active:num==index}" @click="table(index)">{{ item }}</span>
          </div>
          <ul class="conent">
            <li class="sign_in" v-show="num == 0">
              <form action="" method="post">
                <p>输入手机号码</p>
                <input type="text" value="输入手机号码\帐号\邮箱" placeholder="输入手机号码\帐号\邮箱" id="accounts" style="height:25px;width:200px;font-size: 10px;">
                <p>输入验证码</p>
                <input type="text" value="输入6位短信验证码" placeholder="输入6位短信验证码" id="password">
                <input type="button" value="获取验证码" class="button">
				<navigator url="../ind/ind">
					<input type="submit" value="登录" class="sign_btn">
				</navigator>
              </form>
              <div class="other">
                <p>金 山 银 山 不 如 绿 水 青 山</p>
                <div></div>
                <p>第三方登录</p>
                <a href="javascript:;"><img src="../../static/weixin.png" alt=""></a>
                <a href="javascript:;"><img src="../../static/weibo.png" alt=""></a>
                <a href="javascript:;"><img src="../../static/dingding.png" alt=""></a>
              </div>
            </li>
            <li class="register" v-show="num == 1"> 
              <form action="" method="post">
                <p>输入昵称</p>
                <input type="text" value="输入昵称" style="height:25px;width:200px;font-size: 10px;">
                <p>输入手机号码</p>
                <input type="text" value="输入手机号码">
				<p>输入验证码</p>
				<input type="text" value="输入6位短信验证码" id="password" style="width: 110px;">
                <input type="button" value="获取验证码" class="re_code">
                <input type="submit" value="立即注册" class="register_btn">
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
      num: 0,
    }
  },
  methods: {
    table(index) {
      this.num = index;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    padding-left: 5%;
    margin-top: 6%;
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
    padding-left: 8px;
    padding-right: 10px;
  }
  .top .active{
    color: #3F5DE3;
    border-bottom: 2.5px solid #3F5DE3;
  }
  .top span:nth-of-type(2){
    position: absolute;
    right: 30px;
    top: 18%;
  }
  .conent .sign_in{
    padding-top: 10px;
    padding-left: 6px;
    text-align: left;
  }
  .conent .sign_in #accounts{
	  border: 1px solid #C3C3C3;
	  padding: 4px;	  
	  color: #C3C3C3;
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
    width: 50%;
    height:25px;
    font-size: 12px;	  
	color: #C3C3C3;
    margin-right: 10px;
	border: 1px solid #C3C3C3;
	padding: 4px;
	border-radius: 8px;
  }
  .button{
	width: 22%;
    height: 25px;
	position: absolute;
	right: 18%;
	top: 45.3%;
	font-size: 12px;
	text-align: center;
    background:#3F5DE3;
    color: white;
    border-radius: 4px;
    padding: 4px;
    border: none;
  }
  .sign_btn{
    width: 60%;
    margin-left: -90px;
    height: 50px;
    position: absolute;
    left: 50%;
    bottom: -26px;
    background: #3F5DE3;
    color: white;
    border-radius: 24px;
    border: none;
	text-align: center;
  }
  .other{
    width: 80%;
    margin: 80px auto;
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
  .other img{
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
	font-weight: bold;
	padding-left: 2px;
  }
  .register p{
	  font-size: 13px;
	  margin-top: 20px;
	  margin-bottom: 4px;
	  margin-left: 6px;
  }
  .register div{
    width: 90%;
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    position: relative;
  }
  .uni-input-placeholder.input-placeholder{
	  display: none;
  }
  .register input{
    width: 84%;
    height: 25px;    
	line-height: 30px;
    border-radius: 12px;
    text-align: left;
    padding-left: 30px;
    color: #C3C3C3;
    font-size: 12px;
	border: 1px solid #C3C3C3;
	padding: 4px;
	border-radius: 8px;
  }
  .register div img{
    width: 20px;
    height: 20px;
    position: absolute;
    left: 8px;
    top: 50%;
    margin-top: -10px;
  }
  .register #password{
	  width: 40%;
	  height:25px;
	  font-size: 12px;
	  margin-right: 10px;
	  border: 1px solid #C3C3C3;
	  padding: 4px;
	  border-radius: 8px;
  }
  .register .re_code{
    width: 74px;
    height: 26px;
	text-align: center;
    border: none;
    color: white;
	background: #3F5DE3;
    position: absolute;
    right: 60px;
    top: 59.8%;
  }
  .register .register_btn{	
	width: 59.6%;
	margin-left: -90px;
	height: 42px;
	position: absolute;
	left: 50%;
	font-size: 18px;
	font-weight: normal;
	bottom: -26px;
	background: #3F5DE3;
	color: white;
	border-radius: 24px;
	border: none;
	text-align: center;
  }
</style>
