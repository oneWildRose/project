<template> <!-- 苗木信息 -->
	<view class="hello">
		<div class="status"></div>
		<div class='goback'>
			<image :src="require('../../static/fanhui(1).png')" mode="" @click='goBack'></image>
			<div>
				<text>点位信息</text>
			</div>
		</div>
		<div class='main'>
			<ul>
				<li>
					<text>点位名称</text>
					<text>北门正门口01</text>
				</li>
				<li>
					<text>点位级别</text>
					<text>一级点位</text>
				</li>
				<li>
					<text>点位编号</text>
					<text>20201015001</text>
				</li>
				<li>
					<text>最近更新</text>
					<text>2020-09-08</text>
				</li>
				<li>
					<text>点位照片</text>
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
				uni.navigateBack({
					delta: 1
				})
			},
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
		height: 81.7%;
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
