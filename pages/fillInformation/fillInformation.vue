<template>  <!-- 甲乙方完善企业信息 -->
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
					<p>公司名称</p>
					<input type="text" value="" placeholder="请输入公司名称" v-model="pname"/>
				</li>
				<li>
					<p>统一社会信用代码</p>
					<input type="text" value="" placeholder="请输入统一社会信用代码" v-model="usccode"/>
				</li>
				<li>
					<p>企业法人</p>
					<input type="text" value="" placeholder="请输入企业法人姓名" v-model="corporate"/>
				</li>
				<li>
					<p>成立日期</p>
					<gpp-date-picker class='timechoose' @onCancel="onCancel" @onConfirm="onConfirm" :startDate="'1950-01-01'" :endDate="getTime(100)" :defaultValue="getTime(0)">
						<text v-if="time_bol" style='color:#86888E'>请选择成立日期</text>
						<div class='time'>{{ time }}</div>
					</gpp-date-picker>
				</li>
				<li>
					<p>地址</p>
					<div class='city'>
						<div class="city_tab">
							<picker @change="bindPickerChange" :value="index" :range="province"  range-key="shortname">
								<label v-if='bol' style='color:#86888E'>请选择</label>
								<label v-if='bol_'>{{province[index].shortname}}</label>
								<image :src="require('../../static/xuanze.svg')" mode=""></image>	
							</picker>
						</div>
						<div class="city_tab">
							<picker @change="bindPickerChange1" :value="index1" :range="city" range-key="shortname">
								<label v-if='bol1' style='color:#86888E'>请选择</label>
								<label v-if='bol_1' :class="city[index1].shortname.length == 5? 'size' : ''">{{city[index1].shortname}}</label>
								<image :src="require('../../static/xuanze.svg')" mode=""></image>
							</picker>
						</div>
						<div class="city_tab">
							<picker @change="bindPickerChange2" :value="index2" :range="area" range-key="shortname">
								<label v-if='bol2' style='color:#86888E'>请选择</label>
								<label v-if='bol_2' :class="area[index2].shortname.length == 5? 'size' : ''">{{area[index2].shortname}}</label>
								<image :src="require('../../static/xuanze.svg')" mode=""></image>
							</picker>
						</div>
					</div>
					<input type="text" value="" placeholder="请填写详细地址" v-model="address"/>
				</li>
				<li class='image'>
					<p>营业执照</p>
					<div>
						<image v-if="bol3" class="img" :src="src" mode="scaleToFill" @click="preview(src)"></image>
						<div class='upload'>
							<!-- <div :style="{background:'url('+ src +') no-repeat 0 0/100% 100%'}" @click='upload'></div> -->
							<image src=""  @click='upload'></image>
							<text @click='upload'>+</text>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<button type="default" hover-class="none" @click="save">保存</button>
		<div style='height: 20rpx;'></div>
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
				auid: '',
				time: '',
				time_bol: true,
				province: [],
				city: ['请选择'], 
				area: ['请选择'], 
				area_num: 0,
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
				bol3: false,
				pname: '',
				corporate: '',
				usccode: '',
				address: '',
				sum: '',
				src: '',
			};
		},
		onLoad() {
			this.$request('/api/index/selectCity', {// 页面展示出来后 请求省级的数据
				pid: this.pid, // pid为0，请求省级的数据
			}).then(res => {
				this.province = res.data.data
			})
			var that = this
			uni.getStorage({ // 从缓存中拿到用户的id
				key: 'userinfo',
				success: (res) => {
					// console.log(res)
					if(res.data.id) {
						that.auid = res.data.id
					} else if(res.data.uid) {
						that.auid = res.data.uid
					} else if(res.data.data.id) {
						that.auid = res.data.data.id
					}
				}
			})
		},
		methods: {
			onCancel(e){
				
			},
			onConfirm(e){
				this.time = e.dateValue;
				this.time_bol = false
			},
			getTime(addyear) {
				var data = new Date() // 日期对象
				var year = data.getFullYear() + addyear // 年份
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
					if(this.city.length == 1) {
						this.index1 = 0
						this.$request('/api/index/selectCity', {
							pid: this.city[this.index1].id,
						}).then(res => {
							this.area = res.data.data
							if(this.area.length < this.area_num) {
								this.index2 = 0
							}
						})
					}
				})
			},
			bindPickerChange1: function(e) { // 请求区级
				if(this.city[0] !== '请选择'){ 
					this.index1 = e.target.value
					this.pid1 = this.city[this.index1].id 
					// console.log(this.pid1), // 当前市级id
					this.bol1 = false,
					this.bol_1 = true,
					this.$request('/api/index/selectCity', {
						pid: this.pid1, // 省级数据请求过来之后，将id传入参数再次请求 区级
					}).then(res => {
						this.area = res.data.data
						this.area_num = this.area.length
					})
				} else { return }// 如果用户没有选择'省级'，直接点开'市级'并确定，那么就直接return，以防出现undefined
			},
			bindPickerChange2: function(e) {
				if(this.area[0] !== '请选择') {
					this.index2 = e.target.value
					// console.log(this.area[this.index2].id) // 当前区级id
					this.bol2 = false,
					this.bol_2 = true
				} else { return }
			},
			upload() {
				this.$upload('/api/index/upload').then(res => {
					this.src = res // 图片路径
					this.bol3 = true
					uni.hideLoading()
				})
			},
			preview(src) {
				uni.previewImage({
					urls: [ src ]
				})
			},
			save() {
				if(this.pname == '' || this.usccode == '' || this.corporate == '' || this.time == '' || this.pid == 0 ||
					this.pid1 == 0 || this.area[this.index2].id == '' || this.address == '' || this.src == ''){
					uni.showModal({
						content: '请将信息填写完整'
					})
					return ;
				}
				this.$request('/api/index/addFirm', {
					user_id: this.auid,
					name: this.pname, // 企业名称
					usccode: this.usccode, // 社会信用代码
					corporate: this.corporate, // 企业法人
					established: this.time, // 公司成立时间
					province: this.pid, // 省id
					city: this.pid1, // 市id
					area: this.area[this.index2].id, // 区id
					address: this.address, // 详细地址
					yimgurl: this.src // 营业执照
				}).then(res => {
					console.log(res)
					if(res.data.code == 1) {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'success',
							duration: 1000,
							position: 'bottom',
							isTab: true,
							callback: function() {
								uni.setTabBarItem({
									index: 0,
									text: '首页',
									iconPath: '../../static/shouye(2).png',
									selectedIconPath: '../../static/shouye.png',
									pagePath: '/pages/ind/ind'
								})
								uni.switchTab({
									url: '../ind/ind'
								})
							}
						})
					}
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
			margin-bottom: 0;
			ul{
				width: 100%;
				height: 100%;
				li{
					width: 100%;
					height: auto;
					margin-bottom: 32rpx;
					p{
						margin-bottom: 10rpx;
					}
					input{
						width: 98%;
						height: 80rpx;
						border: 1px solid #D8D8D8;
						text-indent: 20rpx;
						border-radius: 8rpx;
					}
					.timechoose{
						width: 98%;
						height: 80rpx;
						line-height: 80rpx;
						text-indent: 20rpx;
						font-size: 32rpx;
						border: 1px solid #D8D8D8;
						.time{
							width: 90%;
							height: 84rpx;
						}
					}
					.city{
						width: 98%;
						height: auto;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.size{ // 所选市、区，如果字数超过4，那么就要修改它的字体大小，省级不存在这个问题
							font-size: 24rpx;
						}
						.city_tab{
							width: 200rpx;
							height: 84rpx;
							line-height: 84rpx;
							text-align: center;
							border-radius: 8rpx;
							position: relative;
							border: 1px solid #D8D8D8;
							margin-bottom: 20rpx;
							image{
								width: 40rpx;
								height: 40rpx;
								position: absolute;
								top: 50%;
								margin-top: -20rpx;
								right: 2rpx;
							}
						}
					}
				}
				.image{
					position: relative;
					&>div{
						width: 100%;
						height: auto;
						display: flex;
						align-items: center;
						.img{
							width: 250rpx;
							height: 150rpx;
							margin-right: 40rpx;
						}
						.upload{
							width: 250rpx;
							height: 150rpx;
							position: relative;
							&>div{
								width: 100%;
								height: 100%;
								border: 2px solid #F7F7F7;
								background-color: #F2F3F7;
							}
							&>image{
								width: 100%;
								height: 100%;
								border: 2px solid #F7F7F7;
							}
							text{
								width: 150rpx;
								height: 100rpx;
								line-height: 100rpx;
								text-align: center;
								font-size: 80rpx;
								position: absolute;
								left: 50%;
								top: 50%;
								margin-top: -50rpx;
								margin-left: -75rpx;
								color: #878787;
							}
						}
					}
				}
			}
		}
		button{
			width: 90%;
			height: 96rpx;
			line-height: 96rpx;
			background: #3F5DE3;
			color: white;
			text-align: center;
		}
	}
</style>
