<template> <!-- 待审批、合格、不合格 详情 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="title">
			<div class="goback">
				<image src="../../../static/fanhui(1).png" mode="" @click="goBack"></image>
				<text>审批</text>
			</div>
		</div>
		<div class="content">
			<div class="tit">
				<text>任务类型：修剪</text>
			</div>
			<div class="msg">
				<ul>
					<li>
						<image :src="require('../../../static/dianwei(2).svg')" mode=""></image>
						<text>点位：绿化A1区02绿化A1</text>
					</li>
					<li>
						<image :src="require('../../../static/miaoshu.svg')" mode=""></image>
						<text>任务描述：绿化A1区02绿化A1区02绿化A1区02</text>
					</li>
					<li>
						<image :src="require('../../../static/riqi.svg')" mode=""></image>
						<text>提交日期：2020-08-06 16:30</text>
					</li>
					<li>
						<image :src="require('../../../static/yuangong.svg')" mode=""></image>
						<text>提交人：张三</text>
					</li>
					<li>
						<text>照片</text>
						<image :src="src" mode="" @click="preview"></image>
					</li>
				</ul>
			</div>
		</div>
		<div class="isagree">
			<div class="option">
				<text>审批意见：</text>
				<radio-group @change="radioChange" v-if="status == 0">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current"/>
						</view>
						<text>{{item.name}}</text>
					</label>
				</radio-group>
				<text v-if="status == 1">合格</text>
				<text v-if="status == 2">不合格</text>
			</div>
			<div class='text'>
				<textarea
					@input="text" 
					:placeholder="placeholder" 
					maxlength="200"
					:disabled='isdisabled'/>
				<text v-if="status == 0">200字以内</text>
			</div>
		</div>
		<button type="default" @click="sub" hover-class='none' v-if="status == 0">确认</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: '',
				src: '../../../static/point.png',
				items: [{
						value: '0',
						name: '合格',
						checked: 'true'
					},
					{
						value: '1',
						name: '不合格',
					},
				],
				current: 0 ,// 0默认合格
				explain: '' ,// 备注内容
				placeholder: '',
				isdisabled: false ,// textarea是否禁用
				
			}
		},
		onLoad(option) {
			// console.log(option)
			this.status = option.status
			if(this.status == 0) {
				this.placeholder = '备注'
				this.isdisabled = false
			} else if(this.status == 1) {
				this.placeholder = '备注:无'
				this.isdisabled = true
			} else {
				this.placeholder = '备注:无'
				this.isdisabled = true
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			preview() {
				uni.previewImage({
					urls: [ this.src ]
				})
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i; // 0代表合格，1代表不合格
						break;
					}
				}
			},
			text(e) { // 备注说明
				console.log(e)
				this.explain = e.target.value // 文本域中的内容
			},
			sub() {
				console.log(this.current, this.explain)
			},
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		background: #F5F6F9;
	}
	.bottom{
		bottom: 400rpx;
	}
	.title{
		width: 100%;
		height: 100rpx;
		background: #5E79F2;
		.goback{
			width: 90%;
			height: 100rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			image{
				width: 50rpx;
				height: 50rpx;
				margin-left: 40rpx;
			}
			text{
				flex-grow: 1;
				text-align: center;
				color: white;
				font-size: 36rpx;
				font-weight: bold;
			}
		}
	}
	.content{
		width: 100%;
		height: 870rpx;
		background: white;
		.tit{
			width: 90%;
			margin: 0 auto;
			height: 108rpx;
			line-height: 108rpx;
			border-bottom: 1px solid #E3E3E3;
			text{
				font-weight: bold;
			}
		}
		.msg{
			width: 90%;
			height: 828rpx;
			margin: 0 auto;
			ul{
				li{
					width: 100%;
					height: 48rpx;
					margin-top: 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					image{
						width: 35rpx;
						height: 35rpx;
						margin-right: 8rpx;
						margin-top: 7rpx;
					}
					text{
						font-size: 30rpx;
						flex-grow: 1;
					}
					&:nth-of-type(2) {
						height: auto;
						text{
							display: block;
							width: 616rpx;
						}
					}
					&:nth-last-of-type(1) {
						height: 452rpx;
						display: block;
						image{
							width: 100%;
							height: 412rpx;
						}
					}
				}
			}
		}
	}
	.isagree{
		width: 100%;
		height: 380rpx;
		background: white;
		margin-top: 20rpx;
		.option{
			width: 90%;
			margin: 0 auto;
			height: 124rpx;
			line-height: 124rpx;
			display: flex;
			text{
				font-size: 36rpx;
				margin-right: 20rpx;
			}
			radio-group{
				display: flex;
				margin-top: -4rpx;
				label{
					height: 124rpx;
					display: flex;
					align-items: center;
					margin-right: 40rpx;
					text{
						display: block;
						margin-top: 6rpx;
					}
				}
			}
		}
		.text{
			width: 90%;
			height: 200rpx;
			margin: 0 auto;
			position: relative;
			textarea{
				width: 95%;
				height: 100%;
				padding: 16rpx;
				border: 1px solid #DDDDDD;
				background: white;
				position: absolute;
			}
			text{
				color: #A4A4A4;
				font-size: 28rpx;
				position: absolute;
				bottom: -16rpx;
				right: 16rpx;
			}
		}
	}
	button{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background: #3F5DE3;
		border: none;
		outline: none;
		border-radius: 0;
		color: white;
		text-align: center;
	}
</style>