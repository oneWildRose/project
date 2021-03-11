<template>  <!-- 个人优势 -->
	<view>
		<div class="status" style='background: white;'></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(3).png')" mode="" @click="goBack"></image>
			<text @click="save">确定</text>
		</div>
		<p class='title'>我的优势</p>
		<textarea class="tit" value="" maxlength='-1' placeholder="可以介绍您最擅长的领域" auto-height='true' @input='text' />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: ''
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			text(e) {
				// console.log(e.detail.value)
				this.value = e.detail.value
			},
			save() {
				var that = this
				uni.setStorage({ // 存入缓存
					key: 'text',
					data: that.value,
					success() {
						that.goBack()
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.head{
		width: 94%;
		margin: 0 auto;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			width: 40rpx;
			height: 40rpx;
		}
		text{
			font-size: 32rpx;
		}
	}
	.title{
		font-size: 36rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin-left: 40rpx;
		font-weight: bold;
	}
	.tit{
		width: 88%;
		font-size: 28rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-left: 40rpx;
		margin-top: 20rpx;
		border-bottom: 1px solid #EFEFEF;
	}
</style>