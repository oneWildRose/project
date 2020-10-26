<template> <!-- 项目信息 -->
	<view class="hello">
		<div class='goback'>
			<image :src="require('../../static/fanhui(1).png')" mode="" @click='goBack'></image>
			<p>融创项目一期</p>
			<div>
				<image :src="require('../../static/9-17icon/zuijinshijian.svg')" mode=""></image>
				<text>最近更新：2020.10.1</text>
			</div>
		</div>
		<div class='main'> <!-- Tab -->
			<ul v-show="num == 0"> <!-- 基本信息 -->
				<li>
					<image :src="require('../../static/9-17icon/project.svg')"></image>
					<p>项目名称：融创项目一期</p>
				</li>
				<li>
					<image :src="require('../../static/9-17icon/gongsi.svg')"></image>
					<p>企业名称：深圳腾讯有限公司</p>
				</li>
				<li>
					<image :src="require('../../static/9-17icon/ress.svg')"></image>
					<p>项目地址：北京朝阳十里居翻斗花园</p>
				</li>
				<li>
					<image :src="require('../../static/9-17icon/mianji.svg')"></image>
					<p>项目管理面积：1公顷</p>
				</li>
				<li>
					<image :src="require('../../static/9-17icon/intime.svg')"></image>
					<p>项目竣工时间：2020-10-01</p>
				</li>
				<li>
					<image :src="require('../../static/9-17icon/intime.svg')"></image>
					<p>项目交付时间：2020-10-01</p>
				</li>
				<li>
					<image :src="require('../../static/9-17icon/intime.svg')"></image>
					<p>项目进场时间：2020-10-01</p>
				</li>
				<li>
					<image :src="require('../../static/9-17icon/fuzeren.svg')"></image>
					<p>负责人：张三</p>
				</li>
				<li>
					<p>项目平面图：</p>
					<image :src="require('../../static/zanwu.png')" mode="" @click="preview"></image>
				</li>
			</ul>
		</div>
		<div class='btm' v-if='msg == 0? false : true'>
			<div>
				<image :src="require('../../static/cuowu.svg')" mode=""></image>
				<text>拒绝</text>
			</div>
			<div>
				<image :src="require('../../static/duigou.svg')" mode=""></image>
				<text>接单</text>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: ['基本信息', '点位信息'],
				num: 0,
				msg: '',
				project_id: '',
				acreage: '',
				src: '../../static/zanwu.png',
			}
		},
		onLoad(option) {
			console.log(option)
			this.msg = option.msg
		},
		onShow() {
			
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			table(index) {
				this.num = index
			},
			goTreeMsg() {
				uni.navigateTo({
					url: '../tree_msg/tree_msg'
				})
			},
			goUpload() {
				uni.navigateTo({
					// url: '../upload_excel/upload_excel?project_id=' + this.project_id
					url: '../single/single?project_id=' + this.project_id
				})
			},
			goChange() {
				uni.navigateTo({
					url: '../change/change?project_id=' + this.project_id
				})
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
		height: 1200rpx;
		background: url(../../static/9-17icon/bg2.jpg) no-repeat;
		background-size: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		.goback{
			padding-left: 40rpx;
			padding-right: 40rpx;
			background: transparent;
			width: 90%;
			height: 320rpx;
			line-height: 120rpx;
			margin: 0px auto;
			text-align: center;
			position: relative;
			color: white;
			font-size: 36rpx;
			&>image{
				width: 52rpx;
				height: 52rpx;
				position: absolute;
				left: 40rpx;
				top: 50%;
				margin-top: -120rpx;
			}
			p{
				position: absolute;
				left: 40rpx;
				top: 30%;
				font-size: 34rpx;
				font-weight: 600;
			}
			div{
				width: 400rpx;
				height: 80rpx;
				line-height: 80rpx;
				position: absolute;
				left: 40rpx;
				top: 56%;
				color: #d3d8e7;
				font-size: 26rpx;
				display: flex;
				align-items: center;
				image{
					width: 36rpx;
					height: 36rpx;
					margin-right: 10rpx;
				}
			}
		}
		
		.main{
			width: 100%;
			height: 100%;
			background: white;
			border-radius: 40rpx;
			position: absolute;
			top: 326rpx;
			.active{
				color: #3F5DE3;
			}
			
			.title{
				width: 90%;
				margin: 0 auto;
				height: 148rpx;
				display: flex;
				align-items: center;
				font-size: 32rpx;
				&>div{
					width: 180rpx;
					position: relative;
					div{
						width: 64rpx;
						border: 1px solid #3F5DE3;
						position: absolute;
						bottom: -12rpx;
						left: 50%;
						margin-left: -60rpx;
						display: none;
						&.block{
							display: block;
						}
					}
				}
			}
			
			ul{
				width: 90%;
				height: 1020rpx;
				margin: 40rpx auto;
				border: 1px solid #E8E8E8;
				border-radius: 20rpx;
				li{
					width: 100%;
					height: 80rpx;
					display: flex;
					align-items: center;
					font-size: 32rpx;
					font-weight: 500;
					p{
						display: flex;
						justify-content: space-around;
					}
					image{
						width: 34rpx;
						height: 34rpx;
						vertical-align: center;
						margin-right: 10rpx;
						margin-left: 10rpx;
					}
					&:nth-of-type(9){
						display: block;
						text-indent: 20rpx;
						p{
							display: block;
						}
						image{
							width: 90%;
							height: 300rpx;
							margin: 20rpx auto;
							display: block;
						}
					}
				}
				.change{
					width: 20%;
					height: 52rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					position: absolute;
					bottom: -20rpx;
					left: 50%;
					margin-left: -10%;
					image{
						width: 40rpx;
						height: 40rpx;
					}
					text{
						font-size: 26rpx;
						color: #3F5DE3;
						font-weight: 700;
					}
				}
			}
		}
	}
	.btm{
		width: 100%;
		height: 92rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1px solid #BEBEBE;
		display: flex;
		div{
			width: 50%;
			height: 100%;
			line-height: 92rpx;
			text-align: center;
			font-size: 32rpx;
			image{
				width: 40rpx;
				height: 40rpx;
				vertical-align: middle;
				margin-right: 6rpx;
				margin-top: -4rpx;
			}
			&:nth-of-type(1){
				text{
					color: #939593;
				}
			}
			&:nth-of-type(2){
				background: #5E79F2;
				text{
					color: white;
				}
			}
		}
	}
</style>
