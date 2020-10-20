<template> <!-- 工单详情 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="title">
			<div class="goback">
				<image src="../../../static/fanhui(1).png" mode="" @click="goBack"></image>
				<text>工单详情</text>
			</div>
		</div>
		<div class="content">
			<div class="tit">
				<text>任务类型：修剪</text>
			</div>
			<div class="msg">
				<ul>
					<li>
						<image :src="require('../../../static/dianwei(2).svg')" mode=""></image>
						<text>点位：绿化A1区02绿化A1</text>
					</li>
					<li>
						<image :src="require('../../../static/miaoshu.svg')" mode=""></image>
						<text>任务描述：绿化A1区02绿化A1区02绿化A1区02</text>
					</li>
					<li>
						<image :src="require('../../../static/riqi.svg')" mode=""></image>
						<text>发布日期：2020-08-06 16:30</text>
					</li>
					<li>
						<image :src="require('../../../static/riqi.svg')" mode=""></image>
						<text>提交日期：</text>
					</li>
					<li>
						<image :src="require('../../../static/yuangong.svg')" mode=""></image>
						<text>提交人：张三</text>
					</li>
					<li>
						<text>照片</text>
						<image :src="status == 1? src : src_zanwu" mode="" @click="preview"></image>
					</li>
					<text v-if="status == 1" class='textarea'>备注：无</text>
				</ul>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: '',
				src: '../../../static/point.png',
				src_zanwu: '../../../static/zanwu.jpg'
			}
		},
		onLoad(option) {
			// console.log(option)
			this.status = option.status
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			preview() {
				uni.previewImage({
					urls: [ this.src ]
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		background: #F5F6F9;
	}
	.bottom{
		bottom: 400rpx;
	}
	.title{
		width: 100%;
		height: 100rpx;
		background: #5E79F2;
		.goback{
			width: 90%;
			height: 100rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			image{
				width: 50rpx;
				height: 50rpx;
				margin-left: 40rpx;
			}
			text{
				flex-grow: 1;
				text-align: center;
				color: white;
				font-size: 36rpx;
				font-weight: bold;
			}
		}
	}
	.content{
		width: 100%;
		height: auto;
		background: white;
		.tit{
			width: 90%;
			margin: 0 auto;
			height: 108rpx;
			line-height: 108rpx;
			border-bottom: 1px solid #E3E3E3;
			text{
				font-weight: bold;
			}
		}
		.msg{
			width: 90%;
			height: auto;
			padding-bottom: 20rpx;
			margin: 0 auto;
			ul{
				li{
					width: 100%;
					height: 48rpx;
					margin-top: 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					image{
						width: 35rpx;
						height: 35rpx;
						margin-right: 8rpx;
						margin-top: 7rpx;
					}
					text{
						font-size: 30rpx;
						flex-grow: 1;
					}
					&:nth-of-type(2) {
						height: auto;
						text{
							display: block;
							width: 616rpx;
						}
					}
					&:nth-last-of-type(1) {
						height: 452rpx;
						display: block;
						image{
							width: 100%;
							height: 412rpx;
						}
					}
				}
				.textarea{
					display: block;
					margin-top: 20rpx;
					color: #A4A4AA;
				}
			}
		}
	}
</style>