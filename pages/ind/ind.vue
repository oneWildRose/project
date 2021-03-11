<template> <!-- 首页 -->
	<view class="hello">
		<!-- <ind>
			<template slot='lb'>
				
			</template>
		</ind> -->
		<div>
			<div class="status" style='background: #6876FF;'></div>
			<div class="head">
				<div class='ztype'>
					<p>{{ isshenfen == 3? '乙方' : '甲方' }}</p>
					<div>
						{{ enterprisename }}
						<text v-if='isshenfen != 2'>，您好</text>
					</div>
				</div>
				<div class="title">欢迎使用境云管理平台 (企业版)</div>
				<view class="lb"> <!-- 轮播 -->
					<swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500" :circular='true'>
						<swiper-item>
							<image :src="require('../../static/02.jpg')" class="swiper-item"></image>
						</swiper-item>
						<swiper-item>
							<image :src="require('../../static/02.jpg')" class="swiper-item"></image>
						</swiper-item>
					</swiper>
				</view>
			</div>
			<div class="nav">
				<div @click='goProject'>
					<div>
						<p>项目管理</p>
						<text>实时掌握项目动态</text>
					</div>
					<image :src="require('../../static/guanli.svg')" mode=""></image>
				</div>
				<div @click='goSpecialistku'>
					<div>
						<p>专家智库</p>
						<text>找专家做方案</text>
					</div>
					<image :src="require('../../static/specialistku.svg')" mode=""></image>
				</div>
			</div>
			<div class="rank">
				<div class='tit'>
					<p>权威专家推荐</p>
					<div @click='goSpecialistku'>
						<text>查看全部</text>
						<image :src="require('../../static/jinru.svg')" mode=""></image>
					</div>
				</div>
				<!-- <ul> -->
				<scroll-view class='ul' scroll-y="true" :lower-threshold='50' @scrolltolower='btm'>
					<li v-for="(item, index) in list" :key='index' @click='goSpecialistmsg(item.id)'>
						<image :src="require('../../static/rank.svg')" mode=""></image>
						<image :src="item.file" mode=""></image>
						<text>{{ item.name == null? '昵称' : item.name }}</text>
						<text>客户满意度{{ item.percentage? item.percentage : '100%' }}</text>
					</li>
					<li class='tip'>
						<u-loadmore :status="status" :load-text="loadText" @loadmore="btm"/>
					</li>
				</scroll-view>
				<!-- </ul> -->
			</div>
		</div>
		<u-tabbar v-model="current" :list="tabbar_list" active-color='#5E79F2'></u-tabbar>
	</view>
</template>

<script>
	// import ind from '../../module/ind/ind'
	export default {
		components:{
			// ind
		},
		data() {
			return {
				src: '../../static/touxiang.svg',// 默认头像
				current: 0,
				tabbar_list: [
					{
						iconPath: "../../static/shouye(2).png",
						selectedIconPath: "../../static/shouye.png",
						text: '首页',
						isDot: true,
						customIcon: false,
						pagePath: '/pages/ind/ind',
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
				list: [],
				page: 1,
				isshenfen: '',
				enterprisename: '',
				uid: this.$store.state.uid,
				status: 'loadmore',
				page: 0,
				loadText: {
					loadmore: '点击或上拉加载更多',
					loading: '努力加载中',
					nomore: '已经没有更多了'
				},
			}
		},
		onLoad() {
			var that = this
			uni.getStorage({
				key: 'userinfo',
				success(res) {
					// console.log(res)
					if(res.data.uid) {
						that.uid = res.data.uid
					} else if(res.data.id) {
						that.uid = res.data.id
					} else if(res.data.data.id) {
						that.uid = res.data.data.id
					}
					that.$request('/api/index/infoIndex', {
						uid: that.uid
					}).then(res => {
						// console.log(res)
						that.isshenfen = res.data.data.isshenfen
						that.enterprisename = res.data.data.enterprisename
					})
				}
			})
		},
		onShow() {
			// this.list = []
			this.loadmore(0)
		},
		methods: {
			goProject() { // 项目管理
				uni.navigateTo({
					url: '../project/project'
				})
			},
			goSpecialistku() { // 专家智库
				uni.navigateTo({
					url: '../specialistku/specialistku'
				})
			},
			goSpecialistmsg(id) { // 专家信息
				uni.navigateTo({
					url: '../specialistku/specialistMsg/specialistMsg?id=' + id
				})
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
							case 1: //防止页面onshow时出现列表闪一下的情况（网很慢的情况下可能还会闪一下）
								for(var i = 0; i < res.data.data.length; i++) {
									if(res.data.data[i].file == null) { //如果该用户没有设置头像，采用默认的
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
						}
						this.page = page
						this.status = res.data.data.length < 10? 'nomore' : 'loadmore'
					} else {
						this.status = 'nomore'
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		background: #FBFBFD;
		&>div{
			width: 100%;
			height: 100%;
		}
	}
	.head{
		width: 100%;
		height: 280rpx;
		background: #6876FF url(../../static/pt.svg) no-repeat 90%;
		background-size: 232rpx 180rpx;
		position: relative;
		.ztype{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			display: flex;
			align-items: center;
			color: white;
			p{
				width: 60rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				background: #4EB7DF;
				border-radius: 50%;
				margin-left: 50rpx;
				margin-right: 20rpx;
			}
			div{
				font-size: 30rpx;
			}
		}
		.title{
			width: 100%;
			height: 80rpx;
			text-align: center;
			color: white;
			font-size: 38rpx;
			font-weight: bold;
		}
		.lb{
			width: 96%;
			margin: 0rpx auto;
			height: 200rpx;
			border-radius: 20rpx;
			swiper{
				width: 100%;
				height: 100%;
				image{
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}
			}
		}
	}
	.nav{
		width: 94%;
		height: 136rpx;
		margin: 120rpx auto;
		margin-bottom: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		&>div{
			width: 340rpx;
			height: 100%;
			background-color: white;
			border-radius: 10rpx;
			box-shadow: #afafaf 0 0 6rpx 0;
			display: flex;
			justify-content: space-around;
			align-items: center;
			p{
				font-size: 32rpx;
				margin-bottom: 3rpx;
				font-weight: bold;
			}
			text{
				font-size: 26rpx;
				color: #848280;
			}
			image{
				width: 70rpx;
				height: 70rpx;
			}
		}
	}
	.rank{
		width: 94%;
		// height: 748rpx;
		height: 46%;
		margin: 0 auto;
		background: white;
		border-radius: 10rpx;
		box-shadow: #afafaf 0 0 6rpx 0;
		.tit{
			width: 94%;
			height: 100rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #E1E1E1;
			p{
				font-size: 34rpx;
			}
			div{
				display: flex;
				align-items: center;
				text{
					font-size: 28rpx;
					color: #9C9D9C;
				}
				image{
					width: 30rpx;
					height: 30rpx;
					margin-top: 2rpx;
					margin-right: 4rpx;
				}
			}
		}
		.ul{
			width: 94%;
			max-height: 80%;
			// border: 1px solid red;
			padding-bottom: 4rpx;
			overflow-y: scroll;
			margin: 0 auto;
			li{
				width: 100%;
				height: 124rpx;
				border-bottom: 1px solid #E1E1E1;
				display: flex;
				justify-content: space-between;
				align-items: center;
				image{
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					&:nth-of-type(1){
						width: 60rpx;
						height: 60rpx;
						margin-left: 10rpx;
					}
				}
				text{
					&:nth-of-type(1){
						display: inline-block;
						width: 100rpx;
						height: 40rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					&:nth-of-type(2){
						margin-right: 10rpx;
					}
				}
				&.tip{
					border: none;
					display: block;
					height: 60rpx;
					p{
						width: 200rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						margin: 20rpx auto;
						border: 1px solid #E1E1E1;
					}
				}
			}
		}
	}
</style>
