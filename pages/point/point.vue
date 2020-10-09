<template> <!-- 点位列表 -->
	<view class="hello">
		<div class="kong"></div>
		<div class='goback'>
			<image :src="require('../../static/fanhui(1).png')" mode="" @click='goBack'></image>
			<p>{{ pname }}</p>
			<div>
				<image :src="require('../../static/9-17icon/zuijinshijian.svg')" mode=""></image>
				<text>最近更新：{{ time }}</text>
			</div>
		</div>
		<div class='main'>
			<div class="search">
				<image :src="require('../../static/search.svg')" mode=""></image>
				<input type="text" value="" placeholder="搜索点位"/>
			</div>
			<ul> <!-- 点位图 -->
				<li v-for='(item, index) in list' :key='index' @click='goPlan(item)'>
					<image :src="item.src" mode=""></image>
					<text>{{ item.address }}</text>
				</li>
			</ul>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pname: '融创项目一期',
				time: '2020-10-01',
				list: [
					{
						id: 1,
						src: '../../static/point.png',
						address: '北门正门口01'
					},
					{
						id: 2,
						src: '../../static/point.png',
						address: '北门正门口02'
					},
					{
						id: 3,
						src: '../../static/point.png',
						address: '环路东侧'
					},
					{
						id: 4,
						src: '../../static/point.png',
						address: '环路西侧'
					},
					{
						id: 5,
						src: '../../static/point.png',
						address: '北门正门口01'
					},
					{
						id: 6,
						src: '../../static/point.png',
						address: '北门正门口01'
					},
					{
						id: 7,
						src: '../../static/point.png',
						address: '北门正门口01'
					},
				]
			}
		},
		onLoad(option) {
			
		},
		onShow() {
			
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goPlan(list) {
				uni.navigateTo({
					url: '../plan/plan?list=' + JSON.stringify(list)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		width: 100%;
		height: 1200rpx;
		background: url(../../static/9-17icon/bg2.jpg) no-repeat;
		background-size: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		.kong{
			height: 60rpx;
		}
		.goback{
			padding-left: 40rpx;
			padding-right: 40rpx;
			background: transparent;
			width: 90%;
			height: 320rpx;
			line-height: 120rpx;
			margin: 0px auto;
			text-align: center;
			position: relative;
			color: white;
			font-size: 36rpx;
			&>image{
				width: 52rpx;
				height: 52rpx;
				position: absolute;
				left: 40rpx;
				top: 50%;
				margin-top: -120rpx;
			}
			p{
				position: absolute;
				left: 50rpx;
				top: 30%;
				font-size: 40rpx;
				font-weight: bold;
			}
			div{
				width: 400rpx;
				height: 80rpx;
				line-height: 80rpx;
				position: absolute;
				left: 50rpx;
				top: 56%;
				color: #d3d8e7;
				font-size: 26rpx;
				display: flex;
				align-items: center;
				image{
					width: 36rpx;
					height: 36rpx;
					margin-right: 10rpx;
				}
			}
		}
		.main{
			width: 100%;
			height: 100%;
			background: white;
			border-radius: 40rpx;
			position: absolute;
			top: 326rpx;
			.search{
				width: 90%;
				height: 80rpx;
				margin: 60rpx auto;
				position: relative;
				image{
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					left: 20rpx;
					top: 50%;
					margin-top: -20rpx;
				}
				input{
					width: 100%;
					height: 100%;
					border: 1px solid #E6E6E6;
					text-align: center;
					border-radius: 16rpx;
				}
			}
			ul{
				width: 98%;
				margin: 0rpx auto;
				li{
					width: 160rpx;
					height: 160rpx;
					margin-bottom: 30rpx;
					float: left;
					margin-left: 22rpx;
					position: relative;
					image{
						width: 100%;
						height: 120rpx;
						vertical-align: middle;
						border: 1px solid #BBBBBB;
					}
					text{
						display: block;
						width: 100%;
						font-size: 24rpx;
						text-align: center;
						margin-top: 8rpx;
					}
				}
			}
		}
	}
</style>
