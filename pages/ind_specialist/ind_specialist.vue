<template> <!-- 专家首页 -->
	<view class="hello">
		<div class="status"></div>
		<div class="top">
			<div class='welcome'>
				<text>xxx专家，您好</text>
				<image :src="require('../../static/remind.png')" mode=""></image>
			</div>
			<div class="loading">
				<div>
					<p class='cir'></p>
					<text>方案进行中</text>
					<text>2</text>
				</div>
				<div>
					<p class='cir'></p>
					<text>总订单量</text>
					<text>15</text>
				</div>
			</div>
		</div>
		<div class="main">
			<div class='new'>
				<div class="tit">
					<div class="blue"></div>
					<text class="title">最近更新方案</text>
					<div class='more' @click='all'>
						全部
						<image :src="require('../../static/jinru.svg')" mode=""></image>
					</div>
				</div>
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
				</ul>
			</div>
			<div class='new'>
				<div class="tit">
					<div class="orange"></div>
					<text class="title">受邀项目</text>
					<div class='more' @click='more'>
						更多
						<image :src="require('../../static/jinru.svg')" mode=""></image>
					</div>
				</div>
				<ul>
					<li @click='goInvite'>
						<div>
							<div class='pname'>
								<text>项目名称：融创项目一期</text>
							</div>
							<div class="time">2020-10-01 16:56</div>
						</div>
						<p>查看</p>
					</li>
					<li>
						<div>
							<div class='pname'>
								<text>项目名称：融创项目二期</text>
							</div>
							<div class="time">2020-10-01 20:30</div>
						</div>
						<p>查看</p>
					</li>
				</ul>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		components:{
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			goCont() {
				uni.navigateTo({
					url: '../point/point'
				})
			},
			all() {
				uni.navigateTo({
					url: '../all_specialist/all_specialist'
				})
			},
			more() {
				
			},
			goInvite() {
				uni.navigateTo({
					url: '../ces/ces'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	uni-scroll-view, uni-swiper-item, uni-view {
	        flex-direction: unset;
	    }
	    uni-swiper-item, uni-view {
	        flex-direction: unset;
	    }
	    .uni-tabbar {
	        position: fixed;
	        bottom: 0;
	        z-index: 999;
	        width: 100%;
	        display: flex;
	        justify-content: space-around;
	        height: 98upx;
	        padding: 16upx 0;
	        box-sizing: border-box;
	        border-top: solid 1upx #ccc;
	        background-color: #fff;
	        box-shadow: 0px 0px 17upx 1upx rgba(206, 206, 206, 0.32);
	        .uni-tabbar__item {
	            display: block;
	            line-height: 24upx;
	            font-size: 20upx;
	            text-align: center;
				image{
					width: 40rpx;
					height: 40rpx;
				}
	        }
	        .uni-tabbar__icon {
	            height: 42upx;
	            line-height: 42upx;
	            text-align: center;
	        }
	        .icon {
	            display: inline-block;
	        }
	        .uni-tabbar__label {
	            line-height: 24upx;
	            font-size: 24upx;
	            color: #000000;
	            &.active {
	                color: #3F5DE3;
	            }
	        }
	    }
		
	.hello{
		width: 100%;
		height: 100%; 
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
	.top{
		background: #5E79F2;
		padding-top: 40rpx;
		width: 100%;
		height: 184rpx;
		.welcome{
			width: 90%;
			height: 60rpx;
			font-size: 34rpx;
			margin: 0rpx auto;
			display: flex;
			justify-content: space-between;
			text{
				color: white;
			}
			image{
				width: 40rpx;
				height: 40rpx;
			}
		}
		.loading{
			width: 90%;	
			height: 60rpx;
			margin: 40rpx auto;
			display: flex;
			align-items: center;
			&>div{
				width: 200rpx;
				margin-right: 50rpx;
				color: white;
				display: flex;
				align-items: baseline;
				justify-content: space-between;
				.cir{
					width: 12rpx;
					height: 12rpx;
					background: #FFAC27;
					margin-right: 14rpx;
				}
				text:nth-of-type(1){
					font-size: 30rpx;
					flex-grow: 1;
				}
				text:nth-of-type(2){
					font-weight: bold;
				}
			}
		}
	}
	.main{
		width: 100%;
		height: 1000rpx;
		// border: 1px solid red;
		.new{
			width: 100%;
			height: auto;
			background: white;
			box-shadow: #c8c8c8 0px 0px 2px 0px;
			margin-top: 30rpx;
			.tit{
				width: 100%;
				height: 88rpx;
				border-bottom: 1px solid #F4F4F4;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.blue{
					width: 14rpx;
					height: 60rpx;
					background: #768FFF;
					margin-right: 20rpx;
				}
				.orange{
					width: 14rpx;
					height: 60rpx;
					margin-right: 20rpx;
					background: #FFAC27;
				}
				.title{
					font-weight: bold;
					flex-grow: 1;
					font-size: 34rpx;
				}
				.more{
					color: #8A8886;
					font-size: 26rpx;
					display: flex;
					align-items: center;
					margin-right: 40rpx;
					image{
						width: 30rpx;
						height: 30rpx;
					}
				}
			}
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
		
	}
</style>
