<template> <!-- 营业执照 -->
	<view class='hello'>
		<div class="status" style='background: white;'></div>
		<div class='goback'>
			<image src="../../static/fanhui(3).png" mode="" @click="goBack"></image>
			<!-- <text @click="save">保存</text> -->
		</div>
		<div class='main'>
			<p>
				营业执照
			</p>
			<div class='image' @click='upload'>
				<image :src="src == ''? '../../static.zanwu.png' : src " mode="" @click='upload'></image>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				id: ''
			}
		},
		onLoad(option) {
			this.id = option.id
			this.$request('/api/index/infoIndex', {
				uid: this.id
			}).then(res => {
				this.src = res.data.data.yimgurl
			})
		},
		methods: {
			upload() {
				if (this.src == '') {
					this.$upload('/api/index/upload').then(res => {
						this.src = res
						uni.hideLoading()
						uni.showToast({
						    title: '上传成功',
						    duration: 1000
						});
					})
				} else {
					uni.previewImage({
						urls: [ this.src ]
					})
				}
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			save() {
				var that = this
				if(that.src == '') {
					uni.showModal({
						content: '请上传营业执照'
					})
				} else {
					
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.goback{
		width: 90%;
		margin: 0 auto;
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		image{
			width: 48rpx;
			height: 48rpx;
		}
		text{
			color: #5C7CF4;
		}
	}
	.main{
		text-align: center;
		.image{
			width: 450rpx;
			height: 300rpx;
			margin: 40rpx auto;
			position: relative;					
			image{
				width: 100%;
				height: 100%;
				border: 2px solid #F7F7F7;
				background-color: #F2F3F7;
			}
			text{
				width: 150rpx;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				font-size: 30rpx;
				position: absolute;
				left: 50%;
				top: 50%;
				margin-top: -50rpx;
				margin-left: -75rpx;
				color: #878787;
			}
		}		
	}
</style>
