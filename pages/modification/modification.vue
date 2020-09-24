<template> <!-- 修改昵称 -->
	<view>
		<div class='kong'></div>
		<div class='title'>
			<image :src="require('../../static/fanhui(3).png')" @click="goBack"></image>
			<text>修改昵称</text>
			<p @click='save'>保存</p>
		</div>
		<div class='xg'>
			<input type="text" value="" placeholder="请输入新的昵称"/>
			<text>支持汉字、数字、英文字母、下划线</text>
		</div>
	</view>
</template>

<script>
	export default({
		data() {
			return {
				id: ''
			}
		},
		onLoad(option) {
			this.id = option.id
		},
		methods: {
			goBack() {
				uni.navigateBack({})
			},
			save() {
				uni.request({
					url: 'http://lvz.maike-docker.com/index.php/api/index/infoEdit',
					method: 'POST',
					data: {
						username: '',
						uid: ''
					},
					success: (res) => {
						console.log(res)
					}
				})
			}
		}
	})
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
	.xg{
		width: 80%;
		margin: 40rpx auto;
		height: 100rpx;
		input{
			width: 100%;
			height: 80%;
			color: black;
			border-bottom: 1px solid #F0F0F0;
		}
		input-placeholder{
			color: #ABA2A2;
		}
		text{
			font-size: 24rpx;
			color: #CCCCCC;
		}
	}
</style>
