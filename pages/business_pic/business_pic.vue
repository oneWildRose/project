<template> <!-- 营业执照 -->
	<view class='hello'>
		<div class="kong"></div>
		<div class='goback'>
			<image src="../../static/fanhui(3).png" mode="" @click="goBack"></image>
			<text @click="save" v-show="btn_bol">保存</text>
		</div>
		<div class='main'>
			<p>
				营业执照
				<text style='font-size:26rpx' v-show="btn_bol">(暂无)</text>
				<text style='font-size:26rpx' v-show="!btn_bol">(已有)</text>
			</p>
			<div class='image'>
				<image :src="src" mode="" @click='upload'></image>
				<text v-if="bol" @click='upload'>+</text>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				bol: true,
				btn_bol: true
			}
		},
		onShow(){
			var that = this
			uni.getStorage({
				key: 'business',
				success(res) {
					// console.log(res)
					that.src = res.data.src
					that.bol = false
					that.btn_bol = false
				}
			})
		},
		methods: {
			upload() {
				if (this.bol == true) {
					uni.chooseImage({
						count: 1, //最多选取一张图片
					    success: (chooseImageRes) => {
					        const tempFilePaths = chooseImageRes.tempFilePaths;
					        uni.uploadFile({
					            url: 'http://lvz.maike-docker.com/index.php/api/index/upload',
					            filePath: tempFilePaths[0],
								name: 'file',
					            formData: {
					                'file': 'test'
					            },
					            success: (uploadFileRes) => {
									this.src = uploadFileRes.data // 上传的图片路径
									this.bol = false
					            }
					        })
					    }
					});
				} else {
					uni.previewImage({
						urls: [ this.src ]
					})
				}
			},
			goBack() {
				uni.navigateTo({
					url: '../information/information?statu=已上传'
				})
			},
			save() {
				var that = this
				if(that.src == '') {
					uni.showModal({
						content: '请上传营业执照'
					})
				} else {
					uni.showModal({
						content: '保存后无法修改,确认保存?',
						success: function(res) {
							if(res.confirm) { // 表示确定
								that.btn_bol = false
								uni.setStorage({
									key: 'business',
									data: {
										src: that.src
									},
									success(res) {
										// console.log(res)
									}
								})
							} else {
								return ;
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.kong{
		width: 100%;
		height: 100rpx;
	}
	.goback{
		width: 90%;
		margin: 0 auto;
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		image{
			width: 48rpx;
			height: 48rpx;
		}
		text{
			color: #5C7CF4;
		}
	}
	.main{
		text-align: center;
		.image{
			width: 450rpx;
			height: 300rpx;
			margin: 40rpx auto;
			position: relative;					
			image{
				width: 100%;
				height: 100%;
				border: 2px solid #F7F7F7;
				background-color: #F2F3F7;
			}
			text{
				width: 100rpx;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				font-size: 100rpx;
				position: absolute;
				left: 50%;
				top: 50%;
				margin-top: -50rpx;
				margin-left: -50rpx;
				color: #BFBFBF;
			}
		}		
	}
</style>
