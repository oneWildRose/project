<template>  <!-- 苗木信息 -->
	<view>
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>苗木信息</text>
		</div>
		<div class="main">
			<div class="tit">
				<p>基本信息</p>
				<div @click='changeTreeMsg'>
					<image :src="require('../../../static/xiugai.svg')" mode=""></image>
					<text>编辑</text>
				</div>
			</div>
			<div class="msg">
				<div>
					<p>苗木名称：{{ msg.name }}</p>
					<div>
						<text>状态：</text>
						<text class='zht'>正常</text>
					</div>
				</div>
				<div>苗木编号：20201015123</div>
				<div>
					<text>计数：{{ msg.num }}</text>
					<text>生长年份：2年</text>
					<text></text>
				</div>
				<div>
					<text>高度：{{ msg.height }}</text>
					<text>冠幅：{{ msg.crown }}</text>
					<text>胸径：{{ msg.perimeter }}</text>
				</div>
				<div>
					<p>苗木照片</p>
					<div v-if='!msg.file' style='text-indent: 10rpx;color: #666666;'>暂无</div>
					<div v-if='msg.file'>
						<image v-for="(item, index) in msg.file" :src="item" mode="" @click="preview(item)"></image>
					</div>
				</div>
			</div>
			<!-- <div class="lately">
				<p>最近情况</p>
				<ul>
					<li>
						<image :src="require('../../../static/shu.png')" mode=""></image>
						<div>
							<p>上传时间：2020-10-10 10:55</p>
							<text>上传人：张元</text>
						</div>
					</li>
				</ul>
			</div> -->
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '' ,// 苗木id
				msg: ''
			}
		},
		onLoad(option) {
			this.id = option.id
			this.$request('/api/Seedling/setSeedlingInfo', {
				seedling_id: this.id
			}).then(res => {
				for(var i = 0; i < res.data.data.file.length; i++) {
					res.data.data.file[i] += this.$store.state.imgFix // 在图片后加上参数
				}
				this.msg = res.data.data
				console.log(this.msg)
			})
		},
		methods: {
			goBack(){ uni.navigateBack() },
			changeTreeMsg() {
				uni.navigateTo({
					url: '../changeTreeMsg/changeTreeMsg?id=' + this.id
				})
			},
			preview(url) {
				uni.previewImage({
					urls: [ url.split('?')[0] ]
				})
			}
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
	.main{
		width: 100%;
		height: auto;
		.tit{
			width: 100%;
			height: 96rpx;
			border-bottom: 1px solid #DBDBDB;
			display: flex;
			justify-content: space-between;
			align-items: center;
			p{
				font-size: 32rpx;
				font-weight: bold;
				margin-left: 40rpx;
			}
			&>div{
				margin-right: 40rpx;
				display: flex;
				align-items: center;
				image{
					width: 36rpx;
					height: 36rpx;
				}
				text{
					font-size: 30rpx;
					color: #5C7CF4;
				}
			}
		}
		.msg{
			width: 100%;
			height: auto;
			border-bottom: 1px solid #E6E6E6;
			&>div{
				width: 90%;
				margin: 20rpx auto;
				display: flex;
				&:nth-of-type(1){
					justify-content: space-between;
					align-items: center;
					div{
						display: flex;
						align-items: center;
						.zht{
							padding: 4rpx 16rpx 4rpx 16rpx;
							background: #768FFF;
							border-radius: 20rpx;
							color: white;
							font-size: 26rpx;
						}
					}
				}
				&:nth-of-type(3){
					align-items: center;
					justify-content: space-between;
					text{
						display: block;
						width: 200rpx;
					}
				}
				&:nth-of-type(4){
					align-items: center;
					justify-content: space-between;
					text{
						display: block;
						width: 200rpx;
						&:nth-of-type(1){
							width: auto;
							// max-width: 250rpx;
						}
					}
				}
				&:nth-last-of-type(1){
					display: flex;
					flex-direction: column;
					p{
						margin-right: 40rpx;
					}
					div{
						width: 100%;
						height: auto;
						image{
							width: 168rpx;
							height: 168rpx;
							float: left;
							margin-right: 30rpx;
							margin-bottom: 10rpx;
						}
					}
				}
			}
		}
		.lately{
			width: 100%;
			height: auto;
			&>p{
				width: 90%;
				margin: 0 auto;
				height: 92rpx;
				line-height: 92rpx;
				font-size: 32rpx;
			}
			ul{
				width: 90%;
				margin: 0 auto;
				height: auto;
				li{
					width: 100%;
					height: 140rpx;
					border-top: 1px solid #E6E6E6;
					display: flex;
					align-items: center;
					image{
						width: 96rpx;
						height: 96rpx;
						margin-right: 30rpx;
					}
					div{
						color: #707070;
						p{
							margin-bottom: 8rpx;
						}
					}
				}
			}
		}
	}
</style>
