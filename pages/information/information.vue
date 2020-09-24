
<template> <!-- 个人信息 -->
	<view>
		<div class='kong'></div>
		<div class='title'>
			<image :src="require('../../static/fanhui(3).png')" @click="goBack"></image>
			<text>个人信息</text>
			<p>保存</p>
		</div>
		<div class='pic'>
			<image src="../../static/shu.png" mode=""></image>
			<p>修改头像</p>
		</div>
		<div class='msg'>
			<ul>
				<li @click="goModification">
					<p>昵称</p>
					<text>{{ msg_list.username }}</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li>
					<p>手机号</p>
					<text>{{ msg_list.mobile }}</text>
				</li>
				<li>
					<p>性别</p>
					<text>男</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li>
					<p>出生日期</p>
					<text>2020-10-01</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li>
					<p>职业</p>
					<text>暂无</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li>
					<p>营业执照</p>
					<text>暂无</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li>
					<p>企业代码</p>
					<text>暂无</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
			</ul>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg_list: ''
			}
		},
		onLoad: (option) => {
			uni.request({
				url: 'http://lvz.maike-docker.com/index.php/api/index/infoIndex',
				method: 'POST',
				data: {
					uid: option.uid
				},
				success: function (res) {
					// console.log(res.data)
					this.msg_list = res.data.data
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({})
			},
			goModification() {
				uni.navigateTo({
					url: '../modification/modification',
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.kong{
		width: 100%;
		height: 60rpx;
	}
	.title{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		image{
			width: 40rpx;
			height: 40rpx;
		}
		text{
			font-size: 36rpx;
			margin-left: 120rpx;
			margin-right: 100rpx;
		}
		p{
			color: #6B65EE;
			font-size: 34rpx;
			font-weight: 600;
		}
	}
	.pic{
		width: 100%;
		height: 280rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		image{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-top: 70rpx;
			margin-bottom: 20rpx;
		}
		p{
			font-size: 28rpx;
		}
	}
	.msg{
		width: 90%;
		margin: 20rpx auto;
		ul{
			width: 100%;
			li{
				width: 100%;
				border-bottom: 1px solid #ECECEC;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 26rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				p{
					flex-grow: 1;
				}
				image{
					width: 30rpx;
					height: 30rpx;
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
