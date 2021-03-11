<template> <!-- 乙方项目主管巡检任务 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>巡检任务</text>
			<image :src="require('../../../static/search_white.svg')" mode=""></image>
		</div>
		<div class="search">
			<image :src="require('../../../static/search.svg')" mode=""></image>
			<input type="text" value="" placeholder="搜索点位、编号" />
		</div>
		<div class='tip' v-if='tip'>暂无任务</div>
		<!-- <ul>
			<li v-for="(item, index) in list" :key='index' @click='goTakephoto(item.ispaizhao, item.id)'>
				<p>{{ item.name }}</p>
				<text :class="item.ispaizhao == 0? 'red' : 'blue' ">
					{{ item.ispaizhao == 0? '未拍照' : '已拍照' }}
				</text>
			</li>
		</ul> -->
		<scroll-view scroll-y lower-threshold='50' @scrolltolower='btm' v-if='!tip'>
			<li v-for="(item, index) in list" :key='index' @click='goTakephoto(item.ispaizhao, item.id)'>
				<image :src="item.plan_url" mode="" lazy-load></image>
				<div>
					<div>
						<text :class="item.name.length > 8? 'wid' : '' ">{{ item.name }}</text>
						<p></p>
						<text>{{ item.levelname }}</text>
					</div>
					<p>点位编号：{{ item.dnumber }}</p>
				</div>
				<text :class="item.ispaizhao == 0? 'red' : 'blue' ">
					{{ item.ispaizhao == 0? '未拍照' : '已拍照' }}
				</text>
			</li>
			<li>
				<u-loadmore :status="status" :load-text="loadText" @loadmore="btm"/>
			</li>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tip: true,
				project_id: '',
				id: '',
				list: [],
				status: 'loadmore',
				page: 0,
				loadText: {
					loadmore: '点击或上拉加载更多',
					loading: '努力加载中',
					nomore: '已经没有更多了'
				}
			}
		},
		onLoad(option) {
			this.project_id = option.project_id
			this.id = option.id
		},
		onShow() {
			this.loadmore(0)
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			goTakephoto(ispaizhao, id) {
				uni.navigateTo({
					url: '../takePhoto/takePhoto?id=' + id
				})
			},
			btm() {
				if(this.status == 'nomore') { return }
				this.loadmore(this.page)
			},
			loadmore(page) {
				this.status = 'loading'
				page++
				this.$request('/api/lnspection/regular', { // 点位列表
					project_id: this.project_id,
					uid: this.id,
					page: page,
					limit: 10
				}).then(res => {
					// console.log(res)
					if(res.data.data && res.data.data != '') {
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
						this.tip = false
						this.page = page
						this.status = res.data.data.length < 10? 'nomore' : 'loadmore'
					} else if(page == 1 && res.data.data == '') {
						this.tip = true
					} else {
						this.status = 'nomore'
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		background-color: #F5F6F9;
	}
	.head{
		width: 100%;
		height: 92rpx;
		background: #5E79F2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		text{
			flex-grow: 1;
			text-align: center;
			color: white;
			font-size: 36rpx;
			font-weight: bold;
		}
		image{
			width: 45rpx;
			height: 45rpx;
			margin-left: 40rpx;
			margin-right: 40rpx;
			&:nth-of-type(2){
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
	.search{
		width: 94%;
		margin: 40rpx auto;
		margin-bottom: 30rpx;
		height: 80rpx;
		background-color: white;
		box-shadow: #d3d3d3 0 0 6rpx 0;
		border-radius: 8rpx;
		position: relative;
		image{
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			left: 6%;
			top: 50%;
			margin-top: -20rpx;
		}
		input{
			width: 100%;
			height: 100%;
			text-align: center;
		}
	}
	.tip{
		position: fixed;
		top: 49%;
		width: 100%;
		text-align: center;
		font-size: 32rpx;
		color: #8c8c8c;
	}
	scroll-view{
		width: 94%;
		height: 63%;
		overflow-y: scroll;
		margin: 0 auto;
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
	// ul{
	// 	width: 100%;
	// 	height: auto;
	// 	&::after{
	// 		content: '';
	// 		display: block;
	// 		clear: both;
	// 		visibility: hidden;
	// 		height: 0;
	// 	}
	// 	li{
	// 		float: left;
	// 		width: 208rpx;
	// 		height: 112rpx;
	// 		box-shadow: #d3d3d3 0 0 6rpx 0;
	// 		border-radius: 8rpx;
	// 		text-align: center;
	// 		background-color: white;
	// 		margin-left: 30rpx;
	// 		margin-right: 8rpx;
	// 		margin-bottom: 20rpx;
	// 		p{
	// 			font-size: 30rpx;
	// 			font-weight: bold;
	// 			margin-top: 10rpx;
	// 			margin-bottom: 4rpx;
	// 			max-width: 208rpx;
	// 			overflow: hidden;
	// 			white-space: nowrap;
	// 			text-overflow: ellipsis;
	// 		}
	// 		text{
	// 			font-size: 30rpx;
	// 		}
	// 		.blue{
	// 			color: #6F7CFF;
	// 		}
	// 		.red{
	// 			color: #FF6135;
	// 		}
	// 	}
	// }
</style>
