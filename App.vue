<script>
	import region from "./data";
	export default {
		onLaunch: function() {
			uni.setStorageSync("region", region);
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	
	@import "main.css";
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}
	/* #endif */
	
	.brg{ /* 登陆页面的背景 */
		background: url(static/background.jpg) no-repeat;
		background-size: 100%;
	}
	uni-page-head{ /* 隐藏uniapp自带的导航栏 */
		display: none;
	}
	html,body,p,div,ul,input,img,view,image{
	  margin: 0;
	  padding: 0;
	}
	ul{
	  list-style: none;
	}
	input{
	  outline: none;
	}
	button{
	  border: none;
	  outline: none;
	}
	a{
	  color: black;
	  text-decoration: none;
	}
	#app {
	  font-family: Avenir, Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  text-align: center;
	  color: #2c3e50;
	}
</style>
