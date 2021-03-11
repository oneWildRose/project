<template> <!-- 关于我们 -->
	<view class="hello">
		<div class="status" style='background-color: #F8F8F8;'></div>
		<div class='title'>
			<image :src="require('../../static/fanhui(3).png')" mode="" @click="goBack"></image>
			<text>关于我们</text>
		</div>
		<div class="main">
			<p>境云</p>
			<text>软件简介说明文字介绍软件简介说明文字介绍软件简介说明文字介绍软件简介说明文字介绍软件简介说明文字介绍</text>
		</div>
		<ul>
			<li>
				<p>客服电话</p>
				<text>022-99999999</text>
			</li>
			<u-button class='version' :ripple="true" hover-start-time='0' @click="examine">
				<p>检查更新</p>
				<text>{{ version }}</text>
			</u-button>
		</ul>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: '1.0'
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			let that = this
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					that.version = widgetInfo.version
				})
			// #endif
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta: 1
				})
			},
			examine() {
				this.$refs.uToast.show({
					title: '已是最新版本',
					position: 'bottom',
					duration: 1000
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
	}
	.title{
		width: 90%;
		margin: 0rpx auto;
		height: 100rpx;
		display: flex;
		align-items: center;
		image{
			width: 46rpx;
			height: 46rpx;
		}
		text{
			display: inline-block;
			width: 100%;
			font-size: 32rpx;
			text-align: center;
			margin-left: -40rpx;
		}
	}
	.main{
		width: 80%;
		height: auto;
		margin: 40rpx auto;
		p{
			font-size: 44rpx;
			font-weight: bold;
			margin-bottom: 40rpx;
			text-align: center;
		}
		text{
			font-size: 30rpx;
		}
	}
	ul{
		width: 100%;
		margin-top: 100rpx;
		font-size: 30rpx;
		li{
			width: 90%;
			height: 112rpx;
			padding: 0 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-top: 1px solid #F0F0F0;
			border-bottom: 1px solid #F0F0F0;
			text{
				color: #939593;
			}
		}
		.version{
			height: 112rpx;
			border: none;
			outline: none;
			border-top: none;
			border-bottom: 1px solid #F0F0F0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: black;
			&::after{
				border: none;
			}
			text{
				color: #939593;
			}
		}
	}
</style>
