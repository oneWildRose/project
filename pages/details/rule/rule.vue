<template>		<!-- 点位规则 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>点位规则</text>
		</div>
		<div class='content'>
			<rich-text class="rich" :nodes="msg == ''? '暂无': msg"></rich-text>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				project_id: '',
				msg: ''
			}
		},
		onLoad(option) {
			this.project_id = option.project_id
			this.$request('/api/file/file_rule', {
				project_id: this.project_id
			}).then(res => {
				// console.log(res)
				this.msg = res.data.data
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
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
		background-color: #F2F2F7;
	}
	.title{
		width: 100%;
		height: 116rpx;
		background: #5C7CF4;
		display: flex;
		align-items: center;
		justify-content: space-between;
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
			margin-left: -100rpx;
		}
	}
	.content{
		width: 89%;
		height: auto;
		padding: 20rpx;
		background: white;
		margin: 30rpx auto;
		box-shadow: #acacac 0 0 10rpx 0;
		border-radius: 10rpx;
		font-size: 30rpx;
		p{
			margin-bottom: 34rpx;
			&:nth-last-of-type(1){
				margin: 0;
			}
		}
	}
</style>
