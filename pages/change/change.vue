<template> <!-- 修改项目信息 -->
	<view class="hello">
		<div class="title">
			<image :src="require('../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<p>修改项目信息</p>
		</div>
		<div class="main">
			<p class='options'>
				项目名称
				<input type="text" placeholder="项目名称" v-model="pname"/>
			</p>
			<p class='options'>
				企业名称
				<input type="text" placeholder="企业名称" v-model="enterprie_name"/>
			</p>
			
			<div class='city'>
				<text>项目地址</text>
				<div class="city_tab">
					<picker @change="bindPickerChange" :value="index" :range="province"  :range-key="'shortname'">
						<label class='' v-if='bol' style='color:#86888E'>{{ msg.province }}</label>
						<label class="" v-if='bol_'>{{province[index].shortname}}</label>
						<image :src="require('../../static/xuanze.svg')" mode=""></image>	
					</picker>
				</div>
				<div class="city_tab">
					<picker @change="bindPickerChange1" :value="index1" :range="city" :range-key="'shortname'">
						<label class='' v-if='bol1' style='color:#86888E'>{{ msg.city }}</label>
						<label class="" v-if='bol_1'>{{city[index1].shortname}}</label>
						<image :src="require('../../static/xuanze.svg')" mode=""></image>
					</picker>
				</div>
				<div class="city_tab">
					<picker @change="bindPickerChange2" :value="index2" :range="area" :range-key="'shortname'">
						<label class='' v-if='bol2' style='color:#86888E'>{{ msg.area }}</label>
						<label class="" v-if='bol_2'>{{area[index2].shortname}}</label>
						<image :src="require('../../static/xuanze.svg')" mode=""></image>
					</picker>
				</div>
			</div>
			
			<p class='options'>
				具体地址
				<input type="text" placeholder='详细地址' v-model="address">
			</p>
			<div class='green'> <!-- 绿化管理面积 -->
				<p>管理面积</p>
				<input type="text" value="" placeholder="绿化管理面积" v-model="acreage" style="width: 36%;margin-right: -29rpx;"/>
				<picker @change="wenzi" class='dw' :value="index3" :range="list" :range-key="'label'">
					<label class='' v-if='bol3' style="font-size: 30rpx;display:block;text-indent:40rpx;">{{ text }}</label>
					<label class="" style="font-size: 30rpx;display:block;text-indent:40rpx;" v-if="bol_3">{{list[index3].label}}</label>
					<image :src="require('../../static/xuanze.svg')" mode=""></image>
				</picker>
			</div>
			<gpp-date-picker class='options' @onCancel="onCancel" @onConfirm="onConfirm" :startDate="'1990-01-01'" :endDate="endTime()" :defaultValue="getTime()">
				<!-- 项目竣工时间 dtime -->
				<text>竣工时间</text>
				<div class='time'>{{ dtime }}</div>
			</gpp-date-picker>
			<gpp-date-picker class='options' @onCancel="onCancel" @onConfirm="onConfirm2" :startDate="'1990-01-01'" :endDate="endTime()" :defaultValue="getTime()">
				<!-- 项目交付时间 time -->
				<text>交付时间</text>
				<div class='time'>{{ time }}</div>
			</gpp-date-picker>
			<gpp-date-picker class='options' @onCancel="onCancel" @onConfirm="onConfirm3" :startDate="'1990-01-01'" :endDate="endTime()" :defaultValue="getTime()">
				<!-- 项目进场时间 ctime -->
				<text>进场时间</text>
				<div class='time'>{{ ctime }}</div>
			</gpp-date-picker>
			<p class='options'>
				负 责 人 
				<input type="text" placeholder='负责人' v-model="user_name" style="margin-right: -6rpx;">
			</p>
			<p class='options_'>
				项目平面图:
			</p>
			<div class='baba'>
				<image :src="src == null? '../../static/zanwu.png': src" mode="" class="image"></image>
				<div class='img'>
					<image :src="src_" mode="" @click='upload'></image>
					<text v-if="bol4" @click='upload'>+</text>
				</div>
			</div>
		</div>
		<button type="default" class="save" @click="save">保存</button>
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
				text: '亩', // 默认单位
				list: [ // 绿化面积单位数组
				  {
				    label: '亩',
				    value: '0'
				  },
				  {
				    label: '㎡',
				    value: '1'
				  },
				],
				province: [], 
				city: '',
				area: '',
				
				pid: '', //省级pid
				pid1: '', // 市级pid
				pid2: '',
				
				pname: '', // 项目名称
				enterprie_name: '', // 企业名称
				area_: '',// 区\县
				address: '', // 详细地址
				acreage: '',// 绿化面积（数字）
				dtime: '', // 竣工时间
				time: '', // 交付时间
				ctime: '', // 进场时间
				user_name: '', // 项目负责人
				uid: '', // app用户id
				src: '', // 平面图
				src_: '', // 用户修改项目信息时上传的平面图
				bol4: true,
				plan_url: '',
				
				project_id: '',// 项目id
				msg: '',
				zanding_pro: '',
				zanding_city: '',
				zanding_area: ''
			}
		},
		onLoad(option) {
			this.project_id = option.project_id // 项目id
			this.$request('/api/index/project_edit', {
				project_id: this.project_id
			}).then(res => {
				// console.log(res)
				this.msg = res.data.data
				// console.log(this.msg)
				this.zanding_pro = this.msg.province
				this.zanding_city = this.msg.city
				this.zanding_area = this.msg.area
				if(this.msg.company == 0) {
					this.text = '亩'
				} else {
					this.text = '㎡'
				}
				this.$request('/api/index/selectCity', {
					pid: 0
				}).then(res => {
					// console.log(res)
					this.province = res.data.data
					for(var i = 0; i <= res.data.data.length; i++) {
						if (res.data.data[i].id == this.msg.province) {
							this.msg.province = res.data.data[i].shortname
							// console.log(this.msg.province) // 省
						}
					}
				})
				this.$request('/api/index/selectCity', {
					pid: this.msg.province
				}).then(res => {
					// console.log(res)
					this.city = res.data.data
					for(var i = 0; i <= res.data.data.length; i++) {
						if (res.data.data[i].id == this.msg.city) {
							this.msg.city = res.data.data[i].shortname
							// console.log(this.msg.city) // 市
						}
					}
				})
				this.$request('/api/index/selectCity', {
					pid: this.msg.city
				}).then(res => {
					// console.log(res)
					this.area = res.data.data
					for(var i = 0; i <= res.data.data.length; i++) {
						if (res.data.data[i].id == this.msg.area) {
							this.msg.area = res.data.data[i].shortname
							// console.log(this.msg.area) // 区
						}
					}
				})
				this.pname = this.msg.pname
				this.enterprie_name = this.msg.enterprie_name
				this.address = this.msg.address
				this.acreage = this.msg.measure // 绿化面积数字
				this.index3 = this.msg.company // 单位 0代表亩   1代表平方米
				this.dtime = this.msg.dtime
				this.time = this.msg.time
				this.ctime = this.msg.ctime
				this.user_name = this.msg.user_name
				this.src = this.msg.plan_url
			})
			var that = this
			uni.getStorage({ // 从缓存中拿到用户的id
				key: 'userinfo',
				success: (res) => {
					// console.log(res.data)
					that.uid = res.data.data.user_id
				}
			})
		},
		methods: {
			onCancel(e){
				console.log(e);
			},
			onConfirm(e){
				this.dtime = e.dateValue;
			},
			onConfirm2(e){
				this.time = e.dateValue;
			},
			onConfirm3(e){
				this.ctime = e.dateValue;
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
				var year = data.getFullYear() + 30 // 年份
				var month = data.getMonth() + 1 // 月份
				var day = data.getDate() // 当天
				return year + '-' + month + '-' + day // 拼接格式：2020-02-02
			},
			
			// 省市区
			bindPickerChange: function(e) { // 请求市级
				this.index = e.target.value,
				this.pid = this.province[this.index].id,
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
				this.bol2 = false,
				this.bol_2 = true
			},
			wenzi(e) {
				this.index3 = e.target.value
				this.bol3 = false,
				this.bol_3 = true
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			upload() {
				uni.chooseImage({
					count: 1, // 限制选取的数量，最多可选9张
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: 'http://lvz.maike-docker.com/index.php/api/index/upload',
				            filePath: tempFilePaths[0],
							name: 'file',
				            formData: {
				                'file': 'test'
				            },
				            success: (uploadFileRes) => {
								this.bol4 = false
								this.src_ = uploadFileRes.data // 上传的图片路径
				            }
				        });
				    }
				});
			},
			save() {
				if (this.src_ == '') {
					this.plan_url = this.src
				} else {
					this.plan_url = this.src_
				}
				if (this.pid == '') {
					this.pid = this.zanding_pro
				}
				if (this.pid1 == '') {
					this.pid1 = this.zanding_city
				}
				if (this.area_ == '') {
					this.pid2 = this.zanding_area
				} else {
					this.pid2 = this.area[this.index2].id
				}
				this.$request('/api/index/Project_edit_submit', {
					pname: this.pname,
					enterprie_name: this.enterprie_name,
					province: this.pid,
					city: this.pid1,
					area: this.pid2,
					address: this.address,
					ctime: this.ctime,
					dtime: this.dtime,
					measure: this.acreage,
					company: this.index3,
					time: this.time,
					user_name: this.user_name,
					project_id: this.project_id,
					uid: this.uid,
					plan_url: this.plan_url
				}).then(res => {
					// console.log(res)
					if(res.data.code == 1) {
						uni.showModal({
							content: res.data.msg
						})
						this.goBack()
					} else {
						if(res.data.msg == '错误！请重试') {
							uni.showModal({
								content: '请修改信息后再进行操作'
							})
						} else if(res.data.msg == '请登录后操作'){
							uni.showModal({
								content: res.data.msg,
								success(res) {
									if(res.confirm) { // 点击了确定按钮
										uni.navigateTo({
											url: '../sign/sign'
										})
									}
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		width: 100%;
		height: 1529rpx;
		background: url(../../static/9-17icon/bg2.jpg) no-repeat;
		background-size: 100%;
		.title{
			width: 100%;
			height: 260rpx;
			position: relative;
			image{
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				left: 8%;
				top: 30%;
			}
			p{
				font-weight: 700;
				position: absolute;
				left: 8%;
				bottom: 10%;
				color: white;
			}
		}
		.main{
			width: 100%;
			height: 1500rpx;
			border-radius: 30rpx;
			border-bottom-right-radius: 0;
			border-bottom-left-radius: 0;
			background: white;
			padding-top: 20rpx;
			.options{
				width: 90%;
				height: 80rpx;
				line-height: 80rpx;
				margin: 10px auto;
				display: flex;
				justify-content: space-around;
				align-items: center;
				font-size: 32rpx;
				position: relative;
				&>text{
					width: 19%;
				}
				.time{
					width: 60%;
					border: 1px solid #D5D5D5;
					text-indent: 20rpx;
				}
			}
			.options_{
				width: 80%;
				margin: 0 auto;
				font-size: 32rpx;
				text-align: left;
			}
			.baba{
				width: 86%;
				height: 300rpx;
				margin: 40rpx auto;
				display: flex;
				justify-content: space-around;
				.image{
					width: 280rpx;
					height: 200rpx;
				}
				.img{
					width: 280rpx;
					height: 200rpx;
					position: relative;
					image{
						width: 280rpx;
						height: 200rpx;
						border: 2px solid #F7F7F7;
						background-color: #F2F3F7;
					}
					text{
						position: absolute;
						top: 50%;
						left: 50%;
						margin-top: -25%;
						margin-left: -10%;
						font-size: 100rpx;
						color: #BFBFBF;
					}
				}
			}
			
			input{
				width: 60%;
				height: 70rpx;
				line-height: 70rpx;
				text-align: left;
				text-indent: 20rpx;
				border: 1px solid #D5D5D5;
				font-size: 32rpx;
			}
			.city{
				width: 84%;
				height: 84rpx;
				font-size: 32rpx;
				line-height: 84rpx;
				text-align: left;
				margin: 32rpx auto;
				display: flex;
				justify-content: space-around;
				align-items: center;
				text{
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
					border-radius: 20rpx;
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
				width: 90%;
				height: 84rpx;
				margin: 0 auto;
				display: flex;
				justify-content: space-around;
				align-items: center;
				font-size: 32rpx;
				.dw{
					width: 120rpx;
					font-size: 32rpx;
					height: 84rpx;
					line-height: 84rpx;
					text-indent: 20rpx;
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
		}
		button{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			color: white;
			border-radius: 0;
			background: #5E79F2;
			position: fixed;
			bottom: 0;
			left: 0;
			border: none;
		}
	}
</style>
