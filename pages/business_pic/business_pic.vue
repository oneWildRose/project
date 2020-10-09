<template> <!-- 营业执照 -->
	<view class='hello'>
		<div class="kong"></div>
		<div class='goback'>
			<image src="../../static/fanhui(3).png" mode="" @click="goBack"></image>
			<text @click="save" v-show="btn_bol">保存</text>
			<text @click="again" v-show="!btn_bol">重新上传</text>
		</div>
		<div class='main'>
			<p>
				营业执照
				<text style='font-size:26rpx' v-show="btn_bol">(暂无)</text>
				<text style='font-size:26rpx' v-show="!btn_bol">(已有)</text>
			</p>
			<div class='image'>
				<image :src="src" mode="" @click='upload'></image>
				<text v-if="bol" @click='upload'>{{ text }}</text>
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
				btn_bol: true,
				text: '(点击上传)'
			}
		},
		beforeCreate(){
			var that = this
			uni.getStorage({
				key: 'business',
				success(res) {
					// console.log(res)
					that.src = res.data.src
					if(that.src !== '') {
						that.bol = false
						that.btn_bol = false
					} else {}
				}
			})
		},
		methods: {
			upload() {
				if (this.bol == true) {
					uni.chooseImage({
						count: 1, //最多选取一张图片
					    success: (chooseImageRes) => {
							this.text = '上传中...'
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
									uni.showToast({
									    title: '上传成功',
									    duration: 1000
									});
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
				uni.navigateBack({
					delta: 1
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
						content: '确认保存?',
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
			},
			again() {
				var that = this
				uni.showModal({
					content: '确认重新上传?',
					success(res) {
						if(res.confirm) {
							that.src ='',
							uni.setStorage({
								key: 'business',
								data: {
									src: that.src
								},
								success(res) {
									console.log(res)
								}
							})
							that.bol = true,
							that.btn_bol = true							
						} else {
							return ;
						}
					}
				})
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
				width: 150rpx;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				font-size: 30rpx;
				position: absolute;
				left: 50%;
				top: 50%;
				margin-top: -50rpx;
				margin-left: -75rpx;
				color: #878787;
			}
		}		
	}
</style>
