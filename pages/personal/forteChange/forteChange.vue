<template>  <!-- 个人优势修改 -->
	<view>
		<div class="status" style='background: white;'></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(3).png')" mode="" @click="goBack"></image>
			<text @click="save">保存</text>
		</div>
		<p class='title'>我的优势</p>
		<textarea 
			class="tit" 
			:value="value" 
			:placeholder="value == '' || value == null? '可以介绍您最擅长的领域' : ''" 
			maxlength='-1' 
			auto-height='true' 
			@input='text' 
		/>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				uid: this.$store.state.uid,
				isClick: true
			}
		},
		onLoad(option) {
			if(option.uid) {
				this.uid = option.uid
			}
			this.$request('/api/index/infoIndex', {
				uid: this.uid
			}).then(res => {
				// console.log(res)
				this.value = res.data.data.info.introduce
			})
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			text(e) {
				// console.log(e.detail.value)
				this.value = e.detail.value
			},
			save() {
				var that = this
				if(that.isClick == false) {return}
				that.isClick = false
				that.$request('/api/index/infoEdit', {
					uid: that.uid,
					"expert[introduce]": that.value
				}).then(res => {
					// console.log(res)
					if(res.data.code == 1) {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'success',
							duration: 1000,
							position: 'bottom',
							back: true
						})
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							duration: 1200,
							position: 'bottom',
							callback: function() {
								that.isClick = true
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.head{
		width: 92%;
		margin: 0 auto;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			width: 40rpx;
			height: 40rpx;
		}
		text{
			font-size: 32rpx;
			color: #4065F0;
		}
	}
	.title{
		font-size: 36rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin-left: 40rpx;
		font-weight: bold;
	}
	.tit{
		width: 88%;
		font-size: 30rpx;
		height: 60rpx;
		text-indent: 40rpx;
		line-height: 60rpx;
		margin-left: 40rpx;
		margin-top: 20rpx;
		border-bottom: 1px solid #EFEFEF;
	}
</style>