<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			                                    //  热更新  wgt文件， 每次打包wgt文件时记得更改版本号并告知后端人员
			// #ifdef APP-PLUS 
			let that = this
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				that.$request('/api/Checkversion/detect_gwt', {
					"client_version": widgetInfo.version,
				}).then(result => {
					var data = result.data.data;
					console.log(data)
					if (data.upate == 1) {
						that.$showModal({
							title: '更新提示',
							concent: data.message,
							cancelVal: '暂不更新',
							confirmVal: '立即更新',
							cancelColor: '#A09D9D'
						}).then(res=>{
							// 立即更新
							uni.showLoading({
								title: '更新中，请勿退出'
							})
							uni.downloadFile({ // 服务器返回地址，进行下载
								url: data.url,  
								success: (downloadResult) => {
									if (downloadResult.statusCode === 200) {
										plus.runtime.install(downloadResult.tempFilePath, {
											force: false
										}, function() {
											console.log('install success...');
											uni.hideLoading()
											plus.runtime.restart();
										}, function(e) {
											console.error('install fail...');
										})
									}
								}
							})
						}).catch(cancel=>{
							// 暂不更新
						})
					} else {
						console.log('暂无更新')
					}
				})
			});
			// #endif
			
												//  整包更新  apk文件
			// //#ifdef APP-PLUS
			// 	this.$request('/api/Checkversion/detect', {
			// 		"version": plus.runtime.version
			// 	}).then(res => {
			// 		if (res.data.data.upate == 1) {
			// 			var url = res.data.data.url // 新版安装包地址
			// 			this.$showModal({
			// 				concent: res.data.data.message,
			// 				title: '更新提示',
			// 				cancelVal: '暂不更新',
			// 				confirmVal: '立即更新',
			// 				cancelColor: '#999999'
			// 			}).then(res=>{
			// 				console.log(res)
			// 				if(res.types == 'confirm') {
			// 					// console.log(url)
			// 					plus.runtime.openURL(url);  // 打开第三方地址
			// 				}
			// 			})
			// 		}
			// 	})
			// //#endif
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
	.status{ /* 手机状态栏高度 */
		background: #5E79F2;
		height: var(--status-bar-height);
	}
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
