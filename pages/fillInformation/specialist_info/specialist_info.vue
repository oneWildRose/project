<template> <!-- 专家完善履历 -->
	<view>
		<div class="status" style='background: #5D6CFF;'></div>
		<div class='title'>完善履历</div>
		<ul class='main'>
			<li>
				<text>从业日期:</text>
				<div>
					<gpp-date-picker class='timechoose' @onCancel="onCancel" @onConfirm="onConfirm" :startDate="'1990-01-01'" :endDate="getTime(100)" :defaultValue="getTime(0)">
						<div class='time'>{{ time == ''? '请选择您的从业日期' : time }}</div>
					</gpp-date-picker>
					<image :src="require('../../../static/jinru.svg')" mode=""></image>
				</div>
			</li>
			<li @click='goChooseTag'>
				<text>专家标签:</text>
				<div class='tag'>
					<p v-if='msg.tags == ""'>选择标签</p>
					<div v-if='msg.tags != ""' v-for='(item, index) in msg.tags' :key='index'>
						{{ item }}
					</div>
					<image :src="require('../../../static/jinru.svg')" mode=""></image>
				</div>
			</li>
			<li class='self'>
				<div>
					<text>个人优势:</text>
					<image :src="require('../../../static/bianji.svg')" mode="" @click="goForte"></image>
				</div>
				<input type="text" value="" :placeholder="introduce == ''||introduce == null? '可以介绍您最擅长的领域':introduce" disabled @click="goForte"/>
			</li>
			<li class='case'>
				<div>
					<text>项目经历</text>
					<image :src="require('../../../static/tianjia.svg')" mode="" @click="goSuccessCase"></image>
				</div>
				<ul>
					<li v-for='(item, index) in msg.record' :key='index'>
						<div @click="goExperience(2, item.id)">
							<p>项目名称：</p>
							<text>{{ item.project_name }}</text>
							<image :src="require('../../../static/jinru.svg')" mode=""></image>
						</div>
						<div>
							<p>担任角色：</p>
							<text>{{ item.role }}</text>
						</div>
						<div style='min-height: 80rpx; height: auto;'>
							<p>项目描述：
								<text style="margin-left: 5rpx;">{{ item.details == ''? '暂无' : item.details }}</text>
							</p>
						</div>
						<div>
							<p>案例图片：</p>
							<image v-for="(item1, index) in JSON.parse(item.images)"
								:style="{background:'url('+ item1 +') no-repeat 0 0/100% 100%'}"></image>
						</div>
					</li>
				</ul>
			</li>
			<li class='name'>
				<text>是否匿名:</text>
				<checkbox-group @change='isChange'>
					<label> <!-- 样式改变在 APP.vue -->
						<checkbox class="checkbox" :checked="name_bol"/>
					</label>
				</checkbox-group>
				<div class='warning'>匿名之后，平台将不再展示您的真实姓名</div>
			</li>
			<li class='area'>
				<text>擅长区域:</text>
				<radio-group @change="radioChange">
					<label class="radio"><radio value="1" checked="true" />全部</label>
					<label class="radio"><radio value="2" />南方</label>
					<label class="radio"><radio value="3" />北方</label>
				</radio-group>
			</li>
		</ul>
		<div class="next" @click='next'>提交保存</div>
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
				uid: this.$store.state.uid,
				time: '',
				name_bol: false, // 默认不匿名
				arr_class: ['green','cyan','purple','green','cyan','purple','green','cyan','purple','green'],
				msg: '',
				introduce: '',
				goodAtarea: 1
			};
		},
		onShow() {
			this.$request('/api/index/infoIndex', {
				uid: this.uid
			}).then(res => {
				this.msg = res.data.data
				if(this.msg.info) {
					this.introduce = this.msg.info.introduce
				}
			})
			var that = this
			uni.getStorage({ // 从业时间
				key: 'time',
				success(res) {
					that.time = res.data.time
				}
			})
		},
		methods:{
			isChange(e) {
				this.name_bol = !this.name_bol
				// console.log(this.name_bol)
			},
			onCancel(e){
				console.log(e);
			},
			onConfirm(e){
				var that = this
				this.time = e.dateValue
				uni.setStorage({
					key: 'time',
					data: {
						time: that.time
					}
				})
			},
			getTime(addyear) {
				var data = new Date() // 日期对象
				var year = data.getFullYear() + addyear// 年份
				var month = data.getMonth() + 1 // 月份
				var day = data.getDate() // 当天
				return year + '-' + month + '-' + day // 拼接格式：2020-02-02
			},
			goChooseTag() { // 专家标签
				// uni.navigateTo({
				// 	url: '../chooseTag/chooseTag'
				// })
				uni.navigateTo({
					url: '../../personal/tagChange/tagChange'
				})
			},
			goForte() { // 个人优势
				// uni.navigateTo({
				// 	url: '../forte/forte'
				// })
				uni.navigateTo({
					url: '../../personal/forteChange/forteChange'
				})
			},
			goSuccessCase() { // 成功案例
				uni.navigateTo({
					url: '../../personal/experience/experience?dir=0' + '&uid=' + this.uid
				})
			},
			goExperience(num, id) { // 项目经历
				uni.navigateTo({
					url: '../../personal/experience/experience?uid=' + this.uid + '&dir=' + num + '&id=' + id
				})
			},
			radioChange(e) {
				// console.log(e.target.value)
				this.goodAtarea = e.target.value
			},
			next() {
				// 提交 从业日期、是否匿名
				this.$request('/api/expertresume/addlvli_zong', {
					practicedate: this.time,
					isAnonymity: this.name_bol == true? 1 : 0,
					isarea: this.goodAtarea,
					uid: this.uid
				}).then(res => {
					// console.log(res)
					if(res.data.code == 1) {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'success',
							duration: 1000,
							position: 'bottom',
							isTab: true,
							callback: function() {
								uni.removeStorage({key: 'time'});
								uni.setTabBarItem({
									index: 0,
									text: '方案',
									iconPath: '../../../static/fangan.png',
									selectedIconPath: '../../../static/fangan(2).png',
									pagePath: '/pages/ind_specialist/ind_specialist'
								})
								uni.switchTab({
									url: '../../ind_specialist/ind_specialist'
								})
							}
						})
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							duration: 1200,
							position: 'bottom'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.title{
		width: 100%;
		margin-bottom: 0;
		height: 88rpx;
		line-height: 88rpx;
		background: #5D6CFF;
		text-align: center;
		color: white;
		font-size: 36rpx;
		font-weight: bold;
	}
	.main{
		width: 90%;
		margin: 10px auto;
		height: auto;
		&>li{
			width: 100%;
			height: 100rpx;
			border-bottom: 1px solid #EFEFEF;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&>div{
				display: flex;
				align-items: center;
			}
			image{
				width: 30rpx;
				height: 30rpx;
			}
			text{
				font-size: 30rpx;
			}
			.tag{
				display: flex;
				align-items: center;
				&>div{
					padding: 6rpx 16rpx 6rpx 16rpx;
					border-radius: 30rpx;
					margin-right: 8rpx;
					&:nth-of-type(1){
						background: #00CC1E;
						color: white;
					}
					&:nth-of-type(2){
						background: #4CD9C0;
						color: white;
					}
					&:nth-of-type(3){
						background: #A4ADFF;
						color: white;
					}
					&:nth-of-type(4){
						background: #00CC1E;
						color: white;
					}
				}
			}
		}
		.self{
			height: 140rpx;
			display: inherit;
			&>div{
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				image{
					width: 40rpx;
					height: 40rpx;
				}
			}
			input{
				width: 100%;
				height: 50rpx;
				font-size: 14px;
			}
		}
		.case{
			height: auto;
			display: inherit;
			&>div:nth-of-type(1){
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&>image{
					width: 42rpx;
					height: 42rpx;
				}
			}
			ul{
				width: 100%;
				height: auto;
				li{
					width: 100%;
					height: auto;
					display: block;
					border-bottom: none;
					&>div{
						width: 100%;
						height: 80rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						text{
							flex-grow: 100;
							text-align: left;
							font-size: 30rpx;
						}
						&:nth-last-of-type(1){
							// margin-top: 14rpx;
							display: block;
							height: auto;
							&::after{
								content: '';
								clear: both;
								height: 0;
								display: block;
								visibility: hidden;
							}
							image{
								width: 148rpx;
								height: 148rpx;
								float: left;
								margin-right: 20rpx;
								margin-bottom: 10rpx;
								margin-top: 10rpx;
							}
						}
					}
				}
			}
		}
		.name{
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: inherit;
			// margin-bottom: 140rpx;
			.warning{
				font-size: 24rpx;
				color: #B9B9B9;
			}
		}
		.area{
			border: none;
			justify-content: flex-start;
			.radio{
				margin-left: 30rpx;
			}
		}
	}
	.next{
		width: 94%;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		font-size: 34rpx;
		background: #5D6CFF;
		color: white;
		position: fixed;
		bottom: 20rpx;
		left: 3%;
		border-radius: 8rpx;
	}
</style>
