<template>  <!-- 乙方项目主管首页（旧版） -->
	<view class='hello'>
		<div class="status"></div>
		<div class='top'>
			<div class='title'>
				<text>融创项目一期</text>
				<image :src="require('../../static/remind.png')" mode=""></image>
			</div>
			<div class='btn'>
				<div @click='goTask'>
					<image :src="require('../../static/10-13/fabu.svg')" mode=""></image>
					<text>发布任务</text>
				</div>
				<div @click='goAgree(1)'>
					<image :src="require('../../static/10-13/wait.svg')" mode=""></image>
					<text>待审批</text>
				</div>
				<div @click='goPoint'>
					<image :src="require('../../static/10-13/fangan.svg')" mode=""></image>
					<text>项目方案</text>
				</div>
			</div>
		</div>
		<div class="nav">
			<div @click='gotaskAdmin'>
				<image :src="require('../../static/10-13/renwu.svg')" ></image>
				<text>任务管理</text>
			</div>
			<div @click='goOrder(0)'>
				<image :src="require('../../static/10-13/gongdan.svg')" ></image>
				<text>工单管理</text>
			</div>
			<div @click="goAgree(0)">
				<image :src="require('../../static/10-13/shenpi.svg')"></image>
				<text>审批管理</text>
			</div>
			<div @click="goces(0)">
				<image :src="require('../../static/10-13/msg.svg')" ></image>
				<text>项目信息</text>
			</div>
			<div @click='goWorker'>
				<image :src="require('../../static/10-13/gongren.svg')" ></image>
				<text>工人信息</text>
			</div>
		</div>
		<div class="new">
			<div class='title'>
				<text>最新</text>
			</div>
			<ul class='list'>
				<li @click='goisPass(0)'>
					<div class='tit'>审批</div>
					<div class='text'>
						<p>任务类型：修剪</p>
						<text>2020-09-27 16:57</text>
					</div>
					<div class='inner'>查看</div>
				</li>
				<li @click='goAllot(0)'>
					<div class='tit'>任务</div>
					<div class='text'>
						<p>任务类型：修剪</p>
						<text>2020-09-27 16:57</text>
					</div>
					<div class='inner'>查看</div>
				</li>
			</ul>
		</div>
		<div class="pic">
			<image src="../../static/10-13/pic.png" mode=""></image>
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
			goTask(){
				uni.navigateTo({
					url: '../task/task'
				})
			},
			goAgree(index) {
				uni.navigateTo({
					url: '../agree/agree?index=' + index
				})
			},
			goPoint() {
				uni.navigateTo({
					url: '../point/point'
				})
			},
			goces(msg){
				uni.navigateTo({
					url: '../ces/ces?msg=' + msg
				})
			},
			goisPass(status) {
				// console.log(status)
				uni.navigateTo({
					url: '../agree/isPass/isPass?status=' + status
				})
			},
			gotaskAdmin() {
				uni.navigateTo({
					url: '../taskAdmin/taskAdmin'
				})
			},
			goAllot(status) {
				uni.navigateTo({
					url: '../allot/allot?status=' + status
				})
			},
			goOrder(status) {
				uni.navigateTo({
					url: '../order/order?status=' + status
				})
			},
			goWorker() {
				uni.navigateTo({
					url: '../worker/worker'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.status{
		background: #5E79F2;
		height: var(--status-bar-height);
	}
	.hello{
		width: 100%;
		height: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		top: 0;
		background: #F5F6F9;
		.top{
			width: 100%;
			height: 268rpx;
			background: #5E79F2;
			.title{
				width: 90%;
				margin: 0 auto;
				height: 60rpx;
				color: white;
				font-size: 36rpx;
				font-weight: bold;
				display: flex;
				justify-content: space-between;
				align-items: center;
				image{
					width: 40rpx;
					height: 40rpx;
				}
			}
			.btn{
				width: 90%;
				margin: 50rpx auto;
				display: flex;
				div{
					width: 130rpx;
					height: 130rpx;
					text-align: center;
					display: flex;
					align-items: center;
					flex-direction: column;
					margin-right: 30rpx;
					image{
						width: 70rpx;
						height: 70rpx;
						margin-bottom: 6rpx;
					}
					text{
						color: white;
						font-size: 26rpx;
					}
				}
			}
		}
		.nav{
			width: 100%;
			height: 196rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			div{
				width: 200rpx;
				height: 200rpx;
				margin-top: 110rpx;
				display: flex;
				flex-direction: column;
				text-align: center;
				align-items: center;
				image{
					width: 65rpx;
					height: 65rpx;
				}
				text{
					font-size: 26rpx;
					margin-top: 8rpx;
				}
			}
		}
		.new{
			width: 100%;
			height: 400rpx;
			background: white;
			.title{
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				border-bottom: 1px solid #F2F2F2;
				text{
					text-align: left;
					display: block;
					width: 90%;
					height: 100%;
					margin: 0 auto;
					font-size: 30rpx;
					font-weight: bold;
				}
			}
			.list{
				width: 100%;
				li{
					width: 90%;
					height: 156rpx;
					margin: 0 auto;
					border-bottom: 1px solid #F2F2F2;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.tit{
						width: 84rpx;
						height: 84rpx;
						margin-right: 30rpx;
						text-align: center;
						line-height: 84rpx;
						background: #FFAC27;
						color: white;
						font-size: 28rpx;
						border-radius: 50%;
					}
					.text{
						flex-grow: 1;
						display: flex;
						flex-direction: column;
						text{
							margin-top: 4rpx;
							color: #999999;
							font-size: 24rpx;
						}
						
					}
					.inner{
						color: #5E79F2;
						font-size: 28rpx;
					}
					&:nth-of-type(2){
						border-bottom: none;
						.tit{
							background: #5E79F2;
						}
					}
				}
			}
		}
		.pic{
			width: 94%;
			height: 200rpx;
			margin: 40rpx auto;
			image{
				width: 100%;
				height: 100%;
				vertical-align: middle;
			}
		}
	}
</style>
