<template> <!-- 个人中心 -->
	<view class="hello">
		<div>
			<div class='head'>
				<div @click='goInformation'>
					<div class="head_image">
						<image :src="msg.file == null || msg.file == ''? src : msg.file" mode=""></image>
					</div>
					<div class='message'>
						<p>
							<text :class="overflow? 'wid' : '' ">{{ msg.name == null? '昵称':msg.name }}</text>
							<text class='noShow' v-if='isshenfen == 5 && msg.isAnonymity == 1'>已匿名</text>	<!-- isshenfen == 5 专家端显示 -->
						</p>
						<p>{{ mobile }}</p>
					</div>
				</div>
				<div class="order" v-if='isshenfen == 5'>	<!-- isshenfen == 5 专家端显示 -->
					<div @click='goOrder(0)'>
						<text>{{ order }}</text>
						<p>全部</p>
					</div>
					<div @click='goOrder(1)'>
						<text>{{ confirmed }}</text>
						<p>待确认</p>
					</div>
					<div style='color: #5D6CFF;' @click='goOrder(2)'>
						<text>{{ underway }}</text>
						<p>进行中</p>
					</div>
					<div style='color: black;' @click='goOrder(3)'>
						<text>{{ finished }}</text>
						<p style='color: #888A88;'>完成订单</p>
					</div>
				</div>
			</div>
			<div class='main'>
				<div class="specialist" v-if='isshenfen == 5'>
					<!-- <div @click='goDealShow'>
						<p>我的案例展示</p>
						<div>
							<text>查看全部</text>
							<image :src="require('../../static/jinru.svg')"></image>
						</div>
					</div> -->
				</div>
				<div class='jia' style='height: 0;' v-if='isshenfen == 1 || isshenfen == 3'>  <!-- isshenfen == 1 or 3 甲乙双方顶级负责人显示 -->
					<div class="tit">
						<text>我的需求</text>
						<div @click='goMyneed(0)'>
							<text>查看全部</text>
							<image :src="require('../../static/jinru.svg')" mode=""></image>
						</div>
					</div>
					<div class='need_status'>
						<div @click='goMyneed(1)'>
							<image :src="require('../../static/xuqiued.svg')" ></image>
							<text>已发布</text>
						</div>
						<div @click='goMyneed(2)'>
							<image :src="require('../../static/xuqiuing.svg')" ></image>
							<text>进行中</text>
						</div>
						<div @click='goMyneed(3)'>
							<image :src="require('../../static/xuqiucancel.svg')" ></image>
							<text>已取消</text>
						</div>
						<div @click='goMyneed(4)'>
							<image :src="require('../../static/xuqiuend.svg')" ></image>
							<text>已完成</text>
						</div>
					</div>
				</div>
				<ul>
					<li @click='goFeedBack'>
						<image :src="require('../../static/yijianfankui.svg')"></image>
						<text>意见反馈</text>
						<image :src="require('../../static/jinru.svg')"></image>
					</li>
					<li @click="goQuestion">
						<image :src="require('../../static/wenti.svg')"></image>
						<text>常见问题</text>
						<image :src="require('../../static/jinru.svg')"></image>
					</li>
					<li @click='goAbout'>
						<image :src="require('../../static/guanyuwomen.svg')"></image>
						<text>关于我们</text>
						<image :src="require('../../static/jinru.svg')"></image>
					</li>
				</ul>
				<div class='enterprise' v-if='isshenfen == 1 || isshenfen == 3' @click='goInformation'>
					<image :src="require('../../static/company.svg')" mode="" style="width: 46rpx;height: 46rpx;"></image>
					<text>企业信息</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</div>
				<div class='enterprise' v-if='isshenfen == 5' @click='goLvli'>
					<image :src="require('../../static/lvli.svg')" mode=""></image>
					<text>专家履历</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</div>
				<div class='enterprise' v-if='isshenfen == 2 || isshenfen == 4' @click='goInformation'>
					<image :src="require('../../static/geren.svg')" mode=""></image>
					<text>个人信息</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</div>
			</div>
			<button type="default" @click="exit">退出登录</button>
		</div>
		<u-modal v-model="show" :content="content" :show-cancel-button='true' @confirm='confirm' @cancel="cancel" confirm-color='red'></u-modal>
		<u-tabbar v-model="current" :list="list" active-color='#5E79F2'></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				content: '确定退出登录？',
				isClick: true,
				src: '../../static/touxiang.svg',// 默认头像
				id: '',
				msg: '',
				order: 1, // 全部订单（专家）
				confirmed: 0, // 待确认的订单数
				underway: 0, // 进行中的...
				finished: 0, // 已完成的...
				mobile: '',
				isshenfen: '',
				overflow: false,
				list: [], // 底部导航内容容器
				list_top: [ // 最高权限底部导航
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
				list_mid: [ // 项目主管底部导航
					{
						iconPath: "../../static/shouye(2).png",
						selectedIconPath: "../../static/shouye.png",
						text: '首页',
						isDot: true,
						customIcon: false,
						pagePath: '/pages/ind_provider/provider/provider',
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
				list_btm: [ // 专家底部导航
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
				current: 0 // 当前tabbar激活项的索引
			}
		},
		onLoad() {
			var that = this
			uni.getStorage({ // 从缓存中拿到用户的id
				key: 'userinfo',
				success: (res) => {
					// console.log(res)
					if(res.data.id) {
						that.id = res.data.id
					} else if(res.data.uid) {
						that.id = res.data.uid
					} else if(res.data.data.id) {
						that.id = res.data.data.id
					}
					that.$request('/api/index/infoIndex', {
						uid: that.id
					}).then(res => {
						// console.log(res)
						that.msg = res.data.data
						that.mobile = that.msg.mobile.substring(0, 3) + '****' + that.msg.mobile.substring(that.msg.mobile.length - 4)
						if(that.msg.name && that.msg.name.length >= 10) {
							that.overflow = true
						}
						that.isshenfen = that.msg.isshenfen
						if(that.isshenfen == 1 || that.isshenfen == 3 || that.isshenfen == 2) { // 甲乙最高权限负责人,甲项目主管
							that.list = that.list_top
						} else if(that.isshenfen == 4){ // 乙项目主管
							that.list = that.list_mid
						} else if(that.isshenfen == 5) { // 专家
							that.list = that.list_btm
						}
					})
				}
			})
		},
		onShow() {
			this.$request('/api/index/infoIndex', {
				uid: this.id
			}).then(res => {
				this.msg = res.data.data
			})
			// this.$request('/api/project/project_list_z', {
			// 	uid: this.id
			// }).then(res => {
				// console.log(res)
				// if(i == 0) { this.confirmed = res.data.data.length }
				// if(i == 1) { this.underway = res.data.data.length }
				// if(i == 2) { this.finished = res.data.data.length }
				// if(i == 3) { this.order = res.data.data.length }
			// })
		},
		methods: {
			goDealShow() { // 案例展示
				uni.navigateTo({
					url: './deal_show/deal_show?id=' + this.id
				})
			},
			goOrder(index) { // 订单
				let ind = index
				if(index == 0) {index = 3} else// 全部
				if(index == 1) {index = 0} else// 待确认
				if(index == 2) {index = 1} else// 进行中
				if(index == 3) {index = 2} // 已完成
				this.$store.commit('orderStateChange', index)
				uni.navigateTo({
					url: '../ind_specialist/order_specialist/order_specialist?ind=' + ind
				})
			},
			goMyneed(index) { // 我的需求
				uni.navigateTo({
					url: '../myneed/myneed?index=' + index
				})
			},
			goFeedBack() { // 意见反馈
				uni.navigateTo({
					url: '../feedback/feedback?id=' + this.id
				})
			},
			goQuestion() { // 常见问题
				uni.navigateTo({
					url: '../question/question'
				})
			},
			goAbout() { // 关于我们
				uni.navigateTo({
					url: '../about/about'
				})
			},
			goInformation() { // 个人信息
				uni.navigateTo({
					url: '../information/information?id=' + this.id
				})
			},
			goLvli() { // 专家履历
				uni.navigateTo({
					url: 'lvli/lvli?uid=' + this.id
				})
			},
			exit() { // 退出登录
				if(this.isClick == false) {return} // 防止暴力点击
				this.isClick = false
				this.show = true // 显示弹窗
			},
			confirm() { // 弹窗，确定按钮事件
				uni.removeStorage({
					key: 'userinfo'
				})
				uni.reLaunch({
					url: '../sign/sign'
				})
			},
			cancel() { // 弹窗，取消按钮事件
				this.isClick = true
			}
		}
	}
</script>

<style lang="less" scoped>
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
			width: 100%;
			height: 100%;
		}
		.head{
			width: 100%;
			height: 352rpx;
			background: url(../../static/per_brg.jpg) no-repeat;
			background-size: 100%;
			display: flex;
			align-items: center;
			position: relative;
			&>div{
				width: 100%;
				height: 180rpx;
				display: flex;
				align-items: flex-end;
				justify-content: space-around;
				.head_image{
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					margin-left: 40rpx;
					margin-right: 40rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.message{
					flex-grow: 1;
					height: 110rpx;
					color: white;
					p{
						font-size: 34rpx;
						display: flex;
						align-items: center;
						.wid{
							width: 300rpx;
						}
						text{
							margin-right: 20rpx;
							&:nth-of-type(1){
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
						}
						.noShow{
							font-size: 28rpx;
							color: #F9A47A;
						}
					}
					p:nth-of-type(2){
						margin-top: 10rpx;
						font-size: 30rpx;
					}
				}				
			}
			.order{
				width: 96%;
				position: absolute;
				left: 16rpx;
				bottom: -86rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				div{
					width: 160rpx;
					height: 136rpx;
					background-color: white;
					border-radius: 8rpx;
					box-shadow: #c5c6c8 0rpx 0rpx 10rpx 0rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					color: #F9A400;
					text{
						display: inline-block;
						font-size: 40rpx;
						margin-top: 14rpx;
					}
				}
			}
		}
		.main{
			width: 100%;
			// height: auto;
			height: 60%;
			.specialist{
				width: 96%;
				margin: 90rpx auto;
				margin-bottom: 20rpx;
				height: auto;	
				&>div{
					width: 100%;
					height: 100rpx;
					background: white;
					margin-bottom: 20rpx;
					border-radius: 10rpx;
					box-shadow: #c5c6c8 0rpx 0rpx 4rpx 0rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					&:nth-last-of-type(1){
						margin-bottom: 0;
					}
					p{
						margin-left: 40rpx;
					}
					div{
						margin-right: 20rpx;
						display: flex;
						font-size: 26rpx;
						color: #9C9D9C;
						image{
							width: 30rpx;
							height: 30rpx;
							margin-top: 4rpx;
						}
					}
				}
			}
			.jia{
				width: 96%;
				margin: 40rpx auto;
				margin-bottom: 0;
				// height: 240rpx;
				height: 24%;
				background: white;
				display: flex;
				flex-direction: column;
				border-radius: 10rpx;
				box-shadow: #c5c6c8 0rpx 0rpx 4rpx 0rpx;
				.tit{
					width: 100%;
					height: 88rpx;
					border-bottom: 1px solid #F2F2F2;
					display: flex;
					justify-content: space-between;
					align-items: center;
					&>text{
						text-indent: 40rpx;
						font-size: 34rpx;
					}
					&>div{
						display: flex;
						align-items: center;
						font-size: 28rpx;
						color: #9E9B9B;
						image{
							width: 30rpx;
							height: 30rpx;
							margin-right: 20rpx;
						}
					}
				}
				.need_status{
					width: 100%;
					height: 142rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					&>div{
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 30rpx;
						image{
							// width: 60rpx;
							// height: 60rpx;
							width: 25%;
							height: 50%;
							margin-top: 10rpx;
						}
					}
				}
			}
			ul{
				width: 96%;
				// height: 344rpx;
				height: 36%;
				margin: 20rpx auto;
				background-color: white;
				border-radius: 10rpx;
				box-shadow: #c5c6c8 0rpx 0rpx 4rpx 0rpx;
				li{
					width: 100%;
					// height: 114.5rpx;
					height: 32%;
					// line-height: 80rpx;
					background-color: white;
					border-radius: 10rpx;
					display: flex;
					align-items: center;
					font-size: 34rpx;
					position: relative;
					image{
						width: 40rpx;
						height: 40rpx;
						margin-right: 30rpx;
						margin-left: 40rpx;
						&:nth-of-type(2) {
							position: absolute;
							right: 0;
						}
					}
				}
			}
			.enterprise{
				width: 96%;
				height: 100rpx;
				margin: 0 auto;
				background-color: white;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				font-size: 34rpx;
				position: relative;
				box-shadow: #c5c6c8 0rpx 0rpx 4rpx 0rpx;
				image{
					width: 40rpx;
					height: 40rpx;
					margin-right: 30rpx;
					margin-left: 40rpx;
					&:nth-of-type(2) {
						position: absolute;
						right: 0;
					}
				}
			}
		}
		button{
			width: 90%;
			height: 90rpx;
			line-height: 90rpx;
			background: #3F5DE3;
			color: white;
			position: fixed;
			bottom: 120rpx;
			left: 5%;
		}
	}
</style>
