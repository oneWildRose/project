<template>	<!-- 任务详情 -->
	<view class="hello">
		<div class="status"></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>任务详情</text>
		</div>
		<div class="need">
			<div class='needMsg'>
				<p class='tit'>需求信息</p>
				<p class='title'>项目绿化方案</p>
				<p class='cont'>需求描述：{{ msg.project_arr? msg.project_arr.cliam : '' }}</p>
				<p class='pic'>点位照片</p>
				<div>
					<image :src="item.url + imghouz" v-for="(item,index) in msg.file_list" mode="" @click="preview(item.url)"></image>
				</div>
			</div>
			<div class='projectMsg'>
				<p class='tit'>项目信息</p>
				<ul>
					<li>
						<image :src="require('../../../static/9-17icon/project.svg')"></image>
						<p>项目名称：{{ msg.project_arr? msg.project_arr.pname : '' }}</p>
					</li>
					<li>
						<image :src="require('../../../static/9-17icon/ress.svg')"></image>
						<div>
							<text>项目地址：</text>
							<text>{{ msg.project_arr? msg.project_arr.zaddress : '' }}</text>
						</div>
					</li>
					<li>
						<image :src="require('../../../static/9-17icon/mianji.svg')"></image>
						<p>项目管理面积：{{ msg.project_arr? msg.project_arr.measure + msg.project_arr.companyname : '' }}</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="plan" v-if='!isjiedan'>
			<div @click='goPlanMsg(item.schemen_id)' v-for="(item,index) in msg.scheme_list" :key='index'>
				<image :src="item.plan_url + imghouz" mode=""></image>
				<div>
					<div>
						<text>{{ item.name }}</text>
						<p></p>
						<text>{{ item.level == 1? '一级点位': item.level == 2? '二级点位' : '三级点位' }}</text>
					</div>
					<p>点位编号：{{ item.dnumber }}</p>
				</div>
				<p>查看</p>
			</div>
		</div>
		<div class='load' v-if='false'>
			<div class="loading"> <!-- 进度 -->
				<text>完成进度</text>
				<div>
					<progress
						:percent="progress" 
						show-info
						stroke-width=16
						activeColor='#F9A400'
						backgroundColor='white'
						active='true'
						active-mode='forwards'
						/>
				</div>
			</div>
			<div class='module'>
				<div style='color: #5E79F2' @click='goCheck(0)'>已验收方案</div>
				<div style='color: #5E79F2'>未验收方案</div>
				<div style='color: #F9A400' @click='goCheck(1)'>已反馈方案</div>
			</div>
		</div>
		<div class="btm" v-if='isjiedan'>
			<div class='gocom'>
				<image src="../../../static/goChat.svg" mode=""></image>
				<text>去沟通</text>
			</div>
			<!-- <div class='wait' v-if='!isjiedan'>
				<text>等待需求方确认</text>
			</div> -->
			<div class='choose' v-if='false'>
				<div>
					<image :src="require('../../../static/cuowu_white.svg')" mode=""></image>
					<text>拒绝</text>
				</div>
				<div>
					<image :src="require('../../../static/duigou.svg')" mode=""></image>
					<text>确认</text>
				</div>
			</div>
			<div class='jiedan' :class="msgJie == 0? '' : 'gray'" v-if='isjiedan' @click='showModal(msg.project_arr.isjiedan)'>
				<image src="../../../static/duigou.svg" v-if="msgJie == 0? true : false" mode=""></image>
				<!-- <text>接单</text> -->
				<text>{{ msgJie == 0? '接单' : '已接单' }}</text>
			</div>
		</div>
		<u-modal v-model="show" :show-cancel-button="true" :content="content" @confirm="jiedan"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: this.$store.state.uid,
				imghouz: this.$store.state.imgFix,
				state: '',// 订单状态， 0待确认，1进行中，2已完成，3全部
				progress: 19, // 进度
				project_id: '',
				msg: '',
				show: false,
				content: '确定接单吗？',
				isjiedan: true,
				msgJie: 0,
				proexpert_id: ''
			}
		},
		onLoad(option) {
			this.project_id = option.project_id
			this.proexpert_id = option.proexpert_id
			if(option.dir) { this.isjiedan = false }
			let that = this
			uni.getStorage({
				key: 'userinfo',
				success(res) {
					if(res.data.uid) { // 登录出现弹框： 选择身份，完善企业信息，完善个人信息 进入
						that.uid = res.data.uid
					} else if(res.data.id) { // 注册成功，请选择身份进入
						that.uid = res.data.id
					} else if(res.data.data.id) { // 登录进入
						that.uid = res.data.data.id
					}
				}
			})
		},
		onShow() {
			this.$request('/api/Highseasapi/orderdetail', {
				uid: this.uid,
				project_id: this.project_id,
				proexpert_id: this.proexpert_id
			}).then(res => {
				// console.log(res)
				this.msg = res.data.data
				this.msgJie = this.msg.project_arr.isjiedan
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			preview(url) {
				uni.previewImage({
					urls: [ url ]
				})
			},
			goCheck(num) {
				uni.navigateTo({
					url: '../check/check?num=' + num
				})
			},
			goPlanMsg(schemen_id) {
				uni.navigateTo({
					url: '../planMsg/planMsg?schemen_id=' + schemen_id
				})
			},
			jiedan() {
				this.$request('/api/Highseasapi/pickuporder', {
					uid: this.uid,
					project_id: this.project_id
				}).then(res => {
					if(res.data.code == 1) {
						// this.isjiedan = false
						var that = this
						uni.showModal({
							content: '接单成功，请到个人中心去查看订单列表',
							showCancel: false,
							success(res) {
								if(res.confirm) {
									that.goBack()
								}
							}
						})
					}
				})
			},
			showModal(isjiedan) {
				if(isjiedan == 0) {
					this.show = true;
				} else {
					// uni.navigateTo({
					// 	url: '../order_specialist/order_specialist?ind=0'
					// })
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
		background: #F5F6F9;
	}
	.head{
		width: 100%;
		height: 116rpx;
		background: #5E79F2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			width: 50rpx;
			height: 50rpx;
			margin-left: 40rpx;
		}
		text{
			flex-grow: 1;
			text-align: center;
			margin-left: -100rpx;
			font-size: 36rpx;
			color: white;
			font-weight: bold;
		}
	}
	.need{
		width: 94%;
		height: auto;
		margin: 20rpx auto;
		.needMsg{
			width: 100%;
			height: auto;
			background: white;
			border-radius: 8rpx;
			padding-bottom: 20rpx;
			.tit{
				width: 94%;
				height: 80rpx;
				line-height: 80rpx;
				border-bottom: 1px solid #E1E1E1;
				font-size: 30rpx;
				margin: 0 auto;
			}
			.title{
				width: 94%;
				height: 80rpx;
				line-height: 80rpx;
				margin: 0 auto;
			}
			.cont{
				width: 94%;
				height: auto;
				word-break: break-all;
				margin-bottom: 20rpx;
				font-size: 28rpx;
				margin: 0 auto;
			}
			.pic{
				width: 94%;
				font-size: 28rpx;
				height: 50rpx;
				line-height: 50rpx;
				margin: 0 auto;
			}
			&>div{
				width: 94%;
				margin: 0 auto;
				height: auto;
				&::after{
					content: "";
					clear: both;
					height: 0;
					visibility: hidden;
					display: block;
				}
				image{
					width: 156rpx;
					height: 148rpx;
					float: left;
					margin-right: 10rpx;
				}
			}
		}
		.projectMsg{
			width: 100%;
			height: auto;
			margin-top: 20rpx;
			background: white;
			border-radius: 8rpx;
			.tit{
				width: 94%;
				height: 80rpx;
				line-height: 80rpx;
				margin: 0 auto;
				border-bottom: 1px solid #E1E1E1;
				font-size: 30rpx;
			}
			ul{
				width: 94%;
				height: auto;
				margin: 20rpx auto;
				li{
					width: 100%;
					min-height: 56rpx;
					display: flex;
					image{
						width: 36rpx;
						height: 36rpx;
						margin-right: 10rpx;
						margin-top: 10rpx;
					}
					p{
						font-size: 30rpx;
					}
					div{
						display: flex;
						text{ font-size: 30rpx; }
						text:nth-of-type(1){
							width: 170rpx;
						}
						text:nth-of-type(2){
							width: 86%;
						}
					}
				}
			}
		}
	}
	.plan{
		width: 94%;
		height: 38%;
		overflow-y: scroll;
		margin: 0 auto;
		&>div{
			width: 100%;
			height: 140rpx;
			box-sizing: border-box;
			box-shadow: #c5c6c8 0rpx 0rpx 10rpx 0rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			border-radius: 8rpx;
			background-color: white;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&>image{
				width: 100rpx;
				height: 100rpx;
				margin-right: 20rpx;
			}
			&>p{
				width: 10%;
				color: #5E79F2;
			}
			&>div{
				width: 70%;
				&>div{
					display: flex;
					align-items: center;
					text:nth-of-type(1){
						max-width: 68%;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					p{
						width: 2rpx;
						height: 20rpx;
						margin-left: 10rpx;
						margin-right: 10rpx;
						background-color: #C0C0C0;
					}
				}
			}
		}
	}
	.load{
		width: 94%;
		margin: 0 auto;
		.loading{
			width: 100%;
			height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			&>div{
				width: 560rpx;
				progress{
					width: 100%;
				}
			}
		}
		.module{
			width: 100%;
			height: auto;
			margin-top: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			&>div{
				width: 224rpx;
				height: 136rpx;
				line-height: 136rpx;
				background: white;
				border-radius: 8rpx;
				box-shadow: #c8c8c8 0 0 4rpx 0;
				text-align: center;
			}
		}
	}
	.btm{
		width: 100%;
		height: 120rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		font-size: 30rpx;
		display: flex;
		.gocom{
			width: 30%;
			height: 100%;
			background: white;
			display: flex;
			justify-content: space-around;
			align-items: center;
			image{
				width: 40rpx;
				height: 40rpx;
				margin-left: 42rpx;
			}
			text{
				color: #FFAC27;
				margin-right: 42rpx;
			}
		}
		.wait{
			width: 70%;
			height: 100%;
			line-height: 120rpx;
			text-align: center;
			background: #B3B3B3;
			color: white;
		}
		.choose{
			width: 70%;
			height: 100%;
			line-height: 120rpx;
			text-align: center;
			display: flex;
			color: white;
			&>div{
				width: 50%;
				height: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				image{
					width: 40rpx;
					height: 40rpx;
					margin-left: 74rpx;
					margin-top: 4rpx;
				}
				text{
					font-size: 30rpx;
					margin-right: 74rpx;
				}
				&:nth-of-type(1){
					background: #939393;
				}
				&:nth-of-type(2){
					background: #5E79F2;
				}
			}
		}
		.jiedan{
			width: 70%;
			height: 100%;
			line-height: 120rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: white;
			background-color: #5E79F2;
			image{
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
				margin-top: 4rpx;
			}
		}
	}
	.gray{
		background-color: #898989 !important;
	}
</style>
