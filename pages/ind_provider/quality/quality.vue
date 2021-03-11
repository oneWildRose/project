<template>  <!-- 品质监控 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>品质监控</text>
			<!-- <image :src="require('../../../static/search_white.svg')" mode=""></image> -->
			<image src="" mode=""></image>
		</div>
		<div class="today">
			<p>当日汇总</p>
			<div class='progress'>
				<div>
					<p>{{ yipai }}</p>
					<text>已拍照</text>
				</div>
				<div>
					<p>{{ weipai }}</p>
					<text>未拍照</text>
				</div>
			</div>
		</div>
		<gpp-date-picker class='timechoose' @onCancel="onCancel" @onConfirm="onConfirm" :startDate="'1990-01-01'" :endDate="'2100-01-01'" :defaultValue="time">
			<image :src="require('../../../static/9-17icon/intime.svg')" mode=""></image>
			<div class='time'>{{ time }}</div>
		</gpp-date-picker>
		<scroll-view scroll-y lower-threshold='50' @scrolltolower='btm'>
		<!-- <ul> -->
			<li v-for="(item, index) in list" :key='index' @click='goPhotomsg(item.file_id, item.ispaizhao, item.lnspection_id)'>
				<image :src="item.plan_url" mode="" lazy-load></image>
				<div>
					<div>
						<text :class="item.name.length > 8? 'wid' : '' ">{{ item.name }}</text>
						<p></p>
						<text>{{ item.levelname }}</text>
					</div>
					<p>点位编号：{{ item.dnumber }}</p>
				</div>
				<view id='sta'>
					<p :class="item.isshenhe == 0? 'red' : 'blue' ">
						{{ item.isshenhe == 0? '未审核' : '已审核' }}
					</p>
					<p :class="item.iscl == 0? 'red' : 'blue' ">
						{{ item.iscl == 0? '未拍照' : '已拍照' }}
					</p>
				</view>
			</li>
			<li>
				<u-loadmore :status="status" :load-text="loadText" @loadmore="btm"/>
			</li>
		<!-- </ul> -->

		</scroll-view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import gppDatePicker from "@/components/gpp-datePicker/gpp-datePicker.vue"
	export default {
		components: {
			gppDatePicker
		},
		data() {
			return {
				uid: this.$store.state.uid,
				num: 0,
				yipai: 0,
				weipai: 0,
				time: new Date().Format("yyyy-MM-dd"),
				project_id: '',
				list: [],
				code: [], // 点位编码数组
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
			// console.log(this.project_id)
			// var that = this
			// uni.getStorage({
			// 	key: 'userinfo',
			// 	success(res) {
			// 		// console.log(res)
			// 		if(res.data.uid) {
			// 			that.uid = res.data.uid
			// 		} else if(res.data.data.user_id) {
			// 			that.uid = res.data.data.user_id
			// 		}
			// 	}
			// })
		},
		onShow() {
			// this.list = []
			this.loadmore(0)
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			onCancel(e){
				console.log(e);
			},
			onConfirm(e){
				this.time = e.dateValue;
				// this.list = []
				this.loadmore(0, true)
			},
			btm() {
				if(this.status == 'nomore') { return }
				this.loadmore(this.page)
			},
			loadmore(page, isTime) {
				this.status = 'loading'
				page++
				this.$request('/api/lnspection/quality', { // 点位列表(品质监控)
					date: this.time,
					project_id: this.project_id,
					page: page,
					limit: 10
				}).then(res => {
					console.log(res)
					if(res.data.data && res.data.data != '') {
						this.yipai = res.data.dataone.yipai
						this.weipai = res.data.dataone.weipai
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
					} else if(isTime == true) {
						this.list = []
						this.yipai = 0
						this.weipai = 0
						this.status = 'nomore'　
					} else {
						this.status = 'nomore'
					}
				})
			},
			goPhotomsg(file_id, ispaizhao, lnspection_id) {
				if(ispaizhao == 0) {
					this.$refs.uToast.show({
						title: '工作人员未拍照',
						duration: 1200,
						position: 'bottom'
					})
				} else {
					uni.navigateTo({
						url: '../photoMsg/photoMsg?project_id=' + this.project_id + '&file_id=' + file_id + '&lnspection_id=' + lnspection_id + '&time=' + this.time + '&direction=' + 'pz'
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
	.today{
		width: 94%;
		margin: 20rpx auto;
		height: 208rpx;
		box-shadow: #bcbcbc 0 0 6rpx 0;
		border-radius: 10rpx;
		background-color: white;
		&>p{
			width: 94%;
			margin: 0 auto;
			height: 76rpx;
			line-height: 76rpx;
			border-bottom: 1px solid #F0F0F0;
			font-size: 34rpx;
		}
		.progress{
			width: 100%;
			height: 128rpx;
			display: flex;
			align-items: center;
			&>div{
				width: 50%;
				height: 100%;
				text-align: center;
				p{
					font-size: 36rpx;
					font-weight: bold;
					margin-top: 20rpx;
				}
			}
		}
	}
	.timechoose{
		width: 94%;
		height: 80rpx;
		margin: 20rpx auto;
		border: 1px solid #E8E8E8;
		border-radius: 10rpx;
		background-color: white;
		position: relative;
		image{
			width: 30rpx;
			height: 30rpx;
			position: absolute;
			left: 38%;
			top: 50%;
			margin-top: -17rpx;
		}
		.time{
			position: absolute;
			left: 44%;
			top: 20%;
		}
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
			#sta{
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
