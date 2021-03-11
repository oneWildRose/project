<template>  <!-- 指定专家 -->
	<view>
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>指定专家</text>
		</div>
		<div class='input'>
			<text>项目名称</text>
			<input type="text" :value="pname" disabled />
		</div>
		<div class='input'>
			<text>专家名称</text>
			<input type="text" value="" placeholder="请选择您要指定的专家" />
		</div>
		<div class='true'>确认</div>
		<div class='tip'>
			<image src="../../../static/10-26/prompt.svg" mode=""></image>
			<text>选择专家之后，等待专家确认即可达成合作</text>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				project_id: '',
				pname: ''
			}
		},
		onLoad(option) {
			this.project_id = option.project_id
			this.$request('/api/index/Project_info', {
				project_id: this.project_id
			}).then(res => {
				this.pname = res.data.data.pname
			})
		},
		methods: {
			goBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less" scoped>
	.title{
		width: 100%;
		height: 120rpx;
		background-color: #5E79F2;
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
	.input{
		width: 90%;
		height: 80rpx;
		background-color: #EEEEEE;
		margin: 30rpx auto;
		display: flex;
		align-items: center;
		border-radius: 8rpx;
		text{
			display: inline-block;
			width: 200rpx;
			height: 100%;
			line-height: 80rpx;
			text-align: center;
		}
		input{
			width: 500rpx;
			height: 100%;
			font-size: 30rpx;
		}
		&:nth-of-type(1){
			margin-top: 60rpx;
		}
	}
	.true{
		width: 90%;
		height: 100rpx;
		line-height: 100rpx;
		color: white;
		text-align: center;
		margin: 60rpx auto;
		margin-bottom: 40rpx;
		background-color: #6876FF;
		border-radius: 8rpx;
	}
	.tip{
		width: 90%;
		height: 96rpx;
		margin: 0 auto;
		background-color: #F8F8FF;
		display: flex;
		align-items: center;
		image{
			width: 40rpx;
			height: 40rpx;
			margin-left: 30rpx;
			margin-top: 4rpx;
			margin-right: 4rpx;
		}
		text{
			color: #868887;
			font-size: 30rpx;
		}
	}
</style>
