<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS  
			console.log('App Launch')
			let clientMsg = plus.push.getClientInfo()
			this.$store.commit('clientidSave', clientMsg.clientid)
			uni.setStorage({
				key: 'clientid',
				data: clientMsg.clientid
			})
			let that = this
			var id = ''
			//从缓存中取出登陆信息
			uni.getStorage({
				key: 'userinfo',
				success: function (res) {
					// console.log(res)
					if(res.data.code != 1) {
						setTimeout(function() {
							plus.navigator.closeSplashscreen() // 关闭启动页
							return false;
						},1200)
					}
					if(res.data.uid) { // 登录出现弹框： 选择身份，完善企业信息，完善个人信息 进入
						id = res.data.uid
			 		} else if(res.data.id) { // 注册成功，请选择身份进入
			 			id = res.data.id
			 		} else if(res.data.data.id) { // 登录进入
			 			id = res.data.data.id
			 		} 
					that.$store.commit('uidSave', id)
					that.$request('/api/index/infoIndex', {
						uid: id
					}).then(res => {
						// console.log(res)
						if(res.data.code != 1) {
							setTimeout(function() {
								plus.navigator.closeSplashscreen() // 关闭启动页
								return false;
							},1200)
						}
						// 判断帐号角色及是否完善信息，修改TabBar并switchTab跳转
						if (res.data.data.isshenfen == 5) { // 5专家
							that.$request('/api/index/iszhuanjiainfo', {
								uid: id
							}).then(res => {
								setTimeout(function() {
									plus.navigator.closeSplashscreen()
								},1200)
								if(res.data.data.istianxie != 0) { // 已完善个人信息，进行跳转
									uni.setTabBarItem({
										index: 0,
										text: '方案',
										iconPath: '/static/fangan.png',
										selectedIconPath: '/static/fangan(2).png',
										pagePath: '/pages/ind_specialist/ind_specialist'
									})
									uni.switchTab({
										url: '/pages/ind_specialist/ind_specialist'
									})
								}
							})
						} else if (res.data.data.isshenfen == 1 || res.data.data.isshenfen == 3) { // 1甲方顶级负责人   3乙方顶级负责人
							that.$request('/api/index/check_party_companyname', {
								uid: id
							}).then(res => {
								setTimeout(function() {
									plus.navigator.closeSplashscreen()
								},1200)
								if(res.data.data.perfect != 0) { // 已完善企业信息，进行跳转
									uni.setTabBarItem({
										index: 0,
										text: '首页',
										iconPath: '/static/shouye(2).png',
										selectedIconPath: '/static/shouye.png',
										pagePath: '/pages/ind/ind'
									})
									uni.switchTab({
										url: '/pages/ind/ind'
									})
								}
							})
						} else if(res.data.data.isshenfen == 2) { // isshenfen   2甲方项目主管
							setTimeout(function() {
								plus.navigator.closeSplashscreen()
							},1200)
							uni.setTabBarItem({	// 目前也进入甲方顶级负责人的页面，暂不区分
								index: 0,
								text: '首页',
								iconPath: '/static/shouye(2).png',
								selectedIconPath: '/static/shouye.png',
								pagePath: '/pages/ind/ind'
							})
							uni.switchTab({
								url: '/pages/ind/ind'
							})
						} else if(res.data.data.isshenfen == 4) { // isshenfen   4乙方项目主管
							setTimeout(function() {
								plus.navigator.closeSplashscreen()
							},1200)
							uni.setTabBarItem({
								index: 0,
								text: '首页',
								iconPath: '/static/shouye(2).png',
								selectedIconPath: '/static/shouye.png',
								pagePath: '/pages/ind_provider/provider/provider'
							})
							uni.switchTab({
								url: '/pages/ind_provider/provider/provider'
							})
						}
					})
				},
				fail: function (err) {
					setTimeout(function() {
						plus.navigator.closeSplashscreen()
					},1200)
				}
			})
			
			
			// const jyJPush = uni.requireNativePlugin('JY-JPush');
			// jyJPush.addJYJPushReceiveNotificationListener(result=> {
			// 	console.log(123)
			// 	console.log(JSON.stringify(result))
			// });
			// jyJPush.addJYJPushReceiveOpenNotificationListener(result=> { //监听点击通知栏消息事件
			// 	uni.showModal({
			// 		content: JSON.stringify(result)
			// 	})
			// });
			// jyJPush.getLastPushInfo(result => { // 监听消息点击事件，APP进程被杀死后，消息还存在通知栏的时候，点击消息会触发这个方法
			// 	uni.showModal({
			// 		content: JSON.stringify(result)
			// 	})
			// });
			

				plus.push.addEventListener('click', function(message) {// 从系统消息中心点击消息启动应用事件
					console.log('click:' + message)
				});
				plus.push.addEventListener('receive', function(message) {// 应用从推送服务器接收到推送消息事件。
					console.log('receive:' + message)
				});  
				
				
			                                    //  热更新  wgt文件， 每次打包wgt文件时记得更改版本号并告知后端人员

			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				that.$request('/api/Checkversion/detect_gwt', {
					"client_version": widgetInfo.version,
				}).then(result => {
					var data = result.data.data;
					// console.log(data)
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
						// console.log('暂无更新')
					}
				})
			});

			
												//  整包更新  apk文件

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
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	  
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	
	::-webkit-scrollbar{ // 去除滚动条
		display: none;
	}
	
	.status{ /* 手机状态栏高度 */
		background: #5E79F2;
		width: 100%;
		height: var(--status-bar-height);
	}
	
	/* 隐藏uniapp自带的导航栏 */
	uni-page-head{ 
		display: none;
	}
	/* 品质监控页中的审核 */
	.radio uni-radio .uni-radio-input.uni-radio-input-checked:before{
		font-size: 34rpx;
		transform: translate(-50%,-49%) scale(0.75);
	}
	.radio uni-radio .uni-radio-input{
		width: 34rpx;
		height: 34rpx;
	}
	/* 修改'完善专家履历'页中checkbox的样式 */
	.checkbox .uni-checkbox-input{
		border-radius: 50%;
		width: 36rpx;
		height: 36rpx;
		margin: 0 20rpx 0 30rpx;
	}
	
	/* 修改 task_msg.vue 中的进度条样式 */
	.uni-progress{
		position: relative;
	}
	.uni-progress-bar{
		border-radius: 20rpx;
	}
	.uni-progress-inner-bar{
		border-radius: 20rpx;
	}
	.uni-progress-info{
		margin-left: 10rpx;
		margin-top: -8rpx;
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
