<template> <!-- 创建项目（第三步提交） -->
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
					
				</div>
				<div>
					<text>创建成功</text>
				</div>
			</div>
			<!-- 线 -->
			<div class=wire>
				<div></div>
				<div></div>
			</div>
		</div>
		<div class='success'>
			<image src="../../static/success.svg" mode=""></image>
			<p>项目创建成功</p>
		</div>
		<div class="next" @click='goTab'>
			<button type="default">返回</button>
		</div>
	</view>
</template>

<script>
	
	export default {
		components: {
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goTab() {
				uni.switchTab({
					url: '../ind/ind'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
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
				
					background: url(../../static/wancheng.svg) no-repeat;
					background-size: 116%;
					background-position: -2px -2px;
					border: none;
				
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
				border: 1px solid #E3803A;
				&:nth-of-type(1){
					width: 42%;
				}
			}
		}
	}
	.success{
		width: 100%;
		text-align: center;
		image{		
			width: 150px;
			height: 150px;
			margin-top: 30px;
			
		}
		p{
			font-size: 15px;
			margin-bottom: 40px;
		}
	}
	uni-button[type=default]{ /* .next 元素 */
		width: 80%;
		height: 42px;
		text-align: center;
		line-height: 42px;
		background: #3F5DE3 !important;
		border: none;
		outline: none;
		border-radius: 30px;
		margin: 10px auto;
		color: white;
	}
</style>
