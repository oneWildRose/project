<template>		<!-- 我的需求 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="head">
			<div class='title'>
				<image :src="require('../../static/fanhui(1).png')" @click="goBack" mode=""></image>
				<text>我的需求</text>
				<image :src="require('../../static/search_white.svg')" mode=""></image>
			</div>
			<div class="tab">
				<div v-for="(item, index) in list_tab" :key='index' @click='tab(index)'>
					<text :class='index == index_tab? "act" : "" '>{{ item }}</text>
					<p :class='index == index_tab? "brg" : "" '></p>
				</div>
			</div>
		</div>
		<ul :class='list_need.length > 4? "wid" : "" ' v-if='index_tab == 0? true : false'>
			<li v-for='(item, index) in list_need' :key='index' @click='goNeedmsg(item.status)'>
				<div class='tit'>
					<text>需求类型：{{ item.type }}</text>
					<image :src="require('../../static/more(2).svg')" mode=""></image>
				</div>
				<div class='cont'>
					<p>需求描述：{{ item.content }}</p>
					<div>
						<text>{{ item.time }}</text>
						<p :class="item.status == 0? 'orange' : item.status == 1? 'blue' : item.status == 2? 'gray' : 'green' ">
							{{ item.status == 0? '已发布' : item.status == 1? '进行中' : item.status == 2? '已取消' : '已完成' }}
						</p>
					</div>
				</div>
			</li>
		</ul>
		<ul :class='list_need.length > 4? "wid" : "" '>
			<li v-for='(item, index) in list_need' :key='index' v-if='item.status == index_tab-1? true : false' @click='goNeedmsg(item.status)'>
				<div class='tit'>
					<text>需求类型：{{ item.type }}</text>
					<image :src="require('../../static/more(2).svg')" mode=""></image>
				</div>
				<div class='cont'>
					<p>需求描述：{{ item.content }}</p>
					<div>
						<text>{{ item.time }}</text>
						<p :class="item.status == 0? 'orange' : item.status == 1? 'blue' : item.status == 2? 'gray' : 'green' ">
							{{ item.status == 0? '已发布' : item.status == 1? '进行中' : item.status == 2? '已取消' : '已完成' }}
						</p>
					</div>
				</div>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index_tab: 0,
				list_tab: ['全部', '已发布', '进行中', '已取消', '已完成'],
				list_need: [
					{
						type: '专家绿化方案',
						content: '需要专家设计并制作整个项目的绿化方案需要专家设计并制作整个项目的绿化方案需要专家设计并制作整个项目的绿化方案需要专家设计并制作整个项目的绿化方案',
						time: '2020-10-1 16:30',
						status: 0 // 0已发布  1进行中  2已取消  3已完成
					},
					{
						type: '专家绿化方案',
						content: '需要专家设计并制作整个项目的绿化方案需要专家设计并制作整个项目的绿化方案',
						time: '2020-10-1 16:30',
						status: 1
					},
					{
						type: '专家绿化方案',
						content: '需要专家设计并制作整个项目的绿化方案需要专家设计并制作整个项目的绿化方案',
						time: '2020-10-1 16:30',
						status: 0
					},
					{
						type: '专家绿化方案',
						content: '需要专家设计并制作整个项目的绿化方案需要专家设计并制作整个项目的绿化方案',
						time: '2020-10-1 16:30',
						status: 1
					},
					{
						type: '专家绿化方案',
						content: '需要专家设计并制作整个项目的绿化方案需要专家设计并制作整个项目的绿化方案',
						time: '2020-10-1 16:30',
						status: 2
					},
					{
						type: '专家绿化方案',
						content: '需要专家设计并制作整个项目的绿化方案需要专家设计并制作整个项目的绿化方案',
						time: '2020-10-1 16:30',
						status: 3
					}
				]
			}
		},
		onLoad(option) {
			this.index_tab = option.index
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			tab(index) {
				this.index_tab = index
			},
			goNeedmsg(status) {
				uni.navigateTo({
					url: 'need_msg/need_msg?status=' + status
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
		background: #F8F8FF;
	}
	.head{
		width: 100%;
		height: 176rpx;
		background: #6876FF;
		.title{
			width: 100%;
			height: 120rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			text{
				color: white;
				font-size: 38rpx;
				font-weight: bold;
			}
			image{
				width: 50rpx;
				height: 50rpx;
				&:nth-of-type(1) {
					margin-left: 20rpx;
				}
				&:nth-of-type(2) {
					margin-right: 20rpx;
				}
			}
		}
		.tab{
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			div{
				color: white;
				position: relative;
				p{
					width: 40rpx;
					height: 6rpx;
					background: transparent;
					position: absolute;
					bottom: -14rpx;
					left: 50%;
					margin-left: -20rpx;
				}
			}
			.act{
				color: #F9B150;
			}
			.brg{
				background: #F9B150;
			}
		}
	}
	.wid{height: 1280rpx;}
	ul{
		width: 94%;
		margin: 20rpx auto;
		overflow-y: scroll;
		li{
			width: 100%;
			height: 304rpx;
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
				image{
					width: 50rpx;
					height: 50rpx;
					margin-right: 20rpx;
				}
			}
			.cont{
				width: 90%;
				height: 160rpx;
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				&>p{
					font-size: 28rpx;
					color: #8F918F;
					margin-top: 20rpx;
					width: 100%;
					height: 80rpx;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				&>div{
					display: flex;
					justify-content: space-between;
					align-items: center;
					text{
						font-size: 28rpx;
						color: #8F918F;
					}
					p{
						font-size: 28rpx;
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
			}
		}
	}
</style>
