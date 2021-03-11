<template>		<!-- 需求信息 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>需求信息</text>
		</div>
		<div class="main">
			<div class='need'>
				<div class='tit'>
					<text>需求类型：专家方案</text>
					<p :class="status == 0? 'orange' : status == 1? 'blue' : status == 2? 'gray' : 'green' ">
						{{ status == 0? '已发布' : status == 1? '进行中' : status == 2? '已取消' : '已完成' }}
					</p>
				</div>
				<div class='cont'>
					<p>需求描述：需要专家设计并制作整个项目的绿化方案需要专家设计并制作整个项目的绿化方案需要专家设计并制作整个项目的绿化方案需要专家设计并制作整个项目的绿化方案</p>
					<div>
						<text>2020-10-01 16:30</text>
					</div>
				</div>
			</div>
			<div class="pic">
				<p>项目名称：融创项目一期</p>
				<p>需求照片</p>
				<div>
					<image :src="require('../../../static/zhaopian.png')" mode=""></image>
					<image :src="require('../../../static/zhaopian.png')" mode=""></image>
					<image :src="require('../../../static/zhaopian.png')" mode=""></image>
					<image :src="require('../../../static/zhaopian.png')" mode=""></image>
				</div>
			</div>
			<div class="take_partin">  <!-- 参与改需求的专家 -->
				<div class="tit">参与该需求的专家</div>
				<ul>
					<!-- <li>
						<div class='specialist_msg'>
							<image :src="require('../../../static/10-26/specialist.png')" mode="" style="width: 80rpx;height: 80rpx;"></image>
							<div>
								<p>昵称123</p>
								<text>2020-10-26 15:11</text>
							</div>
							<div>沟通</div>
						</div>
						<div>
							<p>整体造型的修剪与设计，可以沟通进行修改</p>
							<div>
								<image :src="require('../../../static/point.png')" mode=""></image>
								<image :src="require('../../../static/point.png')" mode=""></image>
								<image :src="require('../../../static/point.png')" mode=""></image>
							</div>
						</div>
					</li> -->
					<view class="comment" v-for="(res, index) in commentList" :key="res.id">
						<view class="left"><image :src="res.url" mode="aspectFill"></image></view>
						<view class="right">
							<view class="top">
								<view class="name">{{ res.name }}</view>
								<view class="like" :class="{ highlight: res.isLike }">
									<view class="num">{{ res.likeNum }}</view>
									<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
									<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
								</view>
							</view>
							<view class="content">{{ res.contentText }}</view>
							<view class="reply-box">
								<view class="item" v-for="(item, index) in res.replyList" :key="item.index">
									<view class="username">{{ item.name }}</view>
									<view class="text">{{ item.contentStr }}</view>
								</view>
								<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
									共{{ res.allReply }}条回复
									<u-icon class="more" name="arrow-right" :size="26"></u-icon>
								</view>
							</view>
							<view class="bottom">
								{{ res.date }}
								<view class="reply">回复</view>
							</view>
						</view>
					</view>
				</ul>
			</div>
		</div>
	</view>
</template>
<!-- 目前流程：项目方发布需求 -> 专家在公海看到此需求想试试 -> 专家上传部分方案 -> 项目方决定是否采用

问题：1.专家的方案在何处上传，怎么上传（一个方案至少包括一张图片和一段文字）。
	2.假设有多名专家上传了方案，那专家的方案是否公开。
	3.如果公开，是否会影响专家或项目方的体验（'抄袭借鉴现象'，项目方选择困难）
	4.如果不公开，此模块则显得多余，不必要
	
思路：去掉'参与该需求的专家'模块，专家与项目方自己沟通就好，跟在boss上找面试机会差不多。
	项目方发布自己的需求，将照片和现场状况描述挂上。（基础，必需）
	也可以添加一些其他要求，比如希望来沟通的专家能提前做好示例方案。（额外，不必需） -->
<script>
	export default {
		data() {
			return {
				status: '',
				commentList: []
			}
		},
		onLoad(option) {
			this.status = option.status
			this.getComment();
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 跳转到全部回复
			toAllReply() {
				uni.navigateTo({
					url: '../reply/reply'
				});
			},
			// 点赞
			getLike(index) {
				this.commentList[index].isLike = !this.commentList[index].isLike;
				if (this.commentList[index].isLike == true) {
					this.commentList[index].likeNum++;
				} else {
					this.commentList[index].likeNum--;
				}
			},
			// 评论列表
			getComment() {
				this.commentList = [
					{
						id: 1,
						name: '叶轻眉',
						date: '12-25 18:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						allReply: 12,
						likeNum: 33,
						isLike: false,
						replyList: [
							{
								name: 'uview',
								contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
							},
							{
								name: '粘粘',
								contentStr: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
							}
						]
					},
					{
						id: 2,
						name: '叶轻眉1',
						date: '01-25 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						allReply: 0,
						likeNum: 11,
						isLike: false,
						url: 'https://cdn.uviewui.com/uview/template/niannian.jpg',
					},
					{
						id: 3,
						name: '叶轻眉2',
						date: '03-25 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						allReply: 0,
						likeNum: 21,
						isLike: false,
						allReply: 2,
						url: '../../../static/logo.png',
						replyList: [
							{
								name: 'uview',
								contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
							},
							{
								name: '豆包',
								contentStr: '想吃冰糖葫芦粘豆包，但没钱5555.........'
							}
						]
					},
					{
						id: 4,
						name: '叶轻眉3',
						date: '06-20 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
						allReply: 0,
						likeNum: 150,
						isLike: false
					}
				];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment {
		display: flex;
		padding: 30rpx;
		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}
		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;
				.name {
					color: #5677fc;
				}
				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;
					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}
				.highlight {
					color: #5677fc;
					.num {
						color: #5677fc;
					}
				}
			}
			.content {
				margin-bottom: 10rpx;
			}
			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;
				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;
					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}
				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;
					.more {
						margin-left: 6rpx;
					}
				}
			}
			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;
				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
	}
	.hello{
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		background: #F8F8FF;
	}
	.head{
		width: 100%;
		height: 108rpx;
		background: #6876FF;
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
			margin-left: -90rpx;
			color: white;
			font-size: 36rpx;
			font-weight: bold;
		}
	}
	.main{
		width: 100%;
		height: 90%;
		overflow-y: scroll;
		.need{
			width: 94%;
			margin: 20rpx auto;
			height: auto;
			padding-bottom: 20rpx;
			background: white;
			border-radius: 10rpx;
			box-shadow: #E7E7E7 0 0 10rpx 0;
			margin-bottom: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.tit{
				width: 96%;
				margin: 0 auto;
				height: 108rpx;
				border-bottom: 1px solid #E7E7E7;
				display: flex;
				justify-content: space-between;
				align-items: center;
				text{
					font-size: 34rpx;
					font-weight: bold;
					text-indent: 20rpx;
				}
				p{
					font-size: 30rpx;
					font-weight: bold;
					margin-right: 40rpx;
				}
				.orange{
					color: #F9B150;
				}
				.blue{
					color: #7176FF;
				}
				.gray{
					color: #B5B5B5;
				}
				.green{
					color: #24BF3A;
				}
			}
			.cont{
				width: 90%;
				height: auto;
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				&>p{
					font-size: 28rpx;
					color: #8F918F;
					margin-top: 20rpx;
					width: 100%;
					margin-bottom: 20rpx;
				}
				&>div{
					display: flex;
					justify-content: space-between;
					align-items: center;
					text{
						font-size: 28rpx;
						color: #8F918F;
					}
				}
			}
		}
		.pic{
			width: 94%;
			margin: 0 auto;
			height: 328rpx;
			background: white;
			box-shadow: #E7E7E7 0 0 10rpx 0;
			font-size: 30rpx;
			p{
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				text-indent: 40rpx;
			}
			&>div{
				width: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				image{
					width: 156rpx;
					height: 148rpx;
				}
			}
		}
		.take_partin{
			width: 94%;
			margin: 20px auto;
			height: auto;
			background: white;
			.tit{
				width: 94%;
				height: 84rpx;
				line-height: 84rpx;
				margin: 0 auto;
				border-bottom: 1px solid #E7E7E7;
			}
		}
	}
</style>
