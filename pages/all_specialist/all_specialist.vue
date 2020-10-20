<template> <!-- 全部方案（专家页） -->
	<view class="hello">
		<div class="status"></div>
		<div class="tit">
			<div>
				<image :src="require('../../static/fanhui(1).png')" mode="" @click="goBack"></image>
				<text>全部方案</text>
			</div>
		</div>
		<div class="search">
			<input type="text" value="" placeholder="输入项目名称"/>
			<image :src="require('../../static/search.svg')" mode=""></image>
		</div>
		<div class="main">
			<ul>
				<li @click='goCont'>
					<div>
						<div class='pname'>
							<text>项目名称：融创项目一期</text>
							<div class='status'>进行中</div>
						</div>
						<div class="time">2020-10-01 16:56</div>
					</div>
					<p>查看</p>
				</li>
				<li @click='goCont'>
					<div>
						<div class='pname'>
							<text>项目名称：融创项目二期</text>
							<div class='status'>进行中</div>
						</div>
						<div class="time">2020-10-01 20:30</div>
					</div>
					<p>查看</p>
				</li>
				<li @click='goCont'>
					<div>
						<div class='pname'>
							<text>项目名称：万科项目一期</text>
							<div class='status ok'>已完成</div>
						</div>
						<div class="time">2020-10-01 16:56</div>
					</div>
					<p>查看</p>
				</li>
				<li @click='goCont'>
					<div>
						<div class='pname'>
							<text>项目名称：万科项目二期</text>
							<div class='status ok'>已完成</div>
						</div>
						<div class="time">2020-10-01 20:30</div>
					</div>
					<p>查看</p>
				</li>
				<li @click='goCont'>
					<div>
						<div class='pname'>
							<text>项目名称：北京碧桂园项目</text>
							<div class='status ok'>已完成</div>
						</div>
						<div class="time">2020-10-01 20:30</div>
					</div>
					<p>查看</p>
				</li>
			</ul>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goCont() {
				uni.navigateTo({
					url: '../point/point'
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: #F5F6F9;
	}
	.status{
		background: #5E79F2;
		height: var(--status-bar-height);
	}
	.tit{
		width: 100%;
		height: 100rpx;
		background: #5E79F2;
		&>div{
			width: 90%;
			height: 100%;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			image{
				width: 44rpx;
				height: 44rpx;
				vertical-align: middle;
			}
			text{
				color: white;
				flex-grow: 1;
				text-align: center;
				margin-left: -5%;
			}
		}
	}
	.search{
		width: 100%;
		height: 120rpx;
		background: #F5F6F9;
		position: relative;
		input{
			width: 90%;
			height: 84rpx;
			margin: 30rpx auto;
			background: white;
			border: 1px solid #849dff;
			text-align: center;
			font-size: 30rpx;
			border-radius: 16rpx;
		}
		image{
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			left: 8%;
			top: 50%;
			margin-top: -34rpx;
		}
	}
	.main{
		width: 100%;
		height: auto;
		background: white;
		box-shadow: #c8c8c8 0px 0px 2px 0px;
		ul{
			width: 92%;
			margin: 0 auto;
			li{
				width: 100%;
				height: 136rpx;
				border-bottom: 1px solid #F4F4F4;
				display: flex;
				justify-content: space-between;
				align-items: center;
				&:nth-last-of-type(1) {
					border-bottom: none;
				}
				&>div{
					height: 112rpx;
					font-size: 28rpx;
					margin-left: 20rpx;
					.pname{
						width: 100%;
						height: 60rpx;
						font-size: 30rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						text{
							margin-right: 20rpx;
						}
						.status{
							width: 100rpx;
							height: 48rpx;
							line-height: 48rpx;
							text-align: center;
							border-radius: 40rpx;
							background: #768FFF;
							color: white;
							font-size: 24rpx;
							font-weight: bold;
						}
						.ok{
							background: #B9B9B9 !important;
						}
					}
					.time{
						color: #9FA19C;
						font-size: 26rpx;
					}
				}
				p{
					font-size: 28rpx;
					color: #768FFF;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
