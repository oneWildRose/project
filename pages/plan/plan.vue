<template> <!-- 方案详情 -->
	<view class="hello">
		<div class="kong"></div>
		<div class='goback'>
			<image :src="require('../../static/fanhui(1).png')" mode="" @click='goBack'></image>
			<div>
				<text>方案详情</text>
			</div>
		</div>
		<div class="main">
			<div class='address'>
				<image :src="require('../../static/dianwei.svg')" mode=""></image>
				<text>北门正门口01</text>
			</div>
			<div class='img'>
				<image :src="require('../../static/point.png')" mode=""></image>
			</div>
			<div class="work">
				<div class="title">
					<image :src="require('../../static/biaozhun.svg')" mode=""></image>
					<text>作业标准</text>
				</div>
				<ul>
					<li v-for='(item, index) in work_list' :key='index'>
						<text>{{ item }}</text>
					</li>
				</ul>
			</div>
			<div class="btm" style='height: 100rpx;'></div>
		</div>
		<div class="pic">
			<button type="default">拍照对比</button>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: '',
				work_list: [
					'1、车行出入口：地面无垃圾、无积水、无污渍、无破损、干净整洁；边石高于路面及草坪10cm',
					'2、道闸栏设备：功能完好，正常开启、无破损，目视无掉漆，“一车一杆”等标识无掉色、脱落',
					'3、乔木：无枯死、无枯枝、无明显病虫害，冠型饱满、内堂通透，无偏冠，无断枝；乔木下缘线高于人行门上缘线',
					'4、灌木球：修剪及时无超长枝条，新生枝条≤12cm，无偏灌，无病虫枝叶，修剪后呈半圆形，绿篱交界分明，无枯死生长茂盛',
					'5、绿篱：下方不露土，无水土流失，修剪整齐有序，同一品种高度一致，不同品种绿篱至少保留20cm以上的高差',
				]
			}
		},
		onLoad(option) {
			this.list = option.list
			console.log(this.list)
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
		.kong{
			height: 40rpx;
		}
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
				left: 50rpx;
				top: 40%;
				font-size: 38rpx;
				display: flex;
				align-items: center;
			}
		}
	}
	.main{
		width: 100%;
		height: 79%;
		background: white;
		border-radius: 40rpx;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		position: absolute;
		top: 280rpx;
		.address{
			width: 90%;
			height: 80rpx;
			margin: 20rpx;
			display: flex;
			align-items: center;
			image{
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}
		}
		.img{
			width: 90%;
			height: 448rpx;
			margin: 0 auto;
			image{
				width: 100%;
				height: 100%;
				vertical-align: middle;
			}
		}
		.work{
			width: 90%;
			margin: 40rpx auto;
			.title{
				width: 100%;
				height: 40rpx;
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
				image{
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
			}
			ul{
				width: 100%;
				li{
					width: 100%;
					text-indent: 20rpx;
					height: auto;
					font-size: 26rpx;
					margin-top: 40rpx;
				}
			}
		}
	}
	.pic{
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		button{
			width: 100%;
			height: 100%;
			line-height: 100rpx;
			background: #536DE3;
			color: white;
			font-size: 32rpx;
			border-radius: 0;
		}
	}
</style>
