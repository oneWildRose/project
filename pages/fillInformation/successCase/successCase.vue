<template>  <!-- 成功案例 -->
	<view>
		<div class="status" style='background: white;'></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(3).png')" mode="" @click="goBack"></image>
			<text @click="save">保存</text>
		</div>
		<p class='title'>我的成功案例</p>
		<p class='tit'>上传展示您优势的方案作品</p>
		<div class="upload">
			<p>图片上传：</p>
			<div v-for='(item, index) in urlArr' :key='index' class='imgarr'
				:style="{background:'url('+ item +') no-repeat 0 0/100% 100%'}">
			</div>
			<div @click='upload' class='upload'>
				<text v-if='bol'>+</text>
			</div>
		</div>
		<div class="text">
			<p>描述说明：</p>
			<textarea value="" placeholder="" maxlength='-1' auto-height='true' @input='text' />
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				urlArr: [],
				bol: true
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			text(e) {
				// console.log(e.detail.value)
				this.value = e.detail.value
			},
			upload() {
				this.$upload('/api/index/upload').then(res => {
					this.urlArr.push(res)
					uni.hideLoading()
				})
			},
			save() {
				uni.setStorage({ // 存入缓存
					key: 'case',
					data: {
						urlArr: this.urlArr,
						value: this.value
					},
					success() {
						uni.navigateTo({
							url: '../specialist_info/specialist_info'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.head{
		width: 94%;
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
			color: #298DF8;
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
		font-size: 30rpx;
		color: #828382;
		height: 60rpx;
		line-height: 60rpx;
		margin-left: 40rpx;
		margin-bottom: 20rpx;
	}
	.upload{
		width: 90%;
		margin: 20rpx auto;
		p{
			height: 80rpx;
			line-height: 80rpx;
		}
		&::after{
			content: '';
			height: 0;
			clear: both;
			visibility: hidden;
			display: block;
		}
		&>div{
			width: 160rpx;
			height: 160rpx;
			float: left;
			margin-right: 20rpx;
		}
		.upload{
			line-height: 148rpx;
			text-align: center;
			font-size: 80rpx;
			border: 1px dashed #CACACA;
		}
		.imgarr{
			width: 160rpx;
			height: 160rpx;
			margin-top: 20rpx;
		}
	}
	.text{
		width: 90%;
		margin: 40rpx auto;
		textarea{
			margin-top: 20rpx;
			border-bottom: 1px solid #E8E8E8;
			text-indent: 30rpx;
			width: 100%;
		}
	}
</style>
