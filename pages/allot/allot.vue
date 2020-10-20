<template> <!-- 分配任务 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="title">
			<div class="goback">
				<image src="../../static/fanhui(1).png" mode="" @click="goBack"></image>
				<text>分配任务</text>
			</div>
		</div>
		<div class="content">
			<div class="tit">
				<text>任务类型：修剪</text>
			</div>
			<div class="msg">
				<ul>
					<li>
						<image :src="require('../../static/dianwei(2).svg')" mode=""></image>
						<text>点位：绿化A1区02绿化A1</text>
					</li>
					<li>
						<image :src="require('../../static/miaoshu.svg')" mode=""></image>
						<text>任务描述：绿化A1区02绿化A1区02绿化A1区02</text>
					</li>
					<li>
						<image :src="require('../../static/riqi.svg')" mode=""></image>
						<text>提交日期：2020-08-06 16:30</text>
					</li>
					<li>
						<image :src="require('../../static/yuangong.svg')" mode=""></image>
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
			<p>分配员工</p>
			<div>
				<picker @change="change_worker" class='change' :value="index_worker" :range="list_worker" v-if="status == 0? true : false">
					<label class="" v-if="!bol_worker" style='color:#9D9DA0'>请选择工人</label>
					<label class="" v-if="bol_worker">{{list_worker[index_worker]}}</label>
					<image src="../../static/xiala.svg" mode=""></image>
				</picker>
				<text v-else>...</text>
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
				src: '../../static/point.png',
				worker: '', // 工人
				bol_worker: false,
				index_worker: 0,
				list_worker: ['刘备', '关羽', '张飞'],
				
			}
		},
		onLoad(option) {
			// console.log(option)
			this.status = option.status
			
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
			change_worker(e) {
				this.index_worker = e.target.value
				this.worker = this.list_worker[this.index_worker] // 工人
				this.bol_worker = true
			},
			sub() {
				console.log(this.worker)
			},
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
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
		height: 300rpx;
		background: white;
		margin-top: 20rpx;
		p{
			width: 90%;
			margin: 0 auto;
			height: 120rpx;
			line-height: 120rpx;
			text-align: left;
			font-size: 32rpx;
			font-weight: bold;
		}
		div{
			width: 90%;
			height: 92rpx;
			margin: 0 auto;
			.change{
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				text-indent: 20rpx;
				border: 1px solid #DFDFDF;
				image{
					width: 40rpx;
					height: 40rpx;
					margin-right: 40rpx;
				}
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
		position: fixed;
		bottom: 0;
	}
</style>