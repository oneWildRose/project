<template> <!-- 修改昵称 -->
	<view>
		<div class='kong'></div>
		<div class='title'>
			<image :src="require('../../static/fanhui(3).png')" @click="goBack"></image>
			<text>修改昵称</text>
			<p @click='save'>保存</p>
		</div>
		<div class='xg'>
			<input type="text" value="" placeholder="请输入新的昵称" maxlength='8' v-model="name"/>
			<text>支持汉字、数字、英文字母、下划线，不超过8个字符</text>
		</div>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default({
		data() {
			return {
				isClick: true,
				name: '',
				auid: ''
			}
		},
		onLoad(option) {
			this.name = option.username
			this.auid = option.id
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			save() {
				if(this.isClick == false) {return}
				this.isClick = false
				var that = this
				if(this.name == '') {
					this.$refs.uToast.show({
						title: '昵称不能为空',
						duration: 1000,
						position: 'bottom',
						callback: function() {
							that.isClick = true
						}
					})
				} else if(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(this.name)) {
					this.$request('/api/index/infoEdit', {
						name: this.name,
						nick: this.name,
						uid: this.auid
					}).then(res => {
						// console.log(res)
						if(res.data.code == 1 ) {
							this.$refs.uToast.show({
								title: res.data.msg,
								duration: 1000,
								position: 'bottom',
								type: 'success',
								back: true
							})
						} else {
							this.$refs.uToast.show({
								title: res.data.msg,
								duration: 1000,
								position: 'bottom',
								type: 'error',
								callback: function() {
									that.isClick = true
								}
							})
						}
					})
				} else {
					this.$refs.uToast.show({
						title: '昵称不符合规范',
						duration: 1000,
						position: 'bottom',
						type: 'error',
						callback: function() {
							that.isClick = true
						}
					})
				}
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
