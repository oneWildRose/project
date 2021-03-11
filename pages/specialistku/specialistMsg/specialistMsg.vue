<template>  <!-- 专家的信息 -->
	<view class='hello'>
		<div class="status" style='background-color: #F3F7FF;'></div>
		<div class="head">
			<image :src="require('../../../static/fanhui.png')" mode="" @click="goBack"></image>
			<text>专家信息</text>
		</div>
		<div class="msg">
			<div>
				<div class='text'>
					<div>
						<text class="name">{{ name == null? '昵称' : name }}</text>
						<image src="../../../static/cap.svg" mode=""></image>
						<div class='tags'>
							<p v-for="(item, index) in msg.tags">
								{{ item }}
							</p>
						</div>
					</div>
					<p><text>100%</text>客户满意度</p>
					<!-- <div>业内专家</div> -->
					<div>
						<div>业内专家</div>
						<div @click='goWebsocket'>沟通</div>
					</div>
				</div>
				<image :src="msg.file == null? src:msg.file" mode=""></image>
			</div>
			<p>擅长：{{ introduce == null? '暂无' : introduce }}</p>
		</div>
		<div class="anli">
			<p class='title'>项目经历</p>
			<div v-if="msg.record == 0" style='text-indent: 40rpx;font-size: 32rpx;'>暂无</div>
			<div class='ul'>
				<ul v-for='(item, index) in msg.record' :key='index'>
					<li>
						<p>项目名称：</p>
						<text>{{ item.project_name }}</text>
					</li>
					<li>
						<p>担任角色：</p>
						<text>{{ item.role }}</text>
					</li>
					<li style='height: auto;'>
						<p>项目描述：
							<text>{{ item.details }}</text>
						</p>
					</li>
					<li>
						<p>案例图片:</p>
						<image v-for="(item1, index) in item.images" :src="item1" mode="" @click="preview(item1)"></image>
					</li>
				</ul>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '../../../static/touxiang.svg',// 默认头像
				id: '',
				msg: [],
				name: '',
				introduce: ''
			}
		},
		onLoad(option) {
			this.id = option.id
		},
		onShow() {
			this.$request('/api/index/infoIndex', {
				uid: this.id
			}).then(res => {
				if(res.data.data.record) {
					for(var i = 0; i < res.data.data.record.length; i++){
						res.data.data.record[i].images = JSON.parse(res.data.data.record[i].images)// 后台数据是字符串格式，将其转换成数组
						for(var j = 0; j < res.data.data.record[i].images.length; j++) {
							res.data.data.record[i].images[j] += this.$store.state.imgFix // 加上缩略图参数
						}
					}
				}
				this.msg = res.data.data
				this.name = this.msg.info.name
				this.introduce = this.msg.info.introduce
				// console.log(this.msg)
			})
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			goWebsocket() {
				uni.navigateTo({
					url: '../../message/websocket/websocket?id=' + this.id
				})
			},
			preview(url) { // 图片预览
				// 预览时，将缩略图参数去掉，展示原图。以问号分割成一个数组，索引0就是原图路径
				uni.previewImage({
					urls: [ url.split('?')[0] ]
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		width: 100%;
		height: auto;
	}
	.head{
		width: 100%;
		height: 120rpx;
		background: #F3F7FF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		image{
			width: 50rpx;
			height: 50rpx;
			margin-left: 40rpx;
		}
		text{
			flex-grow: 1;
			text-align: center;
			color: #4A4A4A;
			font-size: 36rpx;
			margin-left: -100rpx;
		}
	}
	.msg{
		width: 100%;
		height: auto;
		background: #F3F7FF;
		&>div{
			width: 100%;
			height: 300rpx;
			display: flex;
			justify-content: space-between;
			.text{
				width: 68%;
				margin-left: 40rpx;
				&>div:nth-of-type(1){
					width: 100%;
					height: 120rpx;
					display: flex;
					align-items: center;
					.name{
						font-size: 50rpx;
						margin-right: 10rpx;
						font-weight: bold;
						width: 32%;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					image{
						width: 50rpx;
						height: 50rpx;
					}
					.tags{
						margin-top: 56rpx;
						width: 56%;
						height: 88rpx;
						overflow: hidden;
						overflow-y: scroll;
						&::after{
							content: '';
							height: 0;
							display: block;
							visibility: hidden;
							clear: both;
						}
						p{
							width: auto;
							float: left;
							margin-left: 10rpx;
							height: 40rpx;
							line-height: 40rpx;
							font-size: 24rpx;
							padding-left: 16rpx;
							padding-right: 16rpx;
							margin-bottom: 4rpx;
							border-radius: 20rpx;
							font-weight: bold;
							color: white;
							&:nth-of-type(1){
								background: #00CC1E;
							}
							&:nth-of-type(2){
								background: #4CD9C0;
							}
							&:nth-of-type(3){
								background: #A4ADFF;
							}
							&:nth-of-type(4){
								background: #00CC1E;
							}
						}
					}
				}
				&>p{
					margin-top: 10rpx;
					margin-bottom: 20rpx;
					text{
						font-size: 40rpx;
						font-weight: bold;
						margin-right: 14rpx;
					}
				}
				// &>div:nth-of-type(2){
				// 	width: 152rpx;
				// 	height: 60rpx;
				// 	line-height: 60rpx;
				// 	text-align: center;
				// 	font-size: 28rpx;
				// 	border-radius: 8rpx;
				// 	color: #DAB87E;
				// 	border: 1px solid #DAB87E;
				// }
				&>div:nth-of-type(2){
					width: auto;
					display: flex;
					div{
						width: 152rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						font-size: 28rpx;
						border-radius: 8rpx;
						color: #DAB87E;
						border: 1px solid #DAB87E;
						margin-right: 10rpx;
					}
				}
			}
			&>image{
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				margin-top: 30rpx;
				margin-right: 40rpx;
			}
		}
		&>p{
			width: 90%;
			font-size: 34rpx;
			margin-left: 40rpx;
		}
	}
	.anli{
		width: 100%;
		height: 60%;
		margin-top: 20rpx;
		background: white;
		.title{
			width: 90%;
			height: 96rpx;
			line-height: 96rpx;
			margin: 0 auto;
			font-size: 36rpx;
			border-bottom: 1px solid #E6E6E6;
		}
		.ul{
			width: 90%;
			max-height: 84%;
			overflow: hidden;
			overflow-y: scroll;
			margin: 0 auto;
		}
		ul{
			width: 100%;
			max-height: 620rpx;
			padding-bottom: 20rpx;
			overflow-y: scroll;
			font-size: 30rpx;
			border-bottom: 1px solid #E6E6E6;
			li{
				width: 100%;
				height: 60rpx;
				display: flex;
				align-items: center;
				&:nth-last-of-type(1){
					display: block;
					height: auto;
					&::after{
						content: '';
						clear: both;
						height: 0;
						display: block;
						visibility: hidden;
					}
					image{
						width: 148rpx;
						height: 148rpx;
						margin-right: 20rpx;
						float: left;
						margin-top: 10rpx;
					}
				}
			}
		}
	}
</style>
