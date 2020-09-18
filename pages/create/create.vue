<template> <!-- 创建项目 -->
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
					<text>填写项目信息</text>
				</div>
				<div></div>
				<div></div>
			</div>
			<!-- 线 -->
			<div class=wire>
				<div></div>
				<div></div>
			</div>
		</div>
		<div class="message">
			<input type="text" placeholder="企业名称" />
			<input type="text" placeholder="项目名称" />
			
			<div class='city'>
				<text>项目地址</text>
				<div>
					<w-picker
						 :visible.sync="visible"
						 mode="region"
						 :value="list.value"
						 default-type="value"
						 :hide-area="false"
						 @confirm="onConfirm($event,'region')"
						 @cancel="onCancel"
						 ref="region" 
					 ></w-picker>
				</div>
			</div>
			
			
			
			<input type="text" placeholder='详细地址'>
			<input type="text" placeholder='负责人'>
			<input type="text" placeholder='项目进场时间'>
		</div>
		<navigator class="next" url='./create_sure'>
			<button type="default">下一步</button>
		</navigator>
		<text class='resetting'>重置</text>
	</view>
</template>

<script>
	import areaData from '../../area-data-min'
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				list: areaData
			}
		},
		onReady () {
		  
		},
		methods: {
			goBack() {
				uni.navigateBack({})
			},
			visible() {
				return false;
			}
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
				}
			}
		}
	}
	.message{
		width: 80%;
		height: 400px;
		box-shadow: #D2D2D2 1px 2px 4px 2px;
		border-radius: 6px;
		background: white;
		margin: 50px auto;
		padding: 20px 10px;
		input{
			width: 90%;
			height: 42px;
			line-height: 42px;
			text-align: left;
			text-indent: 20px;
			color: #86868A;
			background: #F6F8FF;
			margin: 20px auto;
			border-radius: 20px;
			font-size: 16px;
		}
		.city{
			width: 90%;
			height: 42px;
			font-size: 16px;
			line-height: 42px;
			text-align: left;
			margin: 16px auto;
			// border: 1px solid red;
			display: flex;
			justify-content: space-around;
			align-items: center;
			div{
				width: 200px;
				height: 42px;
				background: #F6F8FF;
				color: #86888E;
				border-radius: 40px;
			}
			.choose{
				width: 200px;
				height: 42px;
				line-height: 42px;
				margin-right: 0px;
				margin-top: -5px;
				background: black;
			}
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
	.resetting{
		display: block;
		margin-top: 20px;
		width: 100%;
		text-align: center;
		font-size: 14px;
	}
</style>
