<template> <!-- 员工信息 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../../static/fanhui.png')" mode="" @click='goBack'></image>
			<text>工人信息</text>
		</div>
		<div class="main">
			<ul>
				<li class='pic'>
					<p>照片</p>
					<image src="https://org.modao.cc/uploads4/images/5258/52585076/v2_qemset.png" mode=""></image>
				</li>
				<li>
					<p>姓名</p>
					<text>黄文才</text>
				</li>
				<li>
					<p>工人分组</p>
					<text>绿化工人</text>
				</li>
			</ul>
			<ul>
				<li>
					<p>性别</p>
					<text>男</text>
				</li>
				<li>
					<p>身份证号</p>
					<text>{{ card.substring(0, 4) + '**********' + card.substring(card.length - 4) }}</text>
				</li>
				<li>
					<p>电话号码</p>
					<text>13013019999</text>
				</li>
				<li>
					<p>年龄（岁）</p>
					<text>46</text>
				</li>
				<li>
					<p>联系地址</p>
					<text>天津市武清区南湖885</text>
				</li>
			</ul>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				card: '123456789123456789',
			};
		},
		onLoad(option) {
			this.name = option.name
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.status{
		// background: #F5F6F9;
	}
	.hello{
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		background: #F5F6F9;
		.title{
			width: 100%;
			height: 100rpx;
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
				font-size: 36rpx;
				margin-left: -88rpx;
			}
		}
		.main{
			width: 100%;
			height: auto;
			ul{
				width: 90%;
				height: auto;
				margin: 20rpx auto;
				background: white;
				border-radius: 20rpx;
				li{
					width: 90%;
					height: 112rpx;
					margin: 0 auto;
					font-size: 28rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #E3E3E3;
					p{
						width: 200rpx;
					}
					image{
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}
					&:nth-last-of-type(1){
						border: none;
					}
				}
				.pic{
					height: 148rpx;
				}
			}
		}
	}
</style>
