<template> <!-- 项目信息 -->
	<view class="hello">
		<div class='goback'>
			<image :src="require('../../static/fanhui(1).png')" mode="" @click='goBack'></image>
			<p>融创项目一期</p>
			<div>
				<image :src="require('../../static/9-17icon/zuijinshijian.svg')" mode=""></image>
				<text>最近更新：2020-09-01</text>
			</div>
		</div>
		<div class='main'> <!-- Tab -->
			<div class="title">
				<div v-show='num != 2' v-for="(item, index) in tabs" :key="index" :class="{active:num==index}" @click="table(index)">
					<text>{{ item }}</text>
					<div :class="{ block:num == index }"></div>
				</div>
			</div>
			<ul v-show="num == 0"> <!-- 基本信息 -->
				<li v-for="(item, index) in msg" :key='index'>
					<image :src="getUrl(item.brg_url)"></image>
					<p>{{ item.text }}</p>
				</li>
				<li>
					<p>项目平面图</p>
					<image src="" mode=""></image>
				</li>
			</ul>
			<div class='tree' v-show='num == 1'> <!-- 苗木信息 -->
				<div class='search'>
					<input type="search" value="" placeholder="搜索苗木" />
					<image :src="require('../../static/search.svg')" mode=""></image>
				</div>
				<div class='kind'>
					<ul>
						<li @click='goTreeMsg'>
							<image :src="require('../../static/shu.png')" mode=""></image>
							<p>悬铃木</p>
						</li>
						<li>
							<image :src="require('../../static/shu.png')" mode=""></image>
							<p>悬铃木</p>
						</li>
						<li>
							<image :src="require('../../static/shu.png')" mode=""></image>
							<p>悬铃木</p>
						</li>
						<li>
							<image :src="require('../../static/shu.png')" mode=""></image>
							<p>悬铃木</p>
						</li>
						<li>
							<image :src="require('../../static/shu.png')" mode=""></image>
							<p>悬铃木</p>
						</li>
						<li>
							<image :src="require('../../static/shu.png')" mode=""></image>
							<p>悬铃木</p>
						</li>
						<li>
							<image :src="require('../../static/shu.png')" mode=""></image>
							<p>悬铃木</p>
						</li>
						<li>
							<image :src="require('../../static/shu.png')" mode=""></image>
							<p>悬铃木</p>
						</li>
						<li>
							<image :src="require('../../static/shu.png')" mode=""></image>
							<p>悬铃木</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: ['基本信息', '苗木信息'],
				num: 0,
				msg: [
					{
						brg_url: '../../static/9-17icon/project.svg',
						text: '项目名称：融创项目一期'
					},
					{
						brg_url: '../../static/9-17icon/gongsi.svg',
						text: '企业名称：坚实物业服务有限公司'
					},
					{
						brg_url: '../../static/9-17icon/ress.svg',
						text: '项目地址：天津市南开区体育中心凌滨路'
					},
					{
						brg_url: '../../static/9-17icon/mianji.svg',
						text: '项目管理面积：10000亩'
					},
					{
						brg_url: '../../static/9-17icon/intime.svg',
						text: '项目竣工时间：2021-08-31'
					},
					{
						brg_url: '../../static/9-17icon/intime.svg',
						text: '项目竣工时间：2021-08-31'
					},
					{
						brg_url: '../../static/9-17icon/intime.svg',
						text: '项目进场时间：2020-09-01'
					},
					{
						brg_url: '../../static/9-17icon/fuzeren.svg',
						text: '负责人：张元'
					}
				]
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({})
			},
			table(index) {
				this.num = index
			},
			getUrl(url) {
				return url;
			},
			goTreeMsg() {
				uni.navigateTo({
					url: '../tree_msg/tree_msg'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		width: 100%;
		height: 100%;
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
			border-radius: 30rpx;
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
				margin: 0 auto;
				border: 1px solid #E8E8E8;
				border-radius: 20rpx;
				li{
					width: 100%;
					height: 80rpx;
					display: flex;
					align-items: center;
					font-size: 32rpx;
					font-weight: 500;
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
						image{
							width: 90%;
							height: 300rpx;
							margin: 20rpx auto;
							border: 1px solid red;
							display: block;
						}
					}
				}
			}
			
			.tree{
				width: 90%;
				height: 800rpx;
				margin: 0 auto;
				.search{
					width: 100%;
					height: 80rpx;
					position: relative;
					input{
						width: 100%;
						height: 100%;
						line-height: 80rpx;
						border: 1px solid #E6E6E6;
						border-radius: 20rpx;
						text-align: center;
					}
					image{
						width: 40rpx;
						height: 40rpx;
						position: absolute;
						left: 20rpx;
						top: 50%;
						margin-top: -20rpx
					}
				}
				.kind{
					width: 100%;
					height: 90%;
					ul{
						width: 100%;
						height: 100%;
						margin: 0;
						padding: 0;
						border: none;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
						li{
							width: 184rpx;
							height: 260rpx;
							text-align: center;
							display: flex;
							flex-wrap: wrap;						
							margin-top: 20rpx;
							image{
								width: 100%;
								height: 200rpx;
								margin: 0;
								padding: 0;
								border: 1px solid #b5b5b5;
							}
							p{
								width: 100%;
								text-align: center;
							}
						}
					}
				}
			}
		}
	}
</style>
