<template> <!-- 专家成功案例展示 -->
	<view>
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>案例展示</text>
		</div>
		<div class="main">
			<div>
				<image v-for="(item, index) in JSON.parse(msg.pic_url)" :key='index' :src="item" mode=""></image>
			</div>
			<p>文字描述：{{ msg.anlimiaoshu }}</p>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				msg: ''
			};
		},
		onLoad(option) {
			this.id = option.id
			this.$request('/api/index/infoIndex', {
				uid: this.id
			}).then(res => {
				this.msg = res.data.data
				console.log(this.msg)
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
	.title{
		width: 100%;
		height: 112rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #5E79F2;
		image{
			width: 50rpx;
			height: 50rpx;
			margin-left: 40rpx;
		}
		text{
			font-weight: bold;
			font-size: 36rpx;
			flex-grow: 1;
			text-align: center;
			color: white;
			text-indent: -100rpx;
		}
	}
	.main{
		width: 100%;
		height: auto;
		background: #F5F5F9;
		padding-bottom: 40rpx;
		&>div{
			&:after { // 清除浮动
				content: '';
				height: 0;
				line-height: 0;
				display: block;
				visibility: hidden;
				clear: both;
			}
			image{
				width: 216rpx;
				height: 180rpx;
				float: left;
				margin-left: 26.8rpx;
				margin-top: 40rpx;
				&:nth-last-of-type(1) {
					margin-bottom: 40rpx;
				}
			}
		}
		p{
			width: 90%;
			text-indent: 60rpx;
			margin: 0rpx auto;
		}
	}
</style>
