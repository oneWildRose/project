<template> <!-- 发布任务（乙方管理） -->
	<view>
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../static/fanhui(1).png')" @click="goBack" mode=""></image>
			<p>发布任务</p>
		</div>
		<div class="list">
			<ul>
				<li>
					<p>任务类型:</p>
					<picker @change="change_type" class='change' :value="index_type" :range="list_type">
						<label class="" v-if="!bol_type" style='color:#9D9DA0'>请选择任务类型</label>
						<label class="" v-if="bol_type">{{list_type[index_type]}}</label>
						<image src="../../static/xiala.svg" mode=""></image>
					</picker>
				</li>
				<li>
					<p>点位:</p>
					<picker @change="change_point" class='change' :value="index_point" :range="list_point">
						<label class="" v-if="!bol_point" style='color:#9D9DA0'>请选择点位</label>
						<label class="" v-if="bol_point">{{list_point[index_point]}}</label>
						<image src="../../static/xiala.svg" mode=""></image>
					</picker>
				</li>
				<li>
					<p>工人:</p>
					<picker @change="change_worker" class='change' :value="index_worker" :range="list_worker">
						<label class="" v-if="!bol_worker" style='color:#9D9DA0'>请选择工人</label>
						<label class="" v-if="bol_worker">{{list_worker[index_worker]}}</label>
						<image src="../../static/xiala.svg" mode=""></image>
					</picker>
				</li>
				<li>
					<p>限制完成时间:</p>
					<e-picker :class="time == ''? 'change color' : 'change'" @change="change" :showValue="time" mode='dateTime'>
						{{ time || '请选择完成时间' }}
						<image src="../../static/xiala.svg" mode=""></image>
					</e-picker>
				</li>
				<li>
					<p>备注说明:</p>
					<textarea value="" @input="text" placeholder='请输入文字描述,如需上传图片,请点击下方"+"号' />
					<div class='image'>
						<image :src="src" mode="" @click='upload'></image>
						<text v-if="bol" @click='upload'>+</text>
					</div>
				</li>
			</ul>
		</div>
		<button type="default" class="sub" @click="sub">发布</button>
	</view>	
</template>

<script>
	import gppDatePicker from "@/components/gpp-datePicker/gpp-datePicker.vue"
	export default {
		components: {
			gppDatePicker
		},
		data() {
			return {
				type: '', // 任务类型
				bol_type: false,
				index_type: 0,
				list_type: ['浇水', '施肥', '修剪'],
				
				point: '', // 点位
				bol_point: false,
				index_point: 0,
				list_point: ['北门正门口01', '北门正门口02', '北门正门口03'],
				
				worker: '', // 工人
				bol_worker: false,
				index_worker: 0,
				list_worker: ['刘备', '关羽', '张飞'],
				
				time: '', // 完成时间
				bol_time: true,
				
				explain: '', // 备注说明
				bol: true,
				src: ''
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			change(e) {
				this.time = e
			},
			change_type(e) {
				this.index_type = e.target.value
				this.type = this.list_type[this.index_type] // 任务类型
				this.bol_type = true
			},
			change_point(e) {
				this.index_point = e.target.value
				this.point = this.list_point[this.index_point] // 点位
				this.bol_point = true
			},
			change_worker(e) {
				this.index_worker = e.target.value
				this.worker = this.list_worker[this.index_worker] // 工人
				this.bol_worker = true
			},
			onCancel(e){
				console.log(e);
			},
			onConfirm(e){ // 完成时间
				this.time = e.dateValue;
				this.bol_time = false
			},
			text(e) { // 备注说明
				console.log(e)
				this.explain = e.target.value // 文本域中的内容
			},
			upload() {
				this.$upload('/api/index/upload').then(res => {
					this.src = res
					this.bol = false
					uni.hideLoading()
				})
			},
			sub() {
				console.log(this.type, this.point, this.worker, this.time, this.explain)
			}
		} 
	}
</script>

<style lang="less" scoped>
	.status{
		background: #5E79F2;
		height: var(--status-bar-height);
	}
	.title{
		width: 100%;
		height: 120rpx;
		line-height: 120rpx;
		background: #5E79F2;
		text-align: center;
		position: relative;
		image{
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			left: 40rpx;
			top: 50%;
			margin-top: -20rpx;
		}
		p{
			color: white;
		}
	}
	.list{
		width: 100%;
		height: auto;
		ul{
			width: 92%;
			height: auto;
			margin: 40rpx auto;
			li{
				width: 100%;
				height: 130rpx;
				margin-bottom: 60rpx;
				position: relative;
				border-bottom: 1px solid #DDDDDD;
				display: flex;
				flex-direction: column;
				p{
					font-weight: bold;
					margin-bottom: 8rpx;
				}
				.change{
					height: 100%;
					text-indent: 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					image{
						width: 30rpx;
						height: 30rpx;
						margin-right: 20rpx;
					}
				}
				.color{
					color: #9D9DA0;
				}
				&:nth-last-of-type(1){
					height: auto;
					border: none;
					width: 100%;
					height: 400rpx;
					position: relative;
					textarea{
						margin-top: 20rpx;
						padding: 16rpx;
						width: 94%;
						height: 300rpx;
						border: 1px solid #DDDDDD;
					}
					.image{
						width: 100rpx;
						height: 100rpx;
						position: relative;	
						bottom: 116rpx;
						left: 16rpx;
						image{
							width: 100%;
							height: 100%;
							border: 2px solid #F7F7F7;
							background-color: #F2F3F7;
						}
						text{
							font-size: 60rpx;
							position: absolute;
							left: 36%;
							top: 10%;
							color: #7587A2;
						}
					}
				}
			}
		}
	}
	.sub{
		width: 100%;
		height: 96rpx;
		line-height: 96rpx;
		background: #3F5DE3;
		color: white;
		text-align: center;
		border: none;
		outline: none;
		position: fixed;
		bottom: 0;
		left: 0;
		border-radius: 0;
	}
</style>
