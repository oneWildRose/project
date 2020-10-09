<template> <!-- 创建项目（第一步） -->
	<view>
		<div class="kong"></div>
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
			<input type="text" placeholder="企业名称" v-model="enterprie_name"/>
			<input type="text" placeholder="项目名称" v-model="pname"/>
			
			<div class='city'>
				<text>项目地址</text>
				<div class="city_tab">
					<picker @change="bindPickerChange" :value="index" :range="province"  :range-key="'shortname'">
						<label class='' v-if='bol'>请选择</label>
						<label class="" v-if='bol_'>{{province[index].shortname}}</label>
						<image :src="require('../../static/xuanze.svg')" mode=""></image>	
					</picker>
				</div>
				<div class="city_tab">
					<picker @change="bindPickerChange1" :value="index1" :range="city" :range-key="'shortname'">
						<label class='' v-if='bol1'>请选择</label>
						<label class="" v-if='bol_1'>{{city[index1].shortname}}</label>
						<image :src="require('../../static/xuanze.svg')" mode=""></image>
					</picker>
				</div>
				<div class="city_tab">
					<picker @change="bindPickerChange2" :value="index2" :range="area" :range-key="'shortname'">
						<label class='' v-if='bol2'>请选择</label>
						<label class="" v-if='bol_2'>{{area[index2].shortname}}</label>
						<image :src="require('../../static/xuanze.svg')" mode=""></image>
					</picker>
				</div>
			</div>
			
			<input type="text" placeholder='详细地址' v-model="address">
			<div class='green'> <!-- 绿化管理面积 -->
				<input type="text" value="" placeholder="绿化管理面积" v-model="acreage"/>
				<picker @change="wenzi" class='dw' :value="index3" :range="list" :range-key="'label'">
					<label class='' v-if='bol3' style="font-size: 24rpx;">请选择</label>
					<label class="" style="font-size: 24rpx;text-align: left;" v-if="bol_3">{{list[index3].label}}</label>
					<image :src="require('../../static/xuanze.svg')" mode=""></image>
				</picker>
			</div>
			
			<gpp-date-picker class='timechoose' @onCancel="onCancel" @onConfirm="onConfirm" :startDate="'2000-01-01'" :endDate="endTime()" :defaultValue="getTime()">
				<!-- 项目竣工时间 dtime -->
				<text v-if="time_bol">项目竣工时间</text>
				<div class='time'>{{ dtime }}</div>
			</gpp-date-picker>
			<gpp-date-picker class='timechoose' @onCancel="onCancel" @onConfirm="onConfirm2" :startDate="'2000-01-01'" :endDate="endTime()" :defaultValue="getTime()">
				<!-- 项目交付时间 time -->
				<text v-if="time_bol2">项目交付时间</text>
				<div class='time'>{{ time }}</div>
			</gpp-date-picker>
			<gpp-date-picker class='timechoose' @onCancel="onCancel" @onConfirm="onConfirm3" :startDate="'2000-01-01'" :endDate="endTime()" :defaultValue="getTime()">
				<!-- 项目进场时间 ctime -->
				<text v-if="time_bol3">项目进场时间</text>
				<div class='time'>{{ ctime }}</div>
			</gpp-date-picker>
			
			<input type="text" placeholder='负责人' v-model="user_name">
		</div>
		<navigator class="next" >
			<button type="default" @click="next">下一步</button>
		</navigator>
		<text class='resetting' @click="reset">重置</text>
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
				time_bol: true,
				time_bol2: true,
				time_bol3: true, // 选择时间部分所需boolean
				
				index: 0,
				index1: 0,
				index2: 0,
				bol: true,
				bol_:false,
				bol1: true,
				bol_1:false,
				bol2: true,
				bol_2:false, // 控制省市区数据的 索引 和 默认值:'请选择'字样的显示隐藏
				
				index3: 0, // 绿化面积单位数组索引
				bol3: true,
				bol_3:false,
				list: [ // 绿化面积单位数组
				  {
				    label: '亩',
				    value: '1'
				  },
				  {
				    label: '㎡',
				    value: '2'
				  },
				  {
				    label: '公顷',
				    value: '3'
				  }
				],
				province: [], 
				city: ['请选择'], 
				area: ['请选择'], 
				
				pid: 0, //省级pid
				pid1: 0, // 市级pid
				
				pname: '', // 项目名称
				enterprie_name: '', // 企业名称
				province_: '',// 省
				city_: '',// 市
				area_: '',// 区\县
				address: '', // 详细地址
				acreage: '',// 绿化面积（数字）
				unit: '', // 单位
				measure: '',// 绿化面积 （单位）公顷
				company: '',// 绿化面积 (单位) 亩\㎡
				dtime: '', // 竣工时间
				time: '', // 交付时间
				ctime: '', // 进场时间
				user_name: '', // 项目负责人
				auid: '', // app用户id
				
				project_id: '' // 下一步按钮提交后返回的项目id
			}
		},
		onShow () { 
			this.$request('/api/index/selectCity', {// 页面展示出来后 请求省级的数据
				pid: this.pid, // pid为0，请求省级的数据
			}).then(res => {
				this.province = res.data.data
			})
			uni.getStorage({ // 从缓存中拿到用户的id
				key: 'userinfo',
				success: (res) => {
					// console.log(res.data)
					this.auid = res.data.data.id
				}
			})
		},
		methods: {
			onCancel(e){
				console.log(e);
			},
			onConfirm(e){
				this.dtime = e.dateValue;
				this.time_bol = false
			},
			onConfirm2(e){
				this.time = e.dateValue;
				this.time_bol2 = false
			},
			onConfirm3(e){
				this.ctime = e.dateValue;
				this.time_bol3 = false
			},
			getTime() {
				var data = new Date() // 日期对象
				var year = data.getFullYear() // 年份
				var month = data.getMonth() + 1 // 月份
				var day = data.getDate() // 当天
				return year + '-' + month + '-' + day // 拼接格式：2020-02-02
			},
			endTime() {
				var data = new Date() // 日期对象
				var year = data.getFullYear() + 20 // 年份
				var month = data.getMonth() + 1 // 月份
				var day = data.getDate() // 当天
				return year + '-' + month + '-' + day // 拼接格式：2020-02-02
			},
			
			
			// 省市区
			bindPickerChange: function(e) { // 请求市级
				this.index = e.target.value,
				this.province_ = this.province[this.index].shortname // 把用户选择的选项存下来
				this.pid = this.province[this.index].id, 
				console.log(this.pid), // 当前省级id
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
				this.city_ = this.city[this.index1].shortname
				this.pid1 = this.city[this.index1].id 
				console.log(this.pid1), // 当前市级id
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
				this.area_ = this.area[this.index2].shortname 
				console.log(this.area[this.index2].id) // 当前区级id
				this.bol2 = false,
				this.bol_2 = true
			},
			
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			wenzi(e) {
				this.index3 = e.target.value
				this.unit = this.list[this.index3].label // 单位
				this.bol3 = false,
				this.bol_3 = true
			},
			next() { // 下一步按钮
				if (this.unit === '公顷') {
					this.measure = this.acreage
				} else {
					this.company = this.acreage
				}
				// console.log(this.auid)
				this.$request('/api/index/addProject', {
					pname: this.pname,
					enterprie_name: this.enterprie_name,
					province: this.pid,
					city: this.pid1,
					area: this.area[this.index2].id,
					address: this.address,
					user_name: this.user_name,
					time: this.time,
					ctime: this.ctime,
					dtime: this.dtime,
					uid: this.auid, // app用户id
					measure: this.measure,// 公顷
					company: this.company // 亩/㎡
				}).then(res => {
					console.log(res.data)
					if(res.data.code == 1) {
						this.project_id = res.data.data.project_id
						uni.navigateTo({
							url: './create_sure?project_id=' + this.project_id
						})
					} else {
						uni.showModal({
							content: res.data.msg
						})
					}
				})
			},
			reset() { // 重置按钮
				this.pname = ''
				this.enterprie_name = '', // 企业名称
				this.province_ = '',// 省
				this.city_ = '',// 市
				this.area_ = '',// 区\县
				this.address = '', // 详细地址
				this.acreage = '',// 绿化面积（数字）
				this.unit = '', // 单位
				this.dtime = '', // 竣工时间
				this.time = '', // 交付时间
				this.ctime = '', // 进场时间
				this.time_bol = true,
				this.time_bol2 = true,
				this.time_bol3 = true,
				this.user_name = '' // 项目负责人
			}
		}
	}
</script>

<style lang="less" scoped>
	.kong{
		width: 100%;
		height: 60rpx;
	}
	.uni-input {
		width: 520rpx;
		font-size: 28rpx;
	}
	.plaOlder {
		height: 40rpx;
		// line-height: 40rpx;
		text-indent: 30rpx;
		// color: black;
		color: rgba(117, 117, 117, 1);
		font-size: 30rpx;
		text-align: left;
	}
	.goback{
		width: 92%;
		margin: 20rpx auto;
		image{
			width: 52rpx;
			height: 52rpx;
		}
	}
	.text{
		width: 92%;
		margin: 0 auto;
		p{
			font-weight: bold;
		}
		text{
			font-size: 28rpx;
			color: #8C8484;
		}
	}
	.step{
		width: 80%;
		height: 80rpx;
		// border: 1px solid red;
		margin: 20rpx auto;
		position: relative;
		.cir{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			div{
				width: 48rpx;
				height: 48rpx;
				border-radius: 50%;
				border: .5px solid #D9D9D9;	
				background: white;
				position: relative;
				&:nth-of-type(1){
					background: url(../../static/wancheng.svg) no-repeat;
					background-size: 116%;
					background-position: -5rpx -5rpx;
					border: none;
				}
				text{
					position: absolute;
					left: -150%;
					bottom: -100%;
					width: 200rpx;
					text-align: center;
					font-size: 24rpx;
				}
			}
		}
		.wire{
			width: 59.5%;
			margin: -7% auto;
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
		width: 90%;
		height: 992rpx;
		box-shadow: #D2D2D2 1px 2px 4px 2px;
		border-radius: 12rpx;
		background: white;
		margin: 52rpx auto;
		padding: 20rpx 0rpx;
		input{
			width: 90%;
			height: 84rpx;
			line-height: 84rpx;
			text-align: left;
			text-indent: 40rpx;
			color: #86868A;
			background: #F6F8FF;
			margin: 18rpx auto;
			border-radius: 10rpx;
			font-size: 32rpx;
		}
		.city{
			width: 90%;
			height: 84rpx;
			font-size: 32rpx;
			line-height: 84rpx;
			text-align: left;
			margin: 32rpx auto;
			display: flex;
			justify-content: space-around;
			align-items: center;
			&>text{
				width: 34px;
				height: 44px;
				text-align: center;
				line-height: normal;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2; // 行数
			}
			.city_tab{
				width: 140rpx;
				height: 84rpx;
				align-items: center;
				text-align: center;
				text-indent: 10rpx;
				padding-right: 20rpx;
				background: #F6F8FF;
				color: #86888E;
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
			.choose{
				width: 400rpx;
				height: 84rpx;
				line-height: 84rpx;
				margin-right: 0px;
				margin-top: -10rpx;
				background: black;
			}
		}
		.green{
			display: flex;
			align-items: center;
			input{
				width: 68%;
			}
			.dw{
				width: 120rpx;
				font-size: 32rpx;
				height: 84rpx;
				line-height: 84rpx;
				text-indent: 20rpx;
				margin-right: 28rpx;
				position: relative;
				background: #F6F8FF;
				image{
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					right: -1rpx;
					top: 50%;
					margin-top: -20rpx;
				}
				
			}
		}
		.timechoose{
			width: 90%;
			height: 84rpx;
			line-height: 84rpx;
			margin: 20rpx auto;
			position: relative;
			text-indent: 40rpx;
			color: #86868A;
			background: #F6F8FF;
			font-size: 32rpx;
			border-radius: 10rpx;
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
		margin: 20rpx auto;
		color: white;
	}
	.resetting{
		display: block;
		margin-top: 40rpx;
		width: 100%;
		text-align: center;
		font-size: 28rpx;
	}
</style>
