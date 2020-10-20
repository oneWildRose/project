<template> <!-- 审批管理 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="title">
			<div class="goback">
				<image src="../../static/fanhui(1).png" mode="" @click="goBack"></image>
				<text>审批</text>
				<image src="../../static/search_white.svg" mode=""></image>
			</div>
			<div class="tab">
				<div v-for='(item, ind) in list_tab' :key='ind' @click='tab(ind)'>
					<text :class='index == ind? "color" : ""'>{{ item }}</text>
					<div :class='index == ind? "wire" : ""'></div>
				</div>
			</div>
		</div>
		<div class="content">
			<ul v-if='index == 0'> <!-- 全部 -->
				<li v-for='(item, index) in list_cont' :key='index' @click='goisPass(item.status)'>
					<div class='tit'>
						<text>任务类型：{{ item.type }}</text>
						<image :src="require('../../static/more(2).svg')" mode=""></image>
					</div>
					<div class='cont'>
						<p>任务描述：{{ item.cont }}</p>
						<p>
							<text>{{ item.time }}</text>
							<text :class="item.status == 0? 'orange' : item.status == 1? 'blue' : 'red'">
								{{ item.status == 0? '待审批' : item.status == 1? '合格' : '不合格'}}
							</text>
						</p>
					</div>
				</li>
			</ul>
			<ul v-if='index == 1'>
				<li v-for='(item, index) in list_cont' :key='index' v-if='item.status == 0' @click='goisPass(item.status)'>
					<div class='tit'>
						<text>任务类型：{{ item.type }}</text>
						<image :src="require('../../static/more(2).svg')" mode=""></image>
					</div>
					<div class='cont'>
						<p>任务描述：{{ item.cont }}</p>
						<p>
							<text>{{ item.time }}</text>
							<text class="orange">
								待审批
							</text>
						</p>
					</div>
				</li>
			</ul>
			<ul v-if='index == 2'>
				<li v-for='(item, index) in list_cont' :key='index' v-if='item.status == 1' @click='goisPass(item.status)'>
					<div class='tit'>
						<text>任务类型：{{ item.type }}</text>
						<image :src="require('../../static/more(2).svg')" mode=""></image>
					</div>
					<div class='cont'>
						<p>任务描述：{{ item.cont }}</p>
						<p>
							<text>{{ item.time }}</text>
							<text class="blue">
								合格
							</text>
						</p>
					</div>
				</li>
			</ul>
			<ul v-if='index == 3'>
				<li v-for='(item, index) in list_cont' :key='index' v-if='item.status == 2' @click='goisPass(item.status)'>
					<div class='tit'>
						<text>任务类型：{{ item.type }}</text>
						<image :src="require('../../static/more(2).svg')" mode=""></image>
					</div>
					<div class='cont'>
						<p>任务描述：{{ item.cont }}</p>
						<p>
							<text>{{ item.time }}</text>
							<text class="red">
								不合格
							</text>
						</p>
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
				index: '',
				list_tab: ['全部', '待审批', '已通过', '未通过'],
				list_cont: [
					{
						type: '修剪',
						cont: '绿化A1区02绿化A1区02绿化A1区02绿化A1区02绿化A1区02',
						time: '2020-08-06 16:30',
						status: 0 // 0待审批，1合格，2不合格
					},
					{
						type: '施肥',
						cont: '绿化A1区02绿化A1区02绿化A1区02绿化A1区02绿化A1区02',
						time: '2020-08-06 16:30',
						status: 1 // 0待审批，1合格，2不合格
					},
					{
						type: '浇水',
						cont: '绿化A1区02绿化A1区02绿化A1区02绿化A1区02绿化A1区02',
						time: '2020-08-06 16:30',
						status: 2 // 0待审批，1合格，2不合格
					},
					{
						type: '修剪',
						cont: '绿化A1区02绿化A1区02绿化A1区02绿化A1区02绿化A1区02',
						time: '2020-08-06 16:30',
						status: 0 // 0待审批，1合格，2不合格
					},
					{
						type: '施肥',
						cont: '绿化A1区02绿化A1区02绿化A1区02绿化A1区02绿化A1区02',
						time: '2020-08-06 16:30',
						status: 1 // 0待审批，1合格，2不合格
					},
					{
						type: '浇水',
						cont: '绿化A1区02绿化A1区02绿化A1区02绿化A1区02绿化A1区02',
						time: '2020-08-06 16:30',
						status: 2 // 0待审批，1合格，2不合格
					},
				]
			};
		},
		onLoad(option) {
			console.log(option)
			this.index = option.index
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			tab(i) {
				this.index = i
			},
			goisPass(status) {
				// console.log(status)
				uni.navigateTo({
					url: './isPass/isPass?status=' + status
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: #F5F6F9;
	}
	.title{
		width: 100%;
		height: 188rpx;
		background: #5E79F2;
		.goback{
			width: 90%;
			margin: 0 auto;
			height: 100rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			image{
				width: 50rpx;
				height: 50rpx;
			}
			text{
				flex-grow: 1;
				text-align: center;
				color: white;
				font-size: 36rpx;
				font-weight: bold;
			}
		}
		.tab{
			width: 74%;
			margin-top: 10rpx;
			margin-left: 40rpx;
			height: 78rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			&>div{
				display: flex;
				flex-direction: column;
				align-items: center;
				text{
					color: #CBD3FD;
				}
				.color{
					color: white;
				}
				.wire{
					width: 40rpx;
					height: 0;
					margin-top: 4rpx;
					border: 1px solid white;
				}
			}
		}
	}
	.content{
		width: 100%;
		height: 90%;
		overflow:auto;
		ul{
			width: 100%;
			height: auto;
			li{
				width: 100%;
				height: 320rpx;
				margin-top: 40rpx;
				background: white;
				border-top: 1px solid #EEEEEE;
				border-bottom: 1px solid #EEEEEE;
				&:nth-last-of-type(1){
					margin-bottom: 200rpx;
				}
				.tit{
					width: 90%;
					margin: 0 auto;
					height: 108rpx;
					border-bottom: 1px solid #E3E3E3;
					display: flex;
					justify-content: space-between;
					align-items: center;
					text{
						font-weight: bold;
					}
					image{
						width: 50rpx;
						height: 50rpx;
						margin-top: 20rpx;
					}
				}
				.cont{
					width: 90%;
					margin: 0 auto;
					height: 208rpx;
					display: flex;
					flex-direction: column;
					p{
						font-size: 30rpx;
						&:nth-of-type(1){
							margin-bottom: 20rpx;
							margin-top: 30rpx;
						}
						&:nth-of-type(2){
							display: flex;
							justify-content: space-between;
							align-items: center;
							text{
								&:nth-of-type(1){
									color: #929392;
								}
							}
							.orange{ // 待审批状态色
								color: #FAB04E;
							}
							.blue{ // 合格状态色
								color: #5E79F2;
							}
							.red{ // 不合格状态色
								color: red;
							}
						}
					}
				}
			}
		}
	}
</style>
