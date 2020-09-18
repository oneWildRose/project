<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	  
	}
</script>

<style>
	/*每个页面公共css */
	
	/* 隐藏uniapp自带的导航栏 */
	uni-page-head{ 
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
