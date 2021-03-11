<template>  <!-- 专家智库 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="head">
			<div class='title'>
				<image :src="require('../../static/fanhui(1).png')" mode="" @click="goBack"></image>
				<text>专家智库</text>
			</div>
			<div class='search'>
				<image :src="require('../../static/search.svg')" mode=""></image>
				<input type="text" value="" placeholder="输入专家名称" />
			</div>
		</div>
		<!-- <ul> -->
		<scroll-view class='ul' scroll-y="true" :lower-threshold='50' @scrolltolower='btm'>
			<li v-for="(item, index) in list" :key='index' @click='goSpecialistmsg(item.id)'>
				<image :src="item.file" mode=""></image>
				<div class="cont">
					<div>
						<text>{{ item.name == null? '昵称' : item.name }}</text>
						<div :class="item.tagName && item.tagName.length > 3? 'right':'' ">
							<p v-for="(item_, index_) in item.tagName" :key='index_'>
								{{ item_ }}
							</p>
						</div>
					</div>
					<p>客户满意度 100%</p>
					<text>擅长：{{ item.introduce == null? '暂无' : item.introduce }}</text>
				</div>
			</li>
			<li>
				<u-loadmore :status="status" :load-text="loadText" @loadmore="btm"/>
			</li>
		</scroll-view>
		<!-- </ul> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '../../static/touxiang.svg',// 默认头像
				page: 1,
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
			// this.list = []
			this.loadmore(0)
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			btm(){
				if(this.status == 'nomore') { return }
				this.loadmore(this.page)
			},
			loadmore(page) { // 点击加载更多
				this.status = 'loading'
				page ++
				this.$request('/api/index/index', { // 首页专家列表
					limit: 10,
					page: page
				}).then(res => {
					// console.log(res.data.data)
					if(res.data.data && res.data.data != '') {
						switch (page){
							case 1:
								for(var i = 0; i < res.data.data.length; i++) {
									if(res.data.data[i].file == null) {
										res.data.data[i].file = this.src
									}
									res.data.data[i].file += this.$store.state.imgFix
								}
								this.list = res.data.data
								break;
							default:
								for(var i = 0; i < res.data.data.length; i++) {
									if(res.data.data[i].file == null) {
										res.data.data[i].file = this.src
									}
									res.data.data[i].file += this.$store.state.imgFix
									this.list.push(res.data.data[i])
								}
								break;
						}
						this.page = page
						this.status = res.data.data.length < 10? 'nomore' : 'loadmore'
					} else {
						this.status = 'nomore'
					}
				})
			},
			goSpecialistmsg(id) { // 专家信息
				uni.navigateTo({
					url: './specialistMsg/specialistMsg?id=' + id
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
	}
	.head{
		width: 100%;
		height: 236rpx;
		background-color: #6876FF;
		&>div{
			width: 94%;
			margin: 0 auto;
			height: 50%;
		}
		.title{
			display: flex;
			align-items: center;
			justify-content: space-between;
			image{
				width: 50rpx;
				height: 50rpx;
			}
			text{
				flex-grow: 1;
				text-align: center;
				margin-left: -60rpx;
				font-size: 36rpx;
				color: white;
				font-weight: bold;
			}
		}
		.search{
			width: 94%;
			height: 80rpx;
			position: relative;
			background-color: white;
			border-radius: 8rpx;
			image{
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				left: 10%;
				top: 50%;
				margin-top: -20rpx;
			}
			input{
				width: 100%;
				height: 100%;
				text-align: center;
			}
		}
	}
	.ul{
		width: 100%;
		margin-top: 20rpx;
		// max-height: 1220rpx;
		max-height: 77.5%;
		overflow-y: scroll;
		li{
			width: 90%;
			height: 240rpx;
			margin: 0 auto;
			margin-bottom: 20rpx;
			border-bottom: 1px solid #E8E8E8;
			display: flex;
			align-items: center;
			image{
				width: 124rpx;
				height: 124rpx;
				border-radius: 50%;
				margin-right: 20rpx;
				margin-top: -90rpx;
			}
			.cont{
				width: 512rpx;
				height: 90%;
				&>div{
					width: 100%;
					display: flex;
					align-items: center;
					text{
						font-weight: bold;
						font-size: 34rpx;
						width: 30%;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						margin-right: 30rpx;
					}
					div{
						width: 66%;
						height: 46rpx;
						display: flex;
						overflow: hidden; /* ios此条不能省略，安卓无事 */
						overflow-x: scroll; /* ios端，只设置x/y轴滚动时可以四处拖动 */
						white-space: nowrap;
						&.right{
							box-shadow: -10rpx 0 16rpx -18rpx #000 inset;
						}
						&.left{
							box-shadow: 0 -10rpx 16rpx -18rpx #000 inset;
						}
						p{
							width: auto;
							height: 40rpx;
							line-height: 40rpx;
							font-size: 24rpx;
							padding-left: 16rpx;
							padding-right: 16rpx;
							border-radius: 20rpx;
							font-weight: bold;
							margin-left: 10rpx;
							margin-bottom: 5rpx;
							&:nth-of-type(1){
								border: 1px solid #00CC1E;
								color: #00CC1E;
							}
							&:nth-of-type(2){
								border: 1px solid #4CD9C0;
								color: #4CD9C0;
							}
							&:nth-of-type(3){
								border: 1px solid #A4ADFF;
								color: #A4ADFF;
							}
							&:nth-of-type(4){
								border: 1px solid #00CC1E;
								color: #00CC1E;
							}
						}
					}
				}
				&>p{
					font-size: 34rpx;
					margin: 20rpx 0 20rpx 0;
				}
				&>text{
					display: block;
					font-size: 28rpx;
					width: 100%;
					height: 80rpx;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
			&:nth-last-of-type(1) {
				width: 90%;
				display: block;
				text-align: center;
				height: 60rpx;
				line-height: 60rpx;
				border: none;
				margin: 0 auto;
				color: #a2a2a2;
				font-size: 28rpx;
			}
		}
	}
</style>
