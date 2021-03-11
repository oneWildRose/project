<template>   <!-- 全部照片 -->
	<view>
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>全部照片</text>
		</div>
		<p>点位名称: {{ msg.name }}</p>
		<gpp-date-picker class='timechoose' @onCancel="onCancel" @onConfirm="onConfirm" :startDate="'1990-01-01'" :endDate="getTime(100)" :defaultValue="getTime(0)">
			<image :src="require('../../../static/9-17icon/intime.svg')" mode=""></image>
			<div class='time'>{{ time }}</div>
		</gpp-date-picker>
		<div class="pic">
			<scroll-view scroll-y="true" :lower-threshold='50' @scrolltolower='btm'>
				<div class='ul' v-for="(item, index) in list" :key='index' @click='goPhotomsg(item.id)'>
					<image :src="item.imgurl" mode=""></image>
					<text>{{ item.update_time }}</text>
				</div>
				<div class='ul'>
					<u-loadmore :status="status" :load-text="loadText" @loadmore="btm"/>
				</div>
			</scroll-view>
		</div>
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
				msg: '',
				time: '选择日期',
				list: [],
				file_id: '',
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
			this.file_id = option.file_id
			this.$request('/api/file/fileinfo', { // 点位信息
				file_id: this.file_id
			}).then(res => {
				// console.log(res)
				this.msg = res.data.data
			})
			// console.log(this.file_id)
			
		},
		onShow() {
			// this.list = []
			this.loadmore(0)
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goPhotomsg(id) {
				uni.navigateTo({
					url: '../../ind_provider/photoMsg/photoMsg?direction=' + 'all' + '&id=' + id
				})
			},
			onCancel(e){
				console.log(e);
			},
			onConfirm(e){
				this.time = e.dateValue;
				this.list = []
				this.loadmore(0,this.time)
			},
			btm() {
				if(this.status == 'nomore') { return }
				this.loadmore(this.page)
			},
			loadmore(page, date = '') {
				this.status = 'loading'
				page++
				this.$request('/api/lnspection/getPictureAll', { // 全部照片
					file_id: this.file_id,
					date: date,
					page: page,
					limit: 15
				}).then(res => {
					// console.log(res.data.data)
					if(res.data.data && res.data.data != '') {
						switch(page) {
							case 1:
								for(var i = 0; i < res.data.data.length; i++) {
									res.data.data[i].imgurl += this.$store.state.imgFix // 在图片后加上参数
								}
								this.list = res.data.data
								break;
							default:
								for(var i = 0; i < res.data.data.length; i++) {
									res.data.data[i].imgurl += this.$store.state.imgFix // 在图片后加上参数
									this.list.push(res.data.data[i])
								}
						}
						this.page = page
						this.status = res.data.data.length < 15? 'nomore' : 'loadmore'
					} else {
						this.status = 'nomore'
					}
				})
			},
			getTime(addyear) {
				var data = new Date() // 日期对象
				var year = data.getFullYear() + addyear// 年份
				var month = data.getMonth() + 1 // 月份
				var day = data.getDate() // 当天
				return year + '-' + month + '-' + day // 拼接格式：2020-02-02
			},
		}
	}
</script>

<style lang="less" scoped>
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
	p{
		margin-left: 40rpx;
		font-size: 36rpx;
		font-weight: bold;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	.timechoose{
		width: 90%;
		height: 80rpx;
		margin: 20rpx auto;
		border: 1px solid #E8E8E8;
		border-radius: 10rpx;
		position: relative;
		image{
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			left: 36%;
			top: 50%;
			margin-top: -20rpx;
		}
		.time{
			position: absolute;
			left: 44%;
			top: 20%;
		}
	}
	.pic{
		width: 100%;
		height: auto;
		padding-left: 30rpx;
		margin-top: 20rpx;
		scroll-view{
			max-height: 1200rpx;
		}
		.ul{
			float: left;
			height: auto;
			width: 220rpx;
			display: flex;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			flex-direction: column;
			align-items: center;
			image{
				width: 160rpx;
				height: 160rpx;
			}
			text{
				font-size: 26rpx;
				color: #6f6f6f;
				text-align: center;
			}
			&:nth-last-of-type(1){
				width: 90%;
				margin: 0;
				padding-left: 20rpx;
				margin-bottom: 40rpx;
			}
		}
		&::after{
			content: '';
			clear: both;
			display: block;
			visibility: hidden;
			height: 0;
		}
	}
	.btm{
		width: 100%;
		margin-top: 10rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		color: #B7B7BD;
		font-size: 30rpx;
	}
</style>
