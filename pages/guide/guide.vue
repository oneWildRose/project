<template>  <!-- 引导页 -->
	<view>
		<view class="lb" v-if="guidePages"> <!-- 轮播 -->
			<swiper :indicator-dots="true">
				<swiper-item>
					<image src="../../static/9-17icon/bg2.jpg" class="swiper-item"></image>
				</swiper-item>
				<swiper-item class='titi'>
					<image src="../../static/brg.jpg" class="swiper-item"></image>
					<button type="default" @click="isLogin">立即体验</button>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				guidePages:	true
			}
		},
		onLoad(){
			// this.loadExecution()
		},
		methods: {
			loadExecution: function(){
				/**
				 * 获取本地存储中launchFlag的值
				 * 若存在，说明不是首次启动，直接进入首页；
				 * 若不存在，说明是首次启动，进入引导页；
				 */
					// 获取本地存储中launchFlag标识
					const value = uni.getStorageSync('launchFlag');
					if (value) {
						console.log('跳转')
						// launchFlag=true直接跳转到首页
						this.isLogin()
					} else {
						console.log('显示引导页')
						this.guidePages = true
						
						// 存储 launchFlag标识
						uni.setStorage({ 
							key: 'launchFlag', 
							data: true, 
							success: function () {
								console.log('error时存储launchFlag');
							} 
						});
					}
			},
			isLogin() {
				let that = this
				var id = ''
				//从缓存中取出登陆信息
				uni.getStorage({
					key: 'userinfo',
					success: function (res) {
						console.log(res)
						if(res.data.code != 1) {
							uni.redirectTo({
								url: '/pages/sign/sign'
							})
							// setTimeout(function() {
							// 	plus.navigator.closeSplashscreen() // 关闭启动页
							// 	return false;
							// },1200)
						}
						if(res.data.uid) { // 登录时弹框： 选择身份，完善企业信息，完善个人信息 进入
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
								uni.redirectTo({
									url: '/pages/sign/sign'
								})
								// setTimeout(function() {
								// 	plus.navigator.closeSplashscreen() // 关闭启动页
								// 	return false;
								// },1200)
							}
							// 判断帐号角色及是否完善信息，修改TabBar并switchTab跳转
							if (res.data.data.isshenfen == 5) { // 5专家
								that.$request('/api/index/iszhuanjiainfo', {
									uid: id
								}).then(res => {
									// setTimeout(function() {
									// 	plus.navigator.closeSplashscreen()
									// },1200)
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
									// setTimeout(function() {
									// 	plus.navigator.closeSplashscreen()
									// },1200)
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
								// setTimeout(function() {
								// 	plus.navigator.closeSplashscreen()
								// },1200)
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
								// setTimeout(function() {
								// 	plus.navigator.closeSplashscreen()
								// },1200)
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
						console.log(err)
						uni.redirectTo({// 没有登录信息，则前往登录页面
							url: '/pages/sign/sign'
						})
						// setTimeout(function() {
						// 	plus.navigator.closeSplashscreen()
						// },1200)
					}
				})
			}
		}
	}
</script>

<style>
	.lb{
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
	}
	swiper{
		width: 100%;
		height: 100%;
	}
	image{
		width: 100%;
		height: 100%;
	}
	.titi{
		position: relative;
	}
	button{
		position: absolute;
		bottom: 40rpx;
		right: 40rpx;
	}
</style>
