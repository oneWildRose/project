<template> <!-- 个人信息 -->
	<view class="hello">
		<div class='status' style='background-color: white;'></div>
		<div class='title'>
			<image :src="require('../../static/fanhui(3).png')" @click="goBack"></image>
			<text>个人信息</text>
		</div>
		<div class='pic' @longpress="perview(msg.file)">
			<image :src="msg.file == null || msg.file == ''? src : msg.file" mode="" @click='upload'></image>
			<p @click='upload'>修改头像</p>
		</div>
		<div class='msg'>
			<ul>
				<li @click="goModification(msg.name == null? '昵称' : msg.name)">
					<p>姓名</p>
					<text>{{ msg.name == null? '昵称' : msg.name }}</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li>
					<p>手机号</p>
					<text>{{ mobile }}</text>
				</li>
												<!-- 以下是甲乙方最高权限负责人的信息展示 -->
				<li v-if='isshenfen == 1 || isshenfen == 3? true : false'><!--  @click='goEnterprise' -->
					<p>公司名称</p>
					<text>{{ msg.enterprisename }}</text>
					<!-- <image :src="require('../../static/jinru.svg')"></image> -->
				</li>
				<li v-if='isshenfen == 1 || isshenfen == 3? true : false'><!--  @click='goEnterprise' -->
					<p>统一社会信用代码</p>
					<text>{{ msg.usccode }}</text>
					<!-- <image :src="require('../../static/jinru.svg')"></image> -->
				</li>
				<li v-if='isshenfen == 1 || isshenfen == 3? true : false'><!--  @click='goEnterprise' -->
					<p>企业法人</p>
					<text>{{ msg.corporate }}</text>
					<!-- <image :src="require('../../static/jinru.svg')"></image> -->
				</li>
				<li v-if='isshenfen == 1 || isshenfen == 3? true : false'><!--  @click='goEnterprise' -->
					<p>成立日期</p>
					<text>{{ msg.established == null? time : msg.established }}</text>
					<!-- <gpp-date-picker @onCancel="onCancel" @onConfirm="onConfirm1" :startDate="'1900-01-01'" :endDate="'2100-01-01'" :defaultValue="msg.established == null? time : msg.established">
						{{ msg.established == null? time : msg.established }}
						<image :src="require('../../static/jinru.svg')"></image>
					</gpp-date-picker> -->
				</li>
				<li v-if='isshenfen == 1 || isshenfen == 3? true : false' @click='goBusiness_pic'>
					<p>营业执照</p>
					<text>{{ msg.yimgurl == null? '暂无' : '已上传' }}</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				
												<!-- 以下是专家或项目主管的个人信息显示 -->
				
				<li v-if='isshenfen == 5 || isshenfen == 2 || isshenfen == 4'> 
					<p>性别</p> 
					<picker @change="xb" class='sex' :value="sex_index" :range="list" :range-key="'label'">
						<label class='' v-if='bol'>{{ msg.sex == 1? '男' : msg.sex == 2? '女' : '暂未设置' }}</label>
						<label class="" v-if="bol_">{{ list[sex_index].label }}</label>
						<image :src="require('../../static/jinru.svg')"></image>
					</picker>
				</li>
				<li v-if='isshenfen == 5 || isshenfen == 2 || isshenfen == 4'>
					<p>出生日期</p>
					<gpp-date-picker @onCancel="onCancel" @onConfirm="onConfirm" :startDate="'1900-01-01'" :endDate="'2100-01-01'" :defaultValue="msg.birthday == 'null' || msg.birthday == null? time : msg.birthday">
						{{ msg.birthday == 'null' || msg.birthday == null? '暂未设置' : msg.birthday }}
						<image :src="require('../../static/jinru.svg')"></image>
					</gpp-date-picker>
				</li>
				<li v-if='isshenfen == 2 || isshenfen == 4'>
					<p>职位</p>
					<text>项目主管</text>
				</li>
				<li v-if='isshenfen == 5'>
					<p>实名认证</p>
					<text :style="status == 0? {color: 'orange'} : status == 1? {color: '#6F7CFF'} : {color: '#999999'}">
						{{ status == 0? '未审核' : status == 1? '已认证' : '未通过' }}
					</text>
				</li>
				<li v-if='isshenfen == 5'>
					<p>是否匿名</p>
					<picker @change="nm" class='sex' :value="isname_index" :range="isname_" :range-key="'label'">
						<label class='' v-if='bol2'>{{ isAnonymity == 1? '是' : '否' }}</label>
						<label class="" v-if="bol_2">{{ isname_[isname_index].label }}</label>
						<image :src="require('../../static/jinru.svg')"></image>
					</picker>
				</li>
			</ul>
		</div>
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
				id: '',
				src: '../../static/touxiang.svg',// 默认头像
				time: new Date().Format("yyyy-MM-dd"),
				msg: '', // 用户信息列表
				mobile: '', // 手机号码
				birthday: '', // 出生日期
				business_pic: '查看', // 营业执照
				enterprise_code: '', // 企业代码
				bol: true,
				bol_: false,
				sex_index: 0, // 性别标识
				list: [{label: '男',value: '1'},{label: '女',value: '2'}],
				bol2: true,
				bol_2: false,
				isname_index: 0, // 是否匿名标识
				isname_: [{label: '是',value: 1},{label: '否',value: 0}],
				province: '',
				city: '',
				area: '',
				isshenfen: '',
				status: 0 ,// 专家实名认证状态， 0未审核，1已通过，2未通过
				isAnonymity: 0// 专家匿名状态， 0不匿名（否），1匿名（是）
			}
		},
		onLoad(option) {
			this.id = option.id
		},
		onShow() {
			this.$request('/api/index/infoIndex', {
				uid: this.id
			}).then(res => {
				// console.log(res)
				this.msg = res.data.data
				this.isshenfen = res.data.data.isshenfen
				this.mobile = this.msg.mobile.substring(0, 3) + '****' + this.msg.mobile.substring(this.msg.mobile.length - 4)
				if(this.msg.info) { // 专家是否匿名 and 实名认证进度
					this.isAnonymity = this.msg.info.isAnonymity
					this.status = this.msg.info.status
				}
			})
		},
		methods: {
			goEnterprise() {
				uni.navigateTo({
					url: './enterprise/enterprise'
				})
			},
			perview(url) {
				if(url == '') {return}
				uni.vibrateShort()
				uni.previewImage({
					urls: [ url ]
				})
			},
			upload() { // 上传头像
				this.$upload('/api/index/upload').then(res => {
					this.msg.file = res
					this.src = res
					this.$request('/api/index/headEdit', {
						file: this.src,
						uid: this.msg.id
					}).then(res => {
						// console.log(res)
						if(res.data.code == 1) {
							uni.hideLoading()
							this.$refs.uToast.show({
								title: res.data.msg,
								duration: 1000,
								position: 'bottom',
								type: 'success'
							})
						} else {
							uni.hideLoading()
							this.$refs.uToast.show({
								title: res.data.msg,
								duration: 1200,
								position: 'bottom',
								type: 'error'
							})
						}
					})
				})
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goModification(username) {
				uni.navigateTo({
					url: '../modification/modification?username=' + username + '&id=' + this.id
				})
			},
			goBusiness_pic() {
				uni.navigateTo({
					url: '../business_pic/business_pic?id=' + this.id
				})
			},
			xb(e) { // 性别
				this.sex_index = e.target.value
				//console.log(this.list[this.sex_index].value) // 1男，2女
				this.msg.sex = this.list[this.sex_index].label
				this.bol = false,
				this.bol_ = true
				this.$request('/api/index/infoEdit', {
					uid: this.id,
					sex: this.list[this.sex_index].value
				}).then(res => {
					if(res.data.code == 1) {
						this.$refs.uToast.show({
							title: res.data.msg,
							duration: 1000,
							position: 'bottom',
							type: 'success'
						})
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							duration: 1200,
							position: 'bottom',
							type: 'error'
						})
					}
				})
			},
			nm(e) { // 匿名
				this.isname_index = e.target.value
				//console.log(this.isname_[this.isname_index].value)// 0否，1是
				this.msg.isAnonymity = this.isname_[this.isname_index].label
				this.bol2 = false,
				this.bol_2 = true
				this.$request('/api/index/infoEdit', {
					uid: this.id,
/*new knowledge*/	"expert[isAnonymity]": this.isname_[this.isname_index].value
				}).then(res => {
					if(res.data.code == 1) {
						this.$refs.uToast.show({
							title: res.data.msg,
							duration: 1000,
							position: 'bottom',
							type: 'success'
						})
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							duration: 1200,
							position: 'bottom',
							type: 'error'
						})
					}
				})
			},
			onCancel(e){// 日期选择器取消按钮
				console.log(e);
			},
			onConfirm(e){// 确认按钮（修改出生日期的）
				this.msg.birthday = e.dateValue;
				this.$request('/api/index/infoEdit', {
					uid: this.id,
					birthday: this.msg.birthday // 出生日期
				}).then(res => {
					if(res.data.code == 1) {
						this.$refs.uToast.show({
							title: res.data.msg,
							duration: 1000,
							position: 'bottom',
							type: 'success'
						})
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							duration: 1200,
							position: 'bottom',
							type: 'error'
						})
					}
				})
			},
			// onConfirm1(e){ // 确认按钮（修改公司成立日期的）
			// 	this.msg.established = e.dateValue;
			// },
		}
	}
</script>

<style lang="less" scoped>

	.title{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		image{
			width: 40rpx;
			height: 40rpx;
			margin-left: 40rpx;
		}
		text{
			font-size: 36rpx;
			text-align: center;
			flex-grow: 1;
			margin-left: -80rpx;
		}
		p{
			color: #6B65EE;
			font-size: 34rpx;
			font-weight: 600;
		}
	}
	.pic{
		width: 100%;
		height: 280rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		image{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-top: 70rpx;
			margin-bottom: 20rpx;
		}
		p{
			font-size: 28rpx;
		}
	}
	.msg{
		width: 90%;
		margin: 20rpx auto;
		ul{
			width: 100%;
			li{
				width: 100%;
				border-bottom: 1px solid #ECECEC;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 26rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				p{
					flex-grow: 1;
				}
				image{
					width: 30rpx;
					height: 30rpx;
					margin-left: 16rpx;
					vertical-align: middle;
				}
				input{
					width: 30%;
					height: 60%;
					font-size: 32rpx;
					border: 1px solid #ECECEC;
					text-align: center;
				}
				.tag{
					display: flex;
					align-items: center;
					&>text{
						padding: 0 20rpx 0 20rpx;
						height: 50rpx;
						line-height: 50rpx;
						border-radius: 30rpx;
						margin-left: 10rpx;
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
					}
				}
				.forte{
					max-width: 70%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}
</style>
