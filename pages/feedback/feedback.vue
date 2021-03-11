<template>  <!-- 意见反馈 -->
	<view>
		<div class="status" style='background: #F8F8F8;'></div>
		<div class="head">
			<image :src="require('../../static/fanhui(3).png')" mode="" @click="goBack"></image>
			<text>意见反馈</text>
		</div>
		<div class="content">
			<div class='textarea'>
				<textarea value="" placeholder="请输入您的建议内容" :maxlength='200' @input='text'/>
				<p>
					<text>{{ num }}</text>/200
				</p>
			</div>
			<div class="upload">
				<image :src="src" v-if='src != ""' mode=""></image>
				<div @click='upload'>
					<div>
						<p></p>
						<p></p>
					</div>
					<p>上传照片</p>
				</div>
			</div>
			<div class="small mobile">
				<p>手机号</p>
				<text>{{ mobile }}</text>
			</div>
			<div class="small time">
				<p>时间</p>
				<text>{{ time }}</text>
			</div>
		</div>
		<button type="default">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: 0,
				src: '',
				time: new Date().Format("yyyy-MM-dd HH:mm"),
				mobile: ''
			}
		},
		onLoad(option) {
			this.$request('/api/index/infoIndex', {
				uid: option.id
			}).then(res => {
				let msg = res.data.data
				this.mobile = msg.mobile.substring(0, 3) + '****' + msg.mobile.substring(msg.mobile.length - 4)
			})
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			text(e) {
				this.num = e.detail.value.length
			},
			upload() {
				this.$upload('/api/index/upload').then(res => {
					this.src = res
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.head{
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			width: 40rpx;
			height: 40rpx;
			margin-left: 40rpx;
		}
		text{
			flex-grow: 1;
			text-align: center;
			margin-left: -80rpx;
			font-size: 34rpx;
			font-weight: bold;
		}
	}
	.content{
		width: 90%;
		height: auto;
		margin: 0 auto;
		.textarea{
			width: 100%;
			height: 300rpx;
			border-radius: 10rpx;
			box-shadow: #c7c7c7 0 0 8rpx 0;
			position: relative;
			textarea{
				width: 100%;
				height: 220rpx;
				text-indent: 40rpx;
				padding-top: 20rpx;
			}
			&>p{
				position: absolute;
				bottom: 20rpx;
				right: 20rpx;
				color: #666666;
			}
		}
		.upload{
			width: 100%;
			height: 232rpx;
			border-radius: 10rpx;
			box-shadow: #c7c7c7 0 0 8rpx 0;
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			&>image{
				width: 192rpx;
				height: 192rpx;
				margin-left: 20rpx;
			}
			&>div{
				width: 192rpx;
				height: 192rpx;
				margin-left: 20rpx;
				box-sizing: border-box;
				padding-top: 50rpx;
				background: #F2F3F7;
				border-radius: 8rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				&>div{
					width: 64rpx;
					height: 64rpx;
					position: relative;
					p{
						position: absolute;
						&:nth-of-type(1){
							width: 100%;
							border: 1px solid #BFBFBF;
							top: 50%;
						}
						&:nth-of-type(2){
							height: 100%;
							border: 1px solid #BFBFBF;
							left: 50%;
						}
					}
				}
				&>p{
					color: #BFBFBF;
				}
			}
		}
		.small{
			width: 100%;
			height: 96rpx;
			border-radius: 10rpx;
			box-shadow: #c7c7c7 0 0 8rpx 0;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			p{
				color: #7D7F7D;
				margin-left: 20rpx;
			}
			text{
				color: #AEAEB1;
				margin-right: 20rpx;
			}
		}
	}
	button{
		width: 82%;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 80rpx;
		background: #5C7CF4;
		color: white;
		margin: 100rpx auto;
	}
</style>
