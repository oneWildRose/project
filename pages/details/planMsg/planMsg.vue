<template> <!-- 方案详情 -->
	<view class="hello">
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>方案详情</text>
		</div>
		<div class="main">
			<div class='address'>
				<div>{{ msg.name }}</div>
				<div>{{ msg.dnumber }}</div>
			</div>
			<div class='img'>
				<image :src="msg.plan_url" mode="" @click="preview"></image>
			</div>
			<div class="work">
				<div class="tit">
					<image :src="require('../../../static/biaozhun.svg')" mode=""></image>
					<text>基础描述</text>
				</div>
				<div class='text'>
					<rich-text class="rich" :nodes="msg.content == ''? '暂无':msg.content"></rich-text>
				</div>
			</div>
			<div class="btm" style='height: 100rpx;'></div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scheme_id: '',
				msg: '',
				text: '方案详情',
			}
		},
		onLoad(option) {
			this.scheme_id = option.id
			// console.log(this.scheme_id)
			this.$request('/api/scheme/RegularInfo', {
				scheme_id: this.scheme_id
			}).then(res => {
				// console.log(res)
				this.msg = res.data.data
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({})
			},
			preview() {
				uni.previewImage({
					urls: [ this.msg.plan_url ]
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
		background: #F9F9FB;
	}
	.title{
		width: 100%;
		height: 120rpx;
		background-color: #5E79F2;
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
			color: white;
			font-size: 36rpx;
			font-weight: bold;
			margin-left: -100rpx;
		}
	}
	.main{
		width: 100%;
		height: 79%;
		.address{
			width: 90%;
			height: 80rpx;
			margin: 20rpx auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&>div:nth-of-type(1){
				max-width: 59%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			&>div:nth-of-type(2){
				max-width: 41%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			image{
				width: 40rpx;
				height: 40rpx;
				vertical-align: middle;
				margin-top: -10rpx;
			}
		}
		.img{
			width: 90%;
			height: 448rpx;
			margin: 0 auto;
			image{
				width: 100%;
				height: 100%;
				vertical-align: middle;
			}
		}
		.work{
			width: 90%;
			margin: 40rpx auto;
			.tit{
				width: 100%;
				height: 40rpx;
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
				image{
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
			}
			&>.text{
				width: 97.5%;
				height: 660rpx;
				overflow-x: hidden;
				word-wrap: break-word; 
				word-break: normal;
				overflow-y: scroll;
				background: white;
				border-radius: 6rpx;
				padding: 10rpx;
				font-size: 26rpx;
				box-shadow: #c6c6c6 0 0 6rpx 0;
				.rich{
					p{
						color: pink;
						margin-top: 20rpx;
					}
				}
			}
		}
	}
</style>
