<template> <!-- 巡检任务 -->
	<view class='hello'>
		<view>
			<u-tabs-swiper ref="uTabs" :list="lists" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750" height='90'></u-tabs-swiper>
		</view>
		<swiper style="height: 91%;margin: 10rpx auto;" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" duration='300'>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y lower-threshold='50' @scrolltolower='btmLeft'>
					<li v-for="(item, index) in listLeft" :key='index' @click='goTakePhoto(item.id)'>
						<image :src="item.plan_url" mode="" lazy-load></image>
						<div>
							<div>
								<text :class="item.name.length > 8? 'wid' : '' ">{{ item.name }}</text>
								<p></p>
								<text>{{ item.levelname }}</text>
							</div>
							<p>工单时间：{{ item.ptime }}</p>
						</div>
						<text :class="item.ispaizhao == 0? 'red' : 'blue' ">
							{{ item.ispaizhao == 0? '未拍照' : '已拍照' }}
						</text>
					</li>
					<li>
						<u-loadmore :status="statusLeft" :load-text="loadText" @loadmore="btmLeft"/>
					</li>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y lower-threshold='50' @scrolltolower='btmRight'>
					<li v-for="(item, index) in listRight" :key='index' @click='goTakePhoto(item.id)'>
						<image :src="item.plan_url" mode="" lazy-load></image>
						<div>
							<div>
								<text :class="item.name.length > 8? 'wid' : '' ">{{ item.name }}</text>
								<p></p>
								<text>{{ item.levelname }}</text>
							</div>
							<p>工单时间：{{ item.ptime }}</p>
						</div>
						<text :class="item.ispaizhao == 0? 'red' : 'blue' ">
							{{ item.ispaizhao == 0? '未拍照' : '已拍照' }}
						</text>
					</li>
					<li>
						<u-loadmore :status="statusRight" :load-text="loadText" @loadmore="btmRight"/>
					</li>
				</scroll-view>
			</swiper-item>
		</swiper>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: [{ name: '待处理' }, { name: '已处理' }],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				id: '',
				time: new Date().Format("yyyy-MM-dd"),
				listLeft: [],
				listRight: [],
				statusLeft: 'loadmore',
				statusRight: 'loadmore',
				pageLeft: 0,
				pageRight: 0,
				loadText: {
					loadmore: '点击或上拉加载更多',
					loading: '努力加载中',
					nomore: '已经没有更多了'
				}
			}
		},
		onLoad(option) {
			this.project_id = option.project_id
			if(option.id) { this.id = option.id }
		},
		onShow() {
			this.loadmoreLeft(0) // 待处理
			this.loadmoreRight(0) // 已处理
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			btmLeft() {
				if(this.statusLeft == 'nomore') { return }
				this.loadmoreLeft(this.pageLeft)
			},
			btmRight() {
				if(this.statusRight == 'nomore') { return }
				this.loadmoreRight(this.pageRight)
			},
			loadmoreLeft(page) {
				this.statusLeft = 'loading'
				page++
				this.$request('/api/lnspection/regular', {
					uid: this.id,
					project_id: this.project_id,
					type: 1,
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
								this.listLeft = res.data.data
								break;
							default:
								for(var i = 0; i < res.data.data.length; i++) {
									res.data.data[i].plan_url += this.$store.state.imgFix // 在图片后加上参数
									this.listLeft.push(res.data.data[i])
								}
						}
						this.pageLeft = page
						this.statusLeft = res.data.data.length < 10? 'nomore' : 'loadmore'
					} else {
						this.statusLeft = 'nomore'
					}
				})
			},
			loadmoreRight(page) {
				this.statusRight = 'loading'
				page++
				this.$request('/api/lnspection/regular', {
					uid: this.id,
					project_id: this.project_id,
					type: 2,
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
								this.listRight = res.data.data
								break;
							default:
								for(var i = 0; i < res.data.data.length; i++) {
									res.data.data[i].plan_url += this.$store.state.imgFix // 在图片后加上参数
									this.listRight.push(res.data.data[i])
								}
						}
						this.pageRight = page
						this.statusRight = res.data.data.length < 10? 'nomore' : 'loadmore'
					} else {
						this.statusRight = 'nomore'
					}
				})
			},
			goTakePhoto(id) {
				uni.navigateTo({
					url: '../ind_provider/takePhoto/takePhoto?id=' + id
				})
			}
		}
	}
</script>

<style lang="less">
.hello{
	width: 100%;
	position: fixed;
	top: 0;
	bottom: 0;
	background-color: #f4f4f4;
}
.head{
	width: 100%;
	height: 150rpx;
	background-color: white;
	display: flex;
	justify-content: space-around;
	align-items: center;
	&>view{
		width: 40%;
		height: auto;
		box-sizing: border-box;
		padding: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		image{
			width: 54rpx;
			height: 54rpx;
			margin-bottom: 10rpx;
		}
		text{
			font-size: 28rpx;
			font-weight: bold;
		}
	}
}
scroll-view{
	width: 94%;
	height: 100%;
	overflow-y: scroll;
	margin: 0rpx auto;
	li{
		width: 99%;
		margin: 1rpx auto;
		height: 140rpx;
		border-radius: 10rpx;
		background: white;
		box-shadow: #bebebf 0 0 6rpx 0;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 28rpx;
		image{
			width: 120rpx;
			height: 120rpx;
			margin-left: 20rpx;
			margin-right: 30rpx;
		}
		&>div{
			width: 60%;
			text-align: left;
			&>div{
				display: flex;
				align-items: center;
				.wid{
					width: 52%;
				}
				text:nth-of-type(1){
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				p{
					width: 2rpx;
					height: 30rpx;
					background-color: #ADAFAD;
					margin: 0 20rpx 0 20rpx;
				}
				text:nth-of-type(2){
					color: #808180;
				}
			}
			p{
				margin-top: 10rpx;
			}
		}
		.red{
			color: #FF6127;
		}
		.blue{
			color: #6F7CFF;
		}
		&>text{
			margin-right: 20rpx;
			font-weight: bold;
		}
		&:nth-last-of-type(1) {
			width: 99%;
			height: auto;
			margin-bottom: 40rpx;
			background: transparent;
			box-shadow: none;
		}
	}
}
</style>
