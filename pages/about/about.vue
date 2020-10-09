<template> <!-- 关于我们 -->
	<view>
		<div class='title'>
			<image :src="require('../../static/fanhui(3).png')" mode="" @click="goBack"></image>
			<text>关于我们</text>
		</div>
		<div class="main">
			<p>轩然</p>
			<text>软件简介说明文字介绍软件简介说明文字介绍软件简介说明文字介绍软件简介说明文字介绍软件简介说明文字介绍</text>
		</div>
		<ul>
			<li>
				<p>客服电话</p>
				<text>022-99999999</text>
			</li>
			<li>
				<p>检查更新</p>
				<text>1.0</text>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang='less' scoped>
	.title{
		width: 90%;
		margin: 50rpx auto;
		height: 100rpx;
		display: flex;
		align-items: center;
		image{
			width: 40rpx;
			height: 40rpx;
		}
		text{
			display: inline-block;
			width: 100%;
			text-align: center;
			text-indent: -40rpx;
		}
	}
	.main{
		width: 80%;
		height: auto;
		margin: 40rpx auto;
		p{
			font-size: 40rpx;
			font-weight: bold;
			margin-bottom: 40rpx;
			text-align: center;
		}
		text{
			font-size: 32rpx;
		}
	}
	ul{
		width: 100%;
		margin-top: 100rpx;
		font-size: 30rpx;
		li{
			width: 90%;
			height: 112rpx;
			line-height: 112rpx;
			padding: 0 40rpx;
			display: flex;
			justify-content: space-between;
			border-top: 1px solid #939593;
			border-bottom: 1px solid #939593;
			&:nth-of-type(2) {
				border-top: none;
			}
			text{
				color: #939593;
			}
		}
	}
</style>
