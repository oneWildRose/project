<template> <!-- 首页 -->
	<view>
		<view class="head">
			<view class="search">
				<image :src="require('../../static/fangdajing.png')" mode=""></image>
				<input type="text" placeholder="搜索项目、苗木" />
			</view>
		</view>
		<view class="middle"> <!-- 轮播 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" :circular='true'>
				<swiper-item>
					<image :src="require('../../static/02.jpg')" class="swiper-item"></image>
				</swiper-item>
				<swiper-item>
					<image :src="require('../../static/02.jpg')" class="swiper-item"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="bottom">
			<view class="text">
				<view>专注项目品质</view>
				<text>专家协作，指定优秀项目方案</text>
			</view>
			<ul>
				<li title="" note="">
					<navigator url='../create/create'>
						<image :src="require('../../static/create.svg')"></image>
						<view class="">
							<p>创建项目</p>
							<p>创建项目，填写项目完整信息，专家协作制定项目方案</p>
						</view>
					</navigator>
				</li>
				<li title="" note="">
					<navigator url='../project/project'>
						<image :src="require('../../static/guanli.svg')"></image>
						<view class="">
							<p>项目管理</p>
							<p>查看所有项目并可以对项目进行编辑，记录了项目上的实时数据</p>
						</view>
					</navigator>
				</li>
				<li title="" note="">
					<navigator url='../specialist/specialist'>
						<image :src="require('../../static/guanli.svg')"></image>
						<view class="">
							<p>专家方案</p>
							<p>查看所有专家制定的项目方案，详细的记录了项目上各个点位的制作标准</p>
						</view>
					</navigator>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.head{
		width: 100%;
		height: 578rpx;
		background: url(../../static/01.jpg) no-repeat;
		background-size: 100%;
		background-position: 0;
		// border: 1px solid red;
		.search{
			width: 90%;
			height: 80rpx;
			line-height: 80rpx;
			margin: 0px auto;
			position: relative;
			image{
				width: 48rpx;
				height: 48rpx;
				position: absolute;
				top: 98%;
				left: 4%;
				z-index: 999;
			}
			input{
				width: 100%;
				height: 100%;
				color: #C3C3C3;
				background-color: white;
				border-radius: 12rpx;
				font-size: 14px;
				text-align: center;
				position: absolute;
				left: 0;
				top: 60rpx;
			}
		}
	}
	
	.middle{
		width: 96%;
		margin: 20rpx auto;
		height: 200rpx;
		swiper{
			width: 100%;
			height: 100%;
			image{
				width: 100%;
				height: 100%;
				border-radius: 20rpx;
			}
		}
	}
	
	.bottom{
		width: 100%;
		margin-top: 40rpx;
		.text{
			width: 90%;
			margin: 0 auto;
			text-align: left;
			view{
				font-weight: bold;
				font-size: 16px;
			}
			text{
				font-size: 14px;
				color: #8C8C8C;
			}
		}
		ul{
			li{
				width: 90%;
				height: 200rpx;
				margin: 28rpx auto;
				// border: 1px solid blue;
				background: white;
				box-shadow: #D2D2D2 1px 2px 6px 2px;
				border-radius: 20rpx;
				display: block;
				position: relative;
				navigator{
					height: 100%;
					position: relative;
				}
				image{
					width: 76rpx;
					height: 76rpx;
					position: absolute;
					left: 10%;
					top: 50%;
					margin-top: -38rpx;
				}
				view{
					width: 60%;
					// border: 1px solid red;
					position: absolute;
					left: 30%;
					top: 16%;
					p:nth-of-type(1){
						font-weight: bold;
						font-size: 16px;
						margin-bottom: 20rpx;
					}
					p:nth-of-type(2){
						color: #8c8c8c;
						font-size: 12px;
					}
				}
			}
		}
	}
	
</style>
