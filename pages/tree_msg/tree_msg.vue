<template>
	<view class="hello">
		<div class='goback'>
			<image :src="require('../../static/fanhui(1).png')" mode="" @click='goBack'></image>
			<div>
				<text>苗木信息</text>
			</div>
		</div>
		<div class='main'>
			<ul>
				<li>
					<text>苗木名称</text>
					<text>悬铃木</text>
				</li>
				<li>
					<text>苗木数量</text>
					<text>13颗</text>
				</li>
				<li>
					<text>苗木分类</text>
					<text>乔木</text>
				</li>
				<li>
					<text>上传时间</text>
					<text>2020-09-08</text>
				</li>
				<li>
					<text>位置描述</text>
					<text>一号楼与二号楼之间</text>
				</li>
				<li>
					<text>照片</text>
					<image :src="require('../../static/zhaopian.png')" mode=""></image>
				</li>
			</ul>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({})
			}
		}
	}
</script>

<style lang="less" scoped>
.hello{
		width: 100%;
		height: 100%;
		background: url(../../static/brg.jpg) no-repeat;
		background-size: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		.goback{
			padding-left: 40rpx;
			padding-right: 40rpx;
			background: transparent;
			width: 90%;
			height: 320rpx;
			line-height: 120rpx;
			margin: 0px auto;
			text-align: center;
			position: relative;
			color: white;
			font-size: 36rpx;
			&>image{
				width: 52rpx;
				height: 52rpx;
				position: absolute;
				left: 40rpx;
				top: 50%;
				margin-top: -120rpx;
			}
			div{
				width: 400rpx;
				height: 80rpx;
				line-height: 80rpx;
				position: absolute;
				left: 40rpx;
				top: 36%;
				font-weight: 600;
				font-size: 36rpx;
				display: flex;
				align-items: center;
			}
		}
	}
	.main{
		width: 100%;
		height: 79%;
		background: white;
		border-radius: 30rpx;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		position: absolute;
		top: 280rpx;
		ul{
			width: 90%;
			height: 1000rpx;
			font-size: 32rpx;
			margin: 50rpx auto;
			margin-bottom: 0;
			li{
				width: 100%;
				height: 60rpx;
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				&:nth-last-of-type(1){
					height: 550rpx;
					position: relative;
					image{
						width: 640rpx;
						position: absolute;
						bottom: 0;
						left: 50%;
						margin-left: -320rpx;
					}
				}
			}
		}
	}
</style>
