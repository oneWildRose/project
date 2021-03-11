<template>  <!-- 实名认证 -->
	<view class='hello'>
		<div class="status"></div>
		<div class='title'>实名认证</div>
		<p class='pleaseup'>请上传身份证正反面</p>
		<div class='card'>
			<image :src="leftUrl" mode="aspectFit" @click='upload("left")'></image>
			<image :src="rightUrl" mode="aspectFit" @click='upload("right")'></image>
		</div>
		<p class='pleasetrue'>请确认以下信息，如有误请重新上传</p>
		<ul>
			<li>
				<text>姓名:</text>
				<input type="text" v-model="name"/>
			</li>
			<li>
				<text>身份证号:</text>
				<input type="text" v-model='cardNumber'/>
			</li>
			<li>
				<text>性别:</text>
				<picker @change="xb" class='sex' :value="sex_index" :range="list" :range-key="'label'">
					<label class='' v-if='bol1'>{{ sex }}</label>
					<label class="" v-if="bol_1">{{ list[sex_index].label }}</label>
				</picker>
			</li>
			<li>
				<text>住址:</text>
				<input type="text" v-model="address" style="width: 85%"/>
			</li>
		</ul>
		<div class="save" @click='next' v-if='bol'>下一步</div>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { pathToBase64 } from '../../../js_sdk/gsq-image-tools/image-tools/index.js'
	export default {
		data() {
			return {
				name: '',
				cardNumber: '',
				bol1: true,
				bol_1: false,
				sex: '男',
				sex_index: 0, // 性别标识
				list: [{label: '男',value: '1'},{label: '女',value: '2'}],
				address: '',
				leftUrl: '../../../static/leftCard.png',
				rightUrl: '../../../static/rightCard.png',
				base: '',
				uid: this.$store.state.uid,
				bol: true,
				errorcode_F: false, // 为true证明上传的是身份证，否则不是。 ..._F人面像
				errorcode_B: false  // ..._B国徽面
			}
		},
		mounted(){
			uni.onKeyboardHeightChange(res => {
				if(res.height > 0) {
					this.bol = false
				} else {
					this.bol = true
				}
			})
		},
		methods: {
			xb(e) { // 性别
				this.sex_index = e.target.value
				// console.log(this.list[this.sex_index].value) // 1男，2女
				this.sex = this.list[this.sex_index].label
				this.bol1 = false,
				this.bol_1 = true
			},
			upload(direction) {
				this.$upload('/api/index/upload').then(res => {
					if(direction == 'left') {
						this.leftUrl = res
					} else {
						this.rightUrl = res
					}
					// console.log(res)
					this.$request('/api/Curl/QnIdCard', { // 七牛身份证识别
						file: res // 上传的图片地址
					}).then(res => {
						// console.log(res)
						if(res.data.errorcode == 0 && res.data.ocr_result.side == 'F') {// F人脸面  
							this.errorcode_F = true
							this.name = res.data.ocr_result.name
							this.cardNumber = res.data.ocr_result.idno
							this.sex = res.data.ocr_result.gender
							this.address = res.data.ocr_result.address
							uni.hideLoading()
						} else if(res.data.errorcode == 0 && res.data.ocr_result.side == 'B') {// B国徽面 
							this.errorcode_B = true
							uni.hideLoading()
						} else {
							uni.hideLoading()
						}
					})
				})
			},
			next() {
				var cardbol = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.cardNumber)
				if(this.name == '' || this.cardNumber == '' || this.leftUrl == '../../../static/leftCard.png' ||
					this.rightUrl == '../../../static/rightCard.png' || this.address == '') {
					this.$refs.uToast.show({
						title: '请将信息填写完整',
						type: 'error',
						duration: 1200,
						position: 'bottom'
					})
				} else if(cardbol == false) { // 身份证格式不正确
					this.$refs.uToast.show({
						title: '请检查身份证号是否正确',
						type: 'error',
						duration: 1200,
						position: 'bottom'
					})
				} else {
					this.$request('/api/index/zhuanjiainfoEdit', {
						uid: this.uid,
						name: this.name,
						idcard: this.cardNumber,
						zidcard: this.leftUrl,
						fidcard: this.rightUrl,
						sex: this.sex == '男'? 1 : 2, // 1男，2女
						zhuzhi: this.address
					}).then(res => {
						// console.log(res)
						if(res.data.code == 1) {
							uni.reLaunch({
								url: '../specialist_info/specialist_info'
							})
						} else {
							uni.showModal({
								content: res.data.msg
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		background-color: #F6F6F9;
	}
	.title{
		width: 100%;
		height: 116rpx;
		line-height: 116rpx;
		text-align: center;
		color: white;
		font-size: 36rpx;
		font-weight: bold;
		background: #5D6CFF;
	}
	.pleaseup{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #F6F6F9;
		text-indent: 40rpx;
		font-size: 34rpx;
	}
	.card{
		width: 100%;
		height: 328rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: white;
		&>image{
			width: 316rpx;
			height: 240rpx;
		}
	}
	.pleasetrue{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #F6F6F9;
		text-indent: 40rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #9B9D9E;
	}
	ul{
		width: 100%;
		height: auto;
		background-color: white;
		li{
			width: 90%;
			margin: 0 auto;
			border-bottom: 1px solid #E8E8E8;
			height: 96rpx;
			display: flex;
			align-items: center;
			text{
				margin-right: 24rpx;
			}
			input{
				width: 74%;
				height: 100%;
			}
			.sex{
				width: 80%;
				height: 100%;
				line-height: 96rpx;
			}
			&:nth-last-of-type(1){
				border: none;
			}
		}
	}
	.save{
		width: 94%;
		height: 100rpx;
		line-height: 100rpx;
		background: #5D6CFF;
		text-align:  center;
		color: white;
		font-size: 34rpx;
		border-radius: 8rpx;
		position: fixed;
		bottom: 60rpx;
		left: 3%;
	}
</style>
