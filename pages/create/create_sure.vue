<template> <!-- 创建项目（第二步） -->
	<view>
		<div class='goback' @click='goBack'>
			<image src="../../static/fanhui.png" mode=""></image>
		</div>
		<div class='text'>
			<p>创建项目</p>
			<text>填写项目的完整信息</text>
		</div>
		<div class='step'> <!-- 步骤条 -->
			<!-- 圆 -->
			<div class='cir'>
				<div>
					
				</div>
				<div>
					<text>确认信息</text>
				</div>
				<div></div>
			</div>
			<!-- 线 -->
			<div class=wire>
				<div></div>
				<div></div>
			</div>
		</div>
		<div class="message">
			<p>项目平面图</p>
			<upload-img
				class="image"
				bgsrc="../../static/zanwu.jpg"
				@chooseimg="handleChooseImg" style="margin: 0 auto; width: 580rpx; height: 320rpx;">
			</upload-img>
			
		</div>
		<navigator class="next" url='./success'>
			<button type="default">提交</button>
		</navigator>
	</view>
</template>

<script>
	import uploadImg from '../../components/amazarashi-uploadimg/uploadImg.vue'
	export default {
		components: {
			uploadImg
		},
		data() {
			return {
				src: ''
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({})
			},
			handleChooseImg(e){
				console.log('imageSrc:',e);
			}
		},
		onLoad() {
			console.log(Uploader)
		}
	}
</script>

<style lang="less">
	.goback{
		width: 92%;
		margin: 10px auto;
		image{
			width: 26px;
			height: 26px;
		}
	}
	.text{
		width: 92%;
		margin: 0 auto;
		p{
			font-weight: bold;
		}
		text{
			font-size: 14px;
			color: #8C8484;
		}
	}
	.step{
		width: 80%;
		height: 40px;
		// border: 1px solid red;
		margin: 10px auto;
		position: relative;
		.cir{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			div{
				width: 24px;
				height: 24px;
				border-radius: 50%;
				border: .5px solid #D9D9D9;	
				background: white;
				position: relative;
				&:nth-of-type(1){
					background: url(../../static/wancheng.svg) no-repeat;
					background-size: 116%;
					background-position: -2px -2px;
					border: none;
				}
				&:nth-of-type(2){
					background: url(../../static/wancheng.svg) no-repeat;
					background-size: 116%;
					background-position: -2px -2px;
					border: none;
				}
				text{
					position: absolute;
					left: -150%;
					bottom: -100%;
					width: 100px;
					text-align: center;
					font-size: 12px;
				}
			}
		}
		.wire{
			width: 59.5%;
			margin: -6.5% auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			div{
				width: 43%;
				border: 1px solid #D9D9D9;
				&:nth-of-type(1){
					width: 42%;
					border: 1px solid #E3803A;
				}
			}
		}
	}
	.message{
		width: 80%;
		height: 480rpx;
		box-shadow: #D2D2D2 1px 2px 4px 2px;
		border-radius: 6px;
		background: white;
		margin: 50px auto;
		padding: 20px 10px;
		font-size: 18px;
		color: #868686;
		p{
			height: 60rpx;
		}
		.upload-img.image{
			border: 2px solid #F7F7F7;
		}
	}
	uni-button[type=default]{ /* .next 元素 */
		width: 80%;
		height: 84rpx;
		text-align: center;
		line-height: 84rpx;
		background: #3F5DE3 !important;
		border: none;
		outline: none;
		border-radius: 60rpx;
		color: white;
		position: absolute;
		bottom: 130rpx;
		left: 50%;
		margin-left: -290rpx;
	}
</style>
