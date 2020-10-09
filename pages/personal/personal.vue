<template> <!-- 个人中心 -->
	<view class="hello">
		<div class='head'>
			<div @click='goInformation'>
				<div class="head_image">
					<image :src="msg.file == null? src : msg.file" mode=""></image>
				</div>
				<div class='message'>
					<p>{{ msg.username == null? '姓名' : msg.username }}</p>
					<p>{{ mobile }}</p>
				</div>
			</div>
		</div>
		<div class='main'>
			<ul>
				<li>
					<image :src="require('../../static/yijianfankui.svg')"></image>
					<text>意见反馈</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li>
					<image :src="require('../../static/wenti.svg')"></image>
					<text>常见问题</text>
					<image :src="require('../../static/jinru.svg')" @click="goAbout"></image>
				</li>
				<li @click='goAbout'>
					<image :src="require('../../static/guanyuwomen.svg')"></image>
					<text>关于我们</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
			</ul>
		</div>
		<button type="default" @click="exit">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '../../static/shu.png',// 默认头像
				id: '',
				msg: '',
				mobile: '***********'
			}
		},
		onShow() {
			var that = this
			uni.getStorage({ // 从缓存中拿到用户的id
				key: 'userinfo',
				success: (res) => {
					// console.log(res.data)
					that.id = res.data.data.id
					that.$request('/api/index/infoIndex', {
						uid: that.id
					}).then(res => {
						// console.log(res)
						that.msg = res.data.data
						that.mobile = that.msg.mobile.substring(0, 3) + '****' + that.msg.mobile.substring(that.msg.mobile.length - 4)
						// console.log(this.msg)
					})
				}
			})
		},
		methods: {
			goAbout() {
				uni.navigateTo({
					url: '../about/about',
				})
			},
			goInformation() { // 个人信息
				uni.navigateTo({
					url: '../information/information?uid=' + this.id
				})
			},
			exit() { // 退出登录
				uni.showModal({
					content: '确定退出登录?',
					success: (res) => {
						console.log(res)
						if (res.confirm == true) { // 为 ture时 即用户点了确定，跳到登录页 sign
							uni.removeStorage({
								key: 'userinfo'
							})
							uni.removeStorage({
								key: 'business'
							})
							uni.reLaunch({
								url: '../sign/sign'
							})
						} else {
							return ;
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		height: 100%;
		.head{
			width: 100%;
			height: 400rpx;
			background: url(../../static/per_brg.jpg) no-repeat;
			background-size: 100%;
			display: flex;
			align-items: center;
			&>div{
				width: 100%;
				height: 180rpx;
				display: flex;
				align-items: flex-end;
				justify-content: space-around;
				// border: 1px solid red;
				.head_image{
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					margin-left: 40rpx;
					margin-right: 40rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.message{
					flex-grow: 1;
					height: 120rpx;
					color: white;
					p:nth-of-type(2){
						margin-top: 10rpx;
						font-size: 30rpx;
					}
				}				
			}
		}
		.main{
			width: 100%;
			height: auto;
			position: absolute;
			top: 350rpx;
			border-radius: 40rpx;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			background-color: white;
			ul{
				width: 90%;
				height: 100%;
				margin: 50rpx auto;
				li{
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					margin-bottom: 20rpx;
					display: flex;
					align-items: center;
					position: relative;
					image{
						width: 40rpx;
						height: 40rpx;
						margin-right: 16rpx;
						&:nth-of-type(2) {
							position: absolute;
							right: 0;
						}
					}
				}
			}
		}
		button{
			width: 70%;
			height: 90rpx;
			line-height: 90rpx;
			border-radius: 80rpx;
			background: #3F5DE3;
			color: white;
			position: fixed;
			bottom: 50rpx;
			left: 50%;
			margin-left: -34.5%;
		}
	}
</style>
