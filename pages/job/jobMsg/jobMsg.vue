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
						<text>完成日期：</text>
					</li>
					<li>
						<image :src="require('../../../static/yuangong.svg')" mode=""></image>
						<text>提交人：张三</text>
					</li>
				</ul>
			</div>
			<div class='middle'></div>
			<div class="upload">
				<div class='tit'>
					<text>上传照片</text>
					<p @click='goPlan'>查看标准图</p>
				</div>
				<div class='up'>
					<image :src="src" mode="" @click='preview'></image>
					<div @click='uploadImg'><text>+</text></div>
				</div>
				<div class="textarea">
					<textarea value="" placeholder="备注" />
					<text>200字以内</text>
				</div>
			</div>
		</div>
		<button type="default" hover-class="none" @click="sub">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: '',
				src: '../../../static/unfinished.jpg'
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
				if (this.src !== '../../../static/unfinished.jpg') {
					uni.previewImage({
						urls: [ this.src ]
					})
				}
			},
			goPlan() {
				uni.navigateTo({
					url: '../../plan/plan?text=' + '标准图'
				})
			},
			uploadImg() { // 上传图片
				uni.chooseImage({
					count: 1, //最多选取一张图片
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: 'http://lvz.maike-docker.com/index.php/api/index/upload',
				            filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
				            success: (uploadFileRes) => {
				                // console.log(uploadFileRes.data);
								this.src = uploadFileRes.data
				            }
				        });
				    }
				})
			},
			sub() {
				if (this.src == '../../../static/unfinished.jpg') {
					uni.showModal({
						content: '请上传照片后再进行提交'
					})
				} else {
					
				}
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
		&>.tit{
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
			padding-bottom: 10rpx;
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
				}
			}
		}
		.middle{
			width: 100%;
			height: 40rpx;
			background: #F5F6F9;
		}
		.upload{
			width: 90%;
			margin: 0 auto;
			padding-bottom: 40rpx;
			.tit{
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				p{
					color: #5E79F2;
				}
			}
			.up{
				width: 100%;
				height: auto;
				image{
					width: 100%;
					height: 276rpx;
				}
				div{
					width: 96rpx;
					height: 96rpx;
					line-height: 96rpx;
					text-align: center;
					margin-bottom: 20rpx;
					background: #F1F3F7;
					text{
						font-size: 60rpx;
						color: #7587A2;
					}
				}
			}
			.textarea{
				width: 100%;
				height: 180rpx;
				border: 1px solid #EFEFEF;
				position: relative;
				textarea{
					width: 100%;
					height: 100%;
					padding: 16rpx;
				}
				text{
					font-size: 28rpx;
					color: #AAAAAA;
					position: absolute;
					bottom: 20rpx;
					right: 20rpx;
				}
			}
		}
	}
	button{
		width: 100%;
		height: 92rpx;
		line-height: 92rpx;
		text-align: center;
		color: white;
		border-radius: 0;
		background: #3F5DE3;
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>