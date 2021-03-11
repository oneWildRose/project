<template> <!-- 专家完善履历 -->
	<view>
		<div class="status" style='background: transparent;'></div>
		<div class='title'>
			<image :src="require('../../../static/10-26/experience.svg')" mode=""></image>
			<text>完善专家履历</text>
		</div>
		<div class="planbar">
			<p class='brg'></p>
			<div class='border'>1</div>
			<p class='brg'></p>
			<div :class='step == 2? "border" : ""'>2</div>
			<p :class='step == 2? "brg" : ""'></p>
		</div>
		<div class="message_list" v-if='step == 1'>  <!-- 第一步，专家基本信息 -->
			<ul>
				<li>
					<text>专家姓名:</text>
					<input type="text" value="" placeholder="请输入真实姓名"/>
				</li>
				<li>
					<text>出生日期:</text>
					<input type="text" value="" placeholder="请选择您的出生日期"/>
				</li>
				<li>
					<text>从业日期:</text>
					<input type="text" value="" placeholder="请选择您的从业日期"/>
				</li>
				<li>
					<text>专家标签:</text>
					<div>
						<div>修剪</div>
						<div>病虫害</div>
						<div>其他</div>
					</div>
				</li>
				<li style='position: relative;height: auto;align-items:flex-start;'>
					<text>自我介绍:</text>
					<textarea value="" placeholder="可以介绍您最擅长的领域" maxlength=200 @input="textChange"/>
					<p>{{ text_num }}/200字</p>
				</li>
				<li style='position: relative;height: auto;'>
					<text>是否匿名:</text>
					<checkbox-group @change='isChange'>
						<label>
							<checkbox class="checkbox" :checked="name_bol"/>
						</label>
					</checkbox-group>
					<div class='warning'>匿名之后，平台将不再展示您的真实姓名</div>
					<div class='triangle'></div>
				</li>
			</ul>
		</div>
		<div class='case' v-if='step == 2'>		<!-- 第二步，专家成功案例上传 -->
			<div class="tit">
				<image :src="require('../../../static/10-26/case.svg')" mode=""></image>
				<text>成功案例上传</text>
			</div>
			<div class='textarea'>
				<textarea @input="textChange_er" value="" placeholder='请输入文字描述,如需上传图片,请点击下方"+"号'/>
				<div class='image'>
					<image :src="src" mode="" @click='upload'></image>
					<text v-if="bol" @click='upload'>+</text>
				</div>
			</div>
		</div>
		<div class="next" @click='next'>
			<text v-if="step == 1">下一步</text>
			<text v-if="step == 2">提交保存</text>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: '', // 自我介绍的内容
				text_num: 0, // 字数
				name_bol: false, // 默认不匿名
				step: 1, // 第几步
				src: '',
				bol: true,
				explain: '',
			};
		},
		onShow() {
			
		},
		methods:{
			textChange(e) {
				this.text = e.target.value
				this.text_num = e.target.value.length
			},
			isChange(e) {
				this.name_bol = !this.name_bol
				console.log(this.name_bol)
			},
			textChange_er(e) {
				// console.log(e)
				this.explain = e.target.value // 文本域中的内容
			},
			upload() {
				this.$upload('/api/index/upload', 1).then(res => {
					this.src = res // 上传的图片路径
					this.bol = false
				})
			},
			next() {
				if(this.step == 1) {
					this.step = 2
				} else {
					uni.setTabBarItem({
						index: 0,
						text: '方案',
						iconPath: '../../../static/fangan.png',
						selectedIconPath: '../../../static/fangan(2).png',
						pagePath: '/pages/ind_specialist/ind_specialist'
					})
					uni.switchTab({
						url: '../../ind_specialist/ind_specialist',
						fail(err) {
							console.log(err)
						}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.title{
		width: 90%;
		margin: 40rpx auto;
		margin-bottom: 0;
		height: 120rpx;
		display: flex;
		align-items: center;
		image{
			width: 82rpx;
			height: 90rpx;
			margin-right: 8rpx;
			margin-top: -10rpx;
		}
		text{
			font-size: 36rpx;
			font-weight: bold;
		}
	}
	.planbar{
		width: 90%;
		margin: 0 auto;
		height: 120rpx;
		display: flex;
		align-items: center;
		p{
			width: 176rpx;
			height: 4rpx;
			background: #CECECE;
		}
		div{
			width: 50rpx;
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
			font-size: 28rpx;
			border-radius: 50%;
			color: #A6A6A6;
			border: 2px solid #A6A6A6;
		}
		.brg{
			background: #6876FF;
		}
		.border{
			border-color: #6876FF;
			color: #6876FF;
		}
	}
	.message_list{
		width: 90%;
		margin: 10px auto;
		height: auto;
		ul{
			width: 100%;
			height: 100%;
			li{
				width: 100%;
				height: 76rpx;
				margin-bottom: 40rpx;
				display: flex;
				align-items: center;
				text{
					font-size: 36rpx;
					margin-right: 40rpx;
				}
				input{
					width: 67%;
					height: 100%;
					background: #EEEEEE;
					border-radius: 8rpx;
					text-indent: 20rpx;
				}
				&>div{
					width: 66%;
					height: 100%;
					display: flex;
					align-items: center;
					div{
						width: auto;
						height: 64rpx;
						line-height: 64rpx;
						background: #A6A6A6;
						color: white;
						border-radius: 36rpx;
						padding: 0 20rpx 0 20rpx;
						margin-right: 20rpx;
					}
				}
				textarea{
					width: 67%;
					height: 188rpx;
					background: #EEEEEE;
					text-indent: 0rpx;
					border-radius: 8rpx;
					font-size: 30rpx;
					padding-top: 16rpx;
					padding-left: 16rpx;
				}
				p{
					color: #A6A6A6;
					font-size: 28rpx;
					position: absolute;
					right: 50rpx;
					bottom: 10rpx;
				}
				.warning{
					width: 100%;
					height: 92rpx;
					font-size: 30rpx;
					line-height: 92rpx;
					text-align: center;
					background: #F8F8FF;
					color: #7B7F90;
					text-indent: 30rpx;
					position: absolute;
					bottom: -110rpx;
					left: 0;
				}
				.triangle{
					width: 0;
					height: 0;
					border-top: 20rpx solid transparent;
					border-right: 16rpx solid transparent;
					border-bottom: 20rpx solid #F8F8FF;
					border-left: 16rpx solid transparent;
					position: absolute;
					bottom: -20rpx;
					left: 30rpx;
				}
			}
		}
	}
	.case{
		width: 90%;
		height: 530rpx;
		margin: 0 auto;
		.tit{
			width: 100%;
			height: 84rpx;
			display: flex;
			align-items: center;
			image{
				width: 40rpx;
				height: 40rpx;
				margin-right: 12rpx;
			}
		}
		.textarea{
			width: 100%;
			height: 440rpx;
			textarea{
				width: 100%;
				height: 100%;
				border: 1px solid #D7D7D7;
				padding: 12rpx;
				text-indent: 20rpx;
			}
			.image{
				width: 108rpx;
				height: 108rpx;
				position: relative;	
				bottom: 130rpx;
				left: 16rpx;
				image{
					width: 100%;
					height: 100%;
					border: 2px solid #F7F7F7;
					background-color: #F2F3F7;
				}
				text{
					font-size: 100rpx;
					position: absolute;
					bottom: -18%;
					left: 26%;
					color: #7587A2;
				}
			}
		}
	}
	.next{
		width: 90%;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		background: #5D6CFF;
		color: white;
		position: fixed;
		bottom: 40rpx;
		left: 5%;
		border-radius: 8rpx;
	}
</style>
