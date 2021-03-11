<template>  <!-- 添加苗木信息 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>添加苗木信息</text>
		</div>
		<div class="msg">
			<p>{{ msg.name }}</p>
			<div>
				<text>苗木分类：	{{ msg.type }}</text>
				<text>数量：{{ msg.num }}</text>
			</div>
			<div>
				<text>高度：{{ msg.height }}</text>
				<text>冠幅：{{ msg.crown }}</text>
				<text>胸径：{{ msg.perimeter }}</text>
			</div>
		</div>
		<div class="upload">
			<p>上传苗木照片</p>
			<!-- <div v-for='(item, index) in urlArr' :key='index' class='imgarr'
				:style="{background:'url('+ item +') no-repeat 0 0/100% 100%'}">
			</div> -->
			<image :src="item" mode="" v-for='(item, index) in urlArr' :key='index' class='imgarr'></image>
			<div @click='upload'>
				<text>+</text>
			</div>
		</div>
		<div class="save" @click='save'>保存</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				file_id: '',
				tree_id: '',
				urlArr: [],
				msg: ''
			}
		},
		onLoad(option) {
			this.tree_id = option.tree_id // 苗木id
			this.file_id = option.file_id // 点位id
			this.$request('/api/index/SeedlingInfo', { // 苗木信息
				seedling_id: this.tree_id
			}).then(res => {
				// console.log(res)
				this.msg = res.data.data
			})
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta: 1
				})
			},
			upload() {
				this.$upload('/api/index/upload').then(res => {
					this.urlArr.push(res)
					uni.hideLoading()
				})
			},
			save() {
				if(this.file_id == '' || this.tree_id == '' || this.urlArr == 0) {
					uni.showToast({
						icon: 'none',
						title: '绑定失败'
					})
					return;
				}
				this.$request('/api/Seedling/Seedling_select', {
					file_id: this.file_id,
					seedling_id: this.tree_id,
					imgs: JSON.stringify(this.urlArr)
				}).then(res => {
					// console.log(res)
					if(res.data.code == 1) {
						var that = this
						uni.showToast({
							title: res.data.msg,
							success() {
								setTimeout(function() {
									that.goBack()
								},1000)
							}
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
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
		background-color: #F8F8FB;
	}
	.title{
		width: 100%;
		height: 96rpx;
		background: #5E79F2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		image{
			width: 50rpx;
			height: 50rpx;
			margin-left: 40rpx;
		}
		text{
			font-size: 36rpx;
			font-weight: bold;
			color: white;
			flex-grow: 1;
			text-align: center;
			margin-left: -100rpx;
		}
	}
	.msg{
		width: 100%;
		height: 200rpx;
		background-color: white;
		padding: 40rpx;
		p{
			font-size: 36rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		&>div{
			height: 70rpx;
			line-height: 70rpx;
			text{
				font-size: 30rpx;
				color: #727472;
				margin-right: 50rpx;
			}
		}
	}
	.upload{
		width: 90%;
		height: auto;
		margin: 40rpx auto;
		p{
			font-size: 36rpx;
			margin-bottom: 30rpx;
		}
		&::after{
			content: '';
			height: 0;
			visibility: hidden;
			display: block;
			clear: both;
		}
		.imgarr{
			width: 148rpx;
			height: 148rpx;
			margin-right: 10rpx;
			margin-bottom: 10rpx;
			float: left;
		}
		div{
			width: 148rpx;
			height: 148rpx;
			background: white;
			border: 1px solid #E8E8E8;
			float: left;
			margin-right: 10rpx;
			margin-bottom: 10rpx;
			position: relative;
			text{
				font-size: 80rpx;
				position: absolute;
				left: 34%;
				top: 8%;
			}
		}
	}
	.save{
		width: 100%;
		height: 96rpx;
		font-size: 34rpx;
		background-color: #5C7CF4;
		color: white;
		line-height: 96rpx;
		text-align: center;
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>
