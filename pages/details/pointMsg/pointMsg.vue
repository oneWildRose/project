<template>  <!-- 点位信息 -->
	<view class="hello">
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>点位信息</text>
		</div>
		<div class="main">
			<div class='search'>
				<image :src="require('../../../static/search.svg')" mode=""></image>
				<input type="text" value="" placeholder="搜索点位、编号"/>
			</div>
			<div class="all">
				<div class='left'>
					<image :src="require('../../../static/tongji.svg')"></image>
					<text>点位总计：{{ count }}</text>
				</div>
				<div class='right' @click='goRule'>
					<image :src="require('../../../static/rule.svg')"></image>
					<text>点位规则</text>
				</div>
			</div>
			<scroll-view scroll-y="true" :lower-threshold='50' @scrolltolower='btm'>
				<ul>
					<li v-for="(item, index) in list" :key='index' @click='goPointmsg(item.id)'>
						<image :src="item.url" mode=""></image>
						<div>
							<div>
								<text :class="item.name.length > 12? 'wid' : '' ">{{ item.name }}</text>
								<p></p>
								<text>{{ item.levelname }}</text>
							</div>
							<p>点位编号：{{ item.dnumber }}</p>
						</div>
					</li>
					<li>
						<u-loadmore :status="status" :load-text="loadText" @loadmore="btm" v-if="!tip_bol"/>
					</li>
				</ul>
			</scroll-view>
		</div>
		<text class='tip' v-if="tip_bol">{{ tip }}</text>
		<div class="add" @click='goSingle' v-if='isFocus'>添加点位</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				project_id: '',
				list: [], // 点位信息数组
				tip: '请先添加点位',
				tip_bol: true,
				status: 'loadmore',
				page: 0,
				loadText: {
					loadmore: '点击或上拉加载更多',
					loading: '努力加载中',
					nomore: '已经没有更多了'
				},
				shoot: 1 ,// 为1则允许被绑定的项目方上传点位,为0是不允许
				other_id: '' ,// 被绑定的项目方id
				count: 0,
				isFocus: true
			}
		},
		onLoad(option) {
			this.project_id = option.project_id
		},
		onShow() {
			// this.list = []
			this.loadmore(0)
		},
		mounted(){
			uni.onKeyboardHeightChange(res => {
				if(res.height > 0) {
					this.isFocus = false
				} else {
					this.isFocus = true
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goRule() {
				uni.navigateTo({
					url: '../rule/rule?project_id=' + this.project_id
				})
			},
			goPointmsg(file_id) { // 点位信息
				uni.navigateTo({
					url: '../../tree_msg/tree_msg?file_id=' + file_id + '&project_id=' + this.project_id
				})
			},
			btm(){
				if(this.status == 'nomore') { return }
				this.loadmore(this.page)
			},
			loadmore(page) {
				this.status = 'loading';
				page++
				this.$request('/api/file/filelist', { // 点位信息
					project_id: this.project_id,
					page: page,
					limit: 10
				}).then(res => {
					// console.log(res)
					if(res.data.data && res.data.data != '') {
						this.count = res.data.count
						this.tip_bol = false
						this.shoot = res.data.shoot
						this.other_id = res.data.other_id
						switch (page){
							case 1:
								for(var i = 0; i < res.data.data.length; i++) {
									res.data.data[i].url += this.$store.state.imgFix // 在图片后加上参数
								}
								this.list = res.data.data
								break;
							default:
								for(var i = 0; i < res.data.data.length; i++) {
									res.data.data[i].url += this.$store.state.imgFix // 在图片后加上参数
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
			goSingle() { // 添加点位
				if(this.shoot == 1 && this.other_id == this.id) {
					uni.navigateTo({
						url: '../../single/single?project_id=' + this.project_id
					})
				} else if(this.shoot == 0 && this.other_id == this.id) {
					uni.showToast({
						icon: 'none',
						title: '无权限'
					})
				} else {
					uni.navigateTo({
						url: '../../single/single?project_id=' + this.project_id
					})
				}
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
		background-color: #F9F9FB;
	}
	.title{
		width: 100%;
		height: 96rpx;
		background: #5E79F2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		image{
			width: 50rpx;
			height: 50rpx;
			margin-left: 40rpx;
		}
		text{
			font-size: 36rpx;
			font-weight: bold;
			color: white;
			flex-grow: 1;
			text-align: center;
			margin-left: -100rpx;
		}
	}
	.tip{
		position: fixed;
		top: 49%;
		width: 100%;
		text-align: center;
		color: #8c8c8c;
		font-size: 32rpx;
	}
	.main{
		width: 100%;
		height: 90%;
		.search{
			width: 94%;
			height: 76rpx;
			margin: 20rpx auto;
			border-radius: 8rpx;
			background: white;
			border: 1px solid #F0F0F0;
			position: relative;
			image{
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				top: 50%;
				margin-top: -20rpx;
				left: 40rpx;
			}
			input{
				width: 100%;
				height: 100%;
				text-align: center;
				border-radius: 8rpx;
			}
		}
		.all{
			width: 93%;
			height: auto;
			margin: 40rpx auto;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&>div{
				width: auto;
				height: 100%;
				display: flex;
				align-items: center;
			}
			.left{
				image{
					width: 40rpx;
					height: 48rpx;
					margin-right: 8rpx;
				}
			}
			.right{
				image{
					width: 40rpx;
					height: 40rpx;
				}
				text{
					margin-left: 8rpx;
				}
			}
		}
		scroll-view{
			max-height: 74%;
			overflow-y: scroll;
		}
		ul{
			width: 94%;
			// height: 1100rpx;
			// overflow-y: scroll;
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
				font-size: 30rpx;
				image{
					width: 120rpx;
					height: 120rpx;
					margin-left: 20rpx;
					margin-right: 30rpx;
				}
				&>div{
					flex-grow: 1;
					text-align: left;
					&>div{
						display: flex;
						align-items: center;
						.wid{
							width: 66%;
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
							color: #ADAFAD;
							font-weight: bold;
						}
					}
					p{
						margin-top: 10rpx;
					}
				}
				&:nth-last-of-type(1){
					box-shadow: none;
					background: none;
					height: auto;
					margin-bottom: 40rpx;
				}
			}
		}
	}
	.add{
		width: 100%;
		height: 92rpx;
		line-height: 92rpx;
		text-align: center;
		font-size: 36rpx;
		background-color: #5E79F2;
		color: white;
		position: absolute;
		bottom: 0;
		left: 0;
	}
</style>
