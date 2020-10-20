<template>  <!-- 乙方完善信息 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../static/brg.png')" mode=""></image>
			<div>
				<p>完善企业信息</p>
				<text>填写公司的详细信息</text>
			</div>
		</div>
		<div class="fillMsg">
			<ul>
				<li>
					<text>公司名称</text>
					<input type="text" value="" placeholder="请输入公司名称" v-model="pname"/>
				</li>
				<li>
					<text>成立时间</text>
					<gpp-date-picker class='timechoose' @onCancel="onCancel" @onConfirm="onConfirm" :startDate="'1950-01-01'" :endDate="getTime()" :defaultValue="getTime()">
						<text v-if="time_bol" style='color:#86888E'>请选择公司成立时间</text>
						<div class='time'>{{ time }}</div>
					</gpp-date-picker>
				</li>
				<li>
					<text>公司地址</text>
					<div class="city_tab">
						<picker @change="bindPickerChange" :value="index" :range="province"  :range-key="'shortname'">
							<label v-if='bol' style='color:#86888E'>请选择</label>
							<label v-if='bol_'>{{province[index].shortname}}</label>
							<image :src="require('../../static/xuanze.svg')" mode=""></image>	
						</picker>
					</div>
					<div class="city_tab">
						<picker @change="bindPickerChange1" :value="index1" :range="city" :range-key="'shortname'">
							<label v-if='bol1' style='color:#86888E'>请选择</label>
							<label v-if='bol_1' :class="city[index1].shortname.length == 5? 'size' : ''">{{city[index1].shortname}}</label>
							<image :src="require('../../static/xuanze.svg')" mode=""></image>
						</picker>
					</div>
					<div class="city_tab">
						<picker @change="bindPickerChange2" :value="index2" :range="area" :range-key="'shortname'">
							<label v-if='bol2' style='color:#86888E'>请选择</label>
							<label v-if='bol_2' :class="area[index2].shortname.length == 5? 'size' : ''">{{area[index2].shortname}}</label>
							<image :src="require('../../static/xuanze.svg')" mode=""></image>
						</picker>
					</div>
				</li>
				<li>
					<text>详细地址</text>
					<input type="text" value="" placeholder="请输入详细地址" v-model="address"/>
				</li>
				<li>
					<text>项目数</text>
					<input type="text" value="" placeholder="请输入服务过的项目总数" v-model="sum"/>
				</li>
			</ul>
		</div>
		<button type="default" hover-class="none" @click="save">保存</button>
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
				auid: '',
				time: '',
				time_bol: true,
				province: [],
				city: ['请选择'], 
				area: ['请选择'], 
				pid: 0, //省级pid
				pid1: 0, // 市级pid
				index: 0,
				index1: 0,
				index2: 0,
				bol: true,
				bol_:false,
				bol1: true,
				bol_1:false,
				bol2: true,
				bol_2:false, 
				pname: '',
				address: '',
				sum: ''
			};
		},
		onShow () {
			this.$request('/api/index/selectCity', {// 页面展示出来后 请求省级的数据
				pid: this.pid, // pid为0，请求省级的数据
			}).then(res => {
				this.province = res.data.data
			})
			var that = this
			uni.getStorage({ // 从缓存中拿到用户的id
				key: 'userinfo',
				success: (res) => {
					// console.log(res.data)
					that.auid = res.data.data.user_id
				}
			})
		},
		methods: {
			onCancel(e){
				console.log(e);
			},
			onConfirm(e){
				this.time = e.dateValue;
				this.time_bol = false
			},
			getTime() {
				var data = new Date() // 日期对象
				var year = data.getFullYear() // 年份
				var month = data.getMonth() + 1 // 月份
				var day = data.getDate() // 当天
				return year + '-' + month + '-' + day // 拼接格式：2020-02-02
			},
			// 省市区
			bindPickerChange: function(e) { // 请求市级
				this.index = e.target.value,
				this.pid = this.province[this.index].id, 
				// console.log(this.pid), // 当前省级id
				this.bol = false,
				this.bol_ = true,
				this.$request('/api/index/selectCity', {
					pid: this.pid, // 省级数据请求过来之后，将id传入参数再次请求 市级
				}).then(res => {
					this.city = res.data.data
				})
			},
			bindPickerChange1: function(e) { // 请求区级
				this.index1 = e.target.value
				this.pid1 = this.city[this.index1].id 
				// console.log(this.pid1), // 当前市级id
				this.bol1 = false,
				this.bol_1 = true,
				this.$request('/api/index/selectCity', {
					pid: this.pid1, // 省级数据请求过来之后，将id传入参数再次请求 区级
				}).then(res => {
					this.area = res.data.data
				})
			},
			bindPickerChange2: function(e) {
				this.index2 = e.target.value
				// console.log(this.area[this.index2].id) // 当前区级id
				this.bol2 = false,
				this.bol_2 = true
			},
			save() {
				// console.log(
				// this.pname, 
				// this.time, 
				// this.province[this.index].shortname, 
				// this.city[this.index1].shortname, 
				// this.area[this.index2].shortname, 
				// this.address, 
				// this.sum)
				uni.setTabBarItem({
					index: 0,
					text: '首页',
					iconPath: '../../static/shouye(2).png',
					selectedIconPath: '../../static/shouye.png',
					pagePath: '/pages/admin/admin',
				})
				uni.switchTab({
					url: '../admin/admin'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		width: 100%;
		height: 100%;
		.title{
			width: 100%;
			height: 188rpx;
			font-weight: bold;
			color: white;
			background: #3F5DE3;
			display: flex;
			align-items: center;
			image{
				width: 100rpx;
				height: 100rpx;
				margin: 0 40rpx;
			}
			p{
				font-size: 38rpx;
				margin-bottom: 10rpx;
			}
			text{
				font-size: 28rpx;
			}
		}
		.fillMsg{
			width: 90%;
			height: auto;
			margin: 40rpx auto;
			ul{
				width: 100%;
				height: 100%;
				li{
					width: 100%;
					height: 88rpx;
					margin-bottom: 32rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.timechoose{
						width: 512rpx;
						height: 84rpx;
						line-height: 84rpx;
						position: relative;
						text-indent: 20rpx;
						font-size: 32rpx;
						border: 1px solid #D8D8D8;
						text{
							position: absolute;
							left: 0;
							top: 0;
						}
						.time{
							width: 90%;
							height: 84rpx;
						}
					}
					input{
						width: 512rpx;
						height: 100%;
						border: 1px solid #D8D8D8;
						text-indent: 20rpx;
					}
					.size{ // 所选市、区，如果字数超过4，那么就要修改它的字体大小，省级不存在这个问题
						font-size: 24rpx;
					}
					.city_tab{
						width: 140rpx;
						height: 84rpx;
						line-height: 84rpx;
						align-items: center;
						text-align: center;
						text-indent: 10rpx;
						padding-right: 10rpx;
						background: #F6F8FF;
						border-radius: 10rpx;
						position: relative;
						image{
							width: 40rpx;
							height: 40rpx;
							position: absolute;
							top: 50%;
							margin-top: -20rpx;
							right: -1rpx;
						}
					}
				}
			}
		}
		button{
			width: 696rpx;
			height: 96rpx;
			line-height: 96rpx;
			background: #3F5DE3;
			color: white;
			text-align: center;
			position: fixed;
			left: 50%;
			bottom: 40rpx;
			margin-left: -348rpx;
		}
	}
</style>
