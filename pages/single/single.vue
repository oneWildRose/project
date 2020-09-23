<template> <!-- 上传单个苗木信息 -->
	<view class="hello">
		<div class='goback'>
			<image :src="require('../../static/fanhui(1).png')" mode="" @click='goBack'></image>
			<div>
				<text>上传项目苗木清单</text>
			</div>
		</div>
		<div class='main'>
			<div>
				<p>项目名称</p>
				<input type="text" value="融创项目一期" />
			</div>
			<div>
				<p>苗木名称</p>
				<input type="text" value="" />
			</div>
			<div>
				<p>苗木数量</p>
				<input type="text" value="" />
				<input type="text" value="" class='dw' />
			</div>
			<div>
				<p>位置描述</p>
				<input type="text" value="" />
			</div>
			<div>
				<p>添加图片</p>
				<div class='image'>
					<image :src="this.src" mode="" @click='upload'></image>
					<text v-if="bol" @click='upload'>+</text>
				</div>
			</div>
			<button class="btn">上传</button>
		</div>
	</view>
</template>

<script>
	
	export default {
		components:{
			
		},
		data() {
			return {
				src: '',
				bol: true
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({})
			},
			upload() {
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: '',
				            filePath: tempFilePaths[0],
				            formData: {
				                'file': 'test'
				            },
				            success: (uploadFileRes) => {
				                console.log(uploadFileRes.data);
								this.src = uploadFileRes.data
								
				            }
				        });
				    }
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.hello{
		width: 100%;
		height: 100%;
		background: url(../../static/brg.jpg) no-repeat;
		background-size: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		.goback{
			padding-left: 40rpx;
			padding-right: 40rpx;
			background: transparent;
			width: 90%;
			height: 320rpx;
			line-height: 120rpx;
			margin: 0px auto;
			text-align: center;
			position: relative;
			color: white;
			font-size: 36rpx;
			&>image{
				width: 52rpx;
				height: 52rpx;
				position: absolute;
				left: 40rpx;
				top: 50%;
				margin-top: -120rpx;
			}
			div{
				width: 400rpx;
				height: 80rpx;
				line-height: 80rpx;
				position: absolute;
				left: 40rpx;
				top: 42%;
				font-weight: 600;
				font-size: 38rpx;
				display: flex;
				align-items: center;
			}
		}
	}
	.main{
		width: 100%;
		height: 82%;
		background: white;
		border-radius: 30rpx;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		position: absolute;
		top: 280rpx;
		div{
			width: 90%;
			height: 76rpx;
			line-height: 76rpx;
			margin: 40rpx auto;
			font-size: 34rpx;
			display: flex;
			justify-content: space-between;
			input{
				width: 70%;
				height: 72rpx;
				border: 1px solid #D5D5D5;				
				text-indent: 20rpx;
			}
			&:nth-of-type(3) {
				input{
					width: 44%;
				}
				.dw{
					width: 20%;
				}
			}
			&:nth-of-type(5) {
				height: 230rpx;
				p{
					width: 41%;
				}
				.image{
					width: 100%;
					position: relative;					
					image{
						width: 44%;
						height: 200rpx;
						border: 2px solid #F7F7F7;
						background-color: #F2F3F7;
					}
					text{
						font-size: 100rpx;
						position: absolute;
						left: 15%;
						top: 76%;
						color: #BFBFBF;
					}
				}
			}
			p{
				text-indent: 20rpx;
			}
		}
		.btn{
			width: 70%;
			height: 80rpx;
			line-height: 80rpx;
			background: #5C7CF4;
			color: white;
			border-radius: 40rpx;
			position: absolute;
			bottom: 60rpx;
			left: 50%;
			margin-left: -250rpx;
		}
	}
</style>
