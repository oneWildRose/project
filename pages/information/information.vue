<template> <!-- 个人信息 -->
	<view>
		<div class='kong'></div>
		<div class='title'>
			<image :src="require('../../static/fanhui(3).png')" @click="goBack"></image>
			<text>个人信息</text>
			<p @click='save'>保存</p>
		</div>
		<div class='pic' @click='upload'>
			<image :src="msg.file == null? src : msg.file" mode=""></image>
			<p>修改头像</p>
		</div>
		<div class='msg'>
			<ul>
				<li @click="goModification">
					<p>昵称</p>
					<text>{{ msg.username == null? '昵称' : msg.username }}</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li>
					<p>手机号</p>
					<text>{{ mobile }}</text>
				</li>
				<li>
					<p>性别</p>
					<picker @change="sex" class='sex' :value="index" :range="list" :range-key="'label'">
						<label class='' v-if='bol'>男</label>
						<label class="" v-if="bol_">{{ list[index].label }}</label>
					</picker>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li>
					<p>出生日期</p>
					<gpp-date-picker @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate" :endDate="getTime()" :defaultValue="msg.birthday == null? getTime() : msg.birthday">
						{{ msg.birthday == null? getTime() : msg.birthday }}
					</gpp-date-picker>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li @click='goBusiness_pic'>
					<p>营业执照</p>
					<text>{{ business_pic }}</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li>
					<p>企业代码</p>
					<!-- <text>{{ enterprise_code }}</text> -->
					<input type="text" placeholder="请输入" v-model="enterprise_code" class="enterprise_code"/>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
			</ul>
		</div>
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
				src: '../../static/shu.png',// 默认头像
				startDate: "1900-01-01", //日期选择器 初始日期
				msg: '', // 用户信息列表
				mobile: '',
				xb: '', // 性别
				business_pic: '暂无', // 营业执照
				enterprise_code: '', // 企业代码
				index: 0,
				bol: true,
				bol_: false,
				list: [
				  {
				    label: '男',
				    value: '1'
				  },
				  {
				    label: '女',
				    value: '2'
				  }
				]
			}
		},
		onLoad(option) {
			var that = this
			uni.getStorage({
				key: 'userinfo',
				success: function(res) {
					// console.log(res.data.data.data.user_id)
					that.$request('/api/index/infoIndex', {
						uid: res.data.data.data.user_id
					}).then(res => {
						console.log(res)
						that.msg = res.data.data
						that.mobile = that.msg.mobile.substring(0, 3) + '****' + that.msg.mobile.substring(that.msg.mobile.length - 4)
					})
				}
			})
			console.log(opstion)
		},
		methods: {
			getTime() {
				var data = new Date() // 日期对象
				var year = data.getFullYear() // 年份
				var month = data.getMonth() + 1 // 月份
				var day = data.getDate() // 当天
				return year + '-' + month + '-' + day // 拼接格式：2020-02-02
			},
			save() {
				
			},
			upload() { // 上传头像
				uni.chooseImage({
					count: 1, //最多选取一张图片
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: 'http://lvz.maike-docker.com/index.php/api/index/upload',
				            filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
				            success: (uploadFileRes) => {
								this.src = uploadFileRes.data
								console.log(this.src)
								this.$request('/api/index/headEdit', {
									file: this.src,
									uid: this.msg.id
								}).then(res => {
									console.log(res)
								})
				            }
				        });
				    }
				});
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goModification() {
				uni.navigateTo({
					url: '../modification/modification'
				})
			},
			goBusiness_pic() {
				uni.navigateTo({
					url: '../business_pic/business_pic'
				})
			},
			sex(e) {
				this.index = e.target.value
				this.xb = this.list[this.index].label
				this.bol = false,
				this.bol_ = true
			},
			onCancel(e){// 日期选择器取消按钮
				console.log(e);
			},
			onConfirm(e){// 确认按钮
				this.msg.birthday = e.dateValue;
			},
		}
	}
</script>

<style lang="less" scoped>
	.kong{
		width: 100%;
		height: 60rpx;
	}
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
		}
		text{
			font-size: 36rpx;
			margin-left: 120rpx;
			margin-right: 100rpx;
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
					margin-left: 20rpx;
				}
				input{
					width: 30%;
					height: 60%;
					font-size: 32rpx;
					border: 1px solid #ECECEC;
					text-align: center;
				}
			}
		}
	}
</style>
