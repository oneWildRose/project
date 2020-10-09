<template> <!-- 专家方案 -->
	<view>
		<div class='blue'></div>
		<div class='goback' @click='goBack'>
			<image :src="require('../../static/fanhui(1).png')" mode=""></image>
			<text>专家方案</text>
		</div>
		<div class="search">
			<image :src="require('../../static/search.svg')" mode=""></image>
			<input type="text" placeholder="输入项目名称" />
		</div>
		<div class="list">
			<div class='title'>
				<image :src="require('../../static/liebiao.svg')" mode=""></image>
				<text>方案列表</text>
			</div>
			<ul>
				<li v-for='(item, index) in specialist_list' :key='index' @click='goPoint(index)'>
					<div class='top'>
						<text></text>
						<text>项目名称: {{ item.pname }}</text>
						<image :src="require('../../static/more.svg')" mode=""></image>
					</div>
					<div class='middle'>
						<image :src="require('../../static/zhuanjia.svg')" mode=""></image>
						<text>专家: {{ item.name }}</text>
					</div>
					<div class="bottom">
						<image :src="require('../../static/9-17icon/zuijinshijian.svg')" mode=""></image>
						<text>最近更新: {{ item.time }}</text>
					</div>
				</li>
			</ul>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				specialist_list: [
					{
						pname: '融创项目一期',
						name: '专家名',
						time: '2020-10-01'
					}
				]
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goPoint(index) {
				uni.navigateTo({
					url: '../point/point'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.blue{
		width: 100%;
		height: 50rpx;		
		background: #3F5DE3;
	}
	.goback{
		padding-left: 40rpx;
		padding-right: 40rpx;
		background: #3F5DE3;
		width: 90%;
		height: 120rpx;
		line-height: 120rpx;
		margin: 0px auto;
		text-align: center;
		position: relative;
		color: white;
		font-size: 36rpx;
		image{
			width: 52rpx;
			height: 52rpx;
			position: absolute;
			left: 40rpx;
			top: 50%;
			margin-top: -20rpx;
		}
	}
	.search{
		width: 90%;
		height: 80rpx;
		padding: 40rpx;
		padding-bottom: 60rpx;
		margin: 0 auto;
		background: #3F5DE3;
		position: relative;
		image{
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			left: 60rpx;
			top: 50%;
			margin-top: -28rpx;
		}
		input{
			width: 100%;
			height: 100%;
			background: white;
			color: #808080;
			text-align: center;
			border-radius: 20rpx;
			font-size: 32rpx;
		}
	}
	.list{
		width: 100%;
		height: 75%;
		background: white;
		border-radius: 40rpx;
		position: absolute;
		top: 320rpx;
		.title{
			margin-top: 40rpx;
			margin-left: 40rpx;
			font-size: 18px;
			image{
				width: 40rpx;
				height: 40rpx;
				margin-left: 8rpx;
				margin-right: 12rpx;
				vertical-align: middle;
			}
		}
		ul{
			width: 100%;
			li{
				margin: 0 auto;
				width: 90%;
				height: 200rpx;
				margin-top: 40rpx;
				border-radius: 20rpx;
				box-shadow: #D2D2D2 1px 2px 4px 2px;
				display: flex;
				flex-direction: column;
				padding-top: 20rpx;
				padding-bottom: 10rpx;
				.top{
					width: 100%;
					height: 70rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 32rpx;
					font-weight: bold;
					text:nth-of-type(1){
						display: inline-block;
						width: 12rpx;
						height: 52rpx;
						border-radius: 4rpx;
						background: transparent;
						margin-right: 36rpx;
					}
					text:nth-of-type(2){
						flex-grow: 1
					}
					image{
						width: 60rpx;
						height: 60rpx;
						margin-right: 20rpx;
					}
				}
				.middle{
					width: 100%;
					height: 70rpx;
					margin-left: 48rpx;
					font-size: 32rpx;
					display: flex;
					align-items: center;
					font-size: 30rpx;
					image{
						width: 50rpx;
						height: 50rpx;
						margin-right: 14rpx;
					}
				}
				.bottom{
					width: 100%;
					height: 70rpx;
					margin-left: 48rpx;
					font-size: 32rpx;
					display: flex;
					align-items: center;
					color: #8E9099;
					font-size: 24rpx;
					image{
						width: 40rpx;
						height: 40rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
</style>
