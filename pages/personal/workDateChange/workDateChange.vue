<template> <!-- 从业日期修改 -->
	<view>
		<div class="status" style='background: white;'></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(3).png')" mode="" @click="goBack"></image>
			<text @click="save">保存</text>
		</div>
		<p class='title'>从业日期</p>
		<gpp-date-picker 
			class="date"
			@onCancel="onCancel" 
			@onConfirm="onConfirm2" 
			:startDate="startDate" 
			:endDate="getTime()" 
			:defaultValue="date == null? getTime() : date">
			{{ date == null? getTime() : date }}
		</gpp-date-picker>
		<u-toast ref="uToast" />
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
				startDate: "1900-01-01", //日期选择器 初始日期
				uid: '',
				date: '',
				isClick: true // 控制点击事件是否可以被触发
			}
		},
		onLoad(option) {
			this.uid = option.uid
			this.$request('/api/index/infoIndex', {
				uid: this.uid
			}).then(res => {
				// console.log(res)
				this.date = res.data.data.info.practicedate
			})
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			onCancel(e){// 日期选择器取消按钮
				console.log(e);
			},
			onConfirm2(e){// 确认按钮（修改专家从业日期的）
				this.date = e.dateValue;
			},
			getTime() {
				var date = new Date() // 日期对象
				var year = date.getFullYear() // 年份
				var month = date.getMonth() + 1 // 月份
				var day = date.getDate() // 当天
				return year + '-' + month + '-' + day // 拼接格式：2020-02-02
			},
			save() {
				var that = this
				if(that.isClick == false) {return}
				that.isClick = false // 冻结按钮点击事件，防止用户暴力点击重复触发事件，在所有动作完成后按钮事件恢复正常
				that.$request('/api/index/infoEdit', {
					uid: that.uid,
					"expert[practicedate]": that.date, // 专家从业时间
				}).then(res => {
					// console.log(res)
					if(res.data.code == 1) {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'success',
							duration: 1000,
							position: 'bottom',
							back: true
						})
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							duration: 1200,
							position: 'bottom',
							callback: function() {
								that.isClick = true
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.head{
		width: 92%;
		margin: 0 auto;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			width: 40rpx;
			height: 40rpx;
		}
		text{
			font-size: 32rpx;
			color: #4065F0;
		}
	}
	.title{
		font-size: 36rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin-left: 40rpx;
		font-weight: bold;
	}
	.date{
		width: 90%;
		height: 60rpx;
		line-height: 60rpx;
		margin: 20rpx auto;
		font-size: 32rpx;
		border-bottom: 1px solid #EFEFEF;
	}
</style>