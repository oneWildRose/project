<template> <!-- 专家首页 -->
	<view class="hello">
		<div>
			<div class="status"></div>
			<div class='welcome'>欢迎使用境云管理平台 (专家版)</div>
			<div class="main">
				<div class="deal">		<!-- 交易公告 -->
					<div>
						<image :src="require('../../static/deal.svg')" mode=""></image>
						<text>交易公告</text>
					</div>
					<swiper class="swiper" :autoplay="true" :interval='3000' vertical>
						<swiper-item>
							<view>恭喜张三圆满完成任务</view>
						</swiper-item>
						<swiper-item>
							<view>恭喜李四圆满完成任务</view>
						</swiper-item>
						<swiper-item>
							<view>恭喜王五圆满完成任务</view>
						</swiper-item>
					</swiper>
				</div>
				<div class="task">
					<div class="tit">任务推荐</div>
					<scroll-view scroll-y lower-threshold='50' @scrolltolower='btm'>
						<li v-for='(item, index) in list' :key='index' @click='goTaskMsg(item.id)'>
							<div class="tit">
								<p>{{ item.pname }}</p>
								<text class="blue">征集中</text>
								<!-- <text :class="item.status == 0? 'gray' : item.status == 1? 'blue' : 'orange'">
									{{ item.status == 0? '已完成' : item.status == 1? '征集中' : '沟通中' }}
								</text> -->
							</div>
							<p class='need'>{{ item.cliam }}</p>
							<p class='time'>发布时间：{{ item.fabutime }}</p>
						</li>
						<li>
							<u-loadmore :status="status" :load-text="loadText" @loadmore="btm"/>
						</li>
					</scroll-view>
				</div>
			</div>
		</div>
		<u-tabbar v-model="current" :list="lists" active-color='#5E79F2'></u-tabbar>
	</view>
</template>

<script>
	export default {
		components:{
			
		},
		data() {
			return {
				lists: [
					{
						iconPath: "../../static/shouye(2).png",
						selectedIconPath: "../../static/shouye.png",
						text: '首页',
						isDot: true,
						customIcon: false,
						pagePath: '/pages/ind_specialist/ind_specialist',
					},
					{
						iconPath: "../../static/new.png",
						selectedIconPath: "../../static/new(2).png",
						text: '消息',
						isDot: true,
						customIcon: false,
						pagePath: '/pages/message/message',
					},
					{
						iconPath: "../../static/wode.png",
						selectedIconPath: "../../static/wode(2).png",
						text: '个人中心',
						isDot: true,
						customIcon: false,
						pagePath: '/pages/personal/personal',
					}
				],
				current: 0, // 当前tabbar激活项的索引
				list: [],
				status: 'loadmore',
				page: 0,
				loadText: {
					loadmore: '点击或上拉加载更多',
					loading: '努力加载中',
					nomore: '已经没有更多了'
				},
			}
		},
		onShow() {
			this.loadmore(0)
		},
		methods: {
			goTaskMsg(id) {
				uni.navigateTo({
					url: './task_msg/task_msg?project_id=' + id
				})
			},
			btm() {
				if(this.status == 'nomore') { return }
				this.loadmore(this.page)
			},
			loadmore(page) {
				this.status = 'loading'
				page++
				this.$request('/api/Highseasapi/highseaslist', {
					page: page,
					limit: 10
				}).then(res => {
					// console.log(res)
					if(res.data.code == 1) {
						switch (page) {
							case 1:
								for(var i = 0; i < res.data.data.length; i++) {
									res.data.data[i].plan_url += this.$store.state.imgFix // 在图片后加上参数
								}
								this.list = res.data.data
								break;
							default:
								for(var i = 0; i < res.data.data.length; i++) {
									res.data.data[i].plan_url += this.$store.state.imgFix // 在图片后加上参数
									this.list.push(res.data.data[i])
								}
						}
						this.page = page
						this.status = res.data.data.length < 10? 'nomore' : 'loadmore'
					} else {
						this.status = 'nomore'
					}
				})
			},
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
			goInvite(msg) {
				uni.navigateTo({
					url: '../ces/ces?msg=' + msg
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.status{
		background: #5D6CFF;
		height: var(--status-bar-height);
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
		&>div{
			height: 100%;
		}
	}
	.welcome{
		width: 100%;
		height: 164rpx;
		background: #5D6CFF;
		line-height: 164rpx;
		text-align: center;
		font-size: 38rpx;
		font-weight: bold;
		z-index: 999;
		color: white;
		background: #5D6CFF url(../../static/pt.svg) no-repeat 90%;
		background-size: 232rpx 180rpx;
	}
	.main{
		width: 90%;
		height: 72%;
		margin: 20rpx auto;
		.deal{
			width: 100%;
			height: 132rpx;
			background: white;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 10rpx;
			div{
				width: 240rpx;
				height: 64rpx;
				line-height: 64rpx;
				border-right: 1px solid #FFE0A5;
				display: flex;
				align-items: center;
				font-size: 33rpx;
				image{
					width: 50rpx;
					height: 50rpx;
					margin-left: 20rpx;
					margin-right: 12rpx;
				}
			}
			.swiper{
				width: 400rpx;
				height: 64rpx; 
				font-size: 33rpx;
				view{
					height: 64rpx;
					line-height: 64rpx;
				}
			}
		}
		.task{
			width: 100%;
			padding-bottom: 10rpx;
			height: 83%;
			margin: 20rpx auto;
			background: white;
			border-radius: 10rpx;
			&>.tit{
				width: 100%;
				height: 108rpx;
				line-height: 108rpx;
				font-weight: bold;
				border-bottom: 1px solid #E1E1E1;
				font-size: 34rpx;
				text-align: left;
				text-indent: 40rpx;
			}
			
			scroll-view{
				width: 90%;
				margin: 20rpx auto;
				max-height: 82%;
				overflow-y: scroll;
				li{
					width: 100%;
					height: auto;
					list-style: none;
					padding-bottom: 10rpx;
					border-radius: 8rpx;
					background: #F5F5F9;
					margin-bottom: 20rpx;
					.tit{
						width: 90%;
						height: 70rpx;
						margin: 0 auto;
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 30rpx;
						text{
							font-weight: bold;
						}
						.blue{
							color: #5D6CFF;
						}
						.orange{
							color: #F8A700;
						}
						.gray{
							color: #B7B7BD;
						}
					}
					&>p{
						width: 90%;
						margin: 0 auto;
						font-size: 28rpx;
						color: #8E908F;
						margin-bottom: 10rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					&:nth-last-of-type(1){
						background: none;
					}
				}
			}
		}
	}
</style>
