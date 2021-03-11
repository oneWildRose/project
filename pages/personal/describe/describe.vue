<template> <!-- 项目描述 -->
	<view>
		<div class="status" style='background-color: white;'></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(3).png')" mode="" @click="goBack"></image>
			<p>保存</p>
		</div>
		<div class="content">
			<p>项目描述</p>
			<textarea value="" placeholder="描述该项目,展示您的项目经验" auto-height />
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: ''
			}
		},
		onLoad(option) {
			this.uid = option.uid
		},
		methods: {
			goBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less" scoped>
	.head{
		width: 90%;
		height: 80rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			width: 46rpx;
			height: 46rpx;
		}
		p{
			font-size: 32rpx;
		}
	}
	.content{
		width: 90%;
		height: auto;
		margin: 0 auto;
		p{
			height: 100rpx;
			line-height: 100rpx;
			font-size: 36rpx;
			font-weight: bold;
		}
		textarea{
			width: 100%;
		}
	}
</style>
