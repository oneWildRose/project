<template>  <!-- 巡检拍照 -->
	<view class="hello">
		<div class="status"></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>巡检拍照</text>
		</div>
		<div class='main'>
			<ul>
				<li>
					<image :src="require('../../../static/dianwei(2).svg')" mode=""></image>
					<text>点位：{{ msg.name }}</text>
				</li>
				<li>
					<image :src="require('../../../static/miaoshu.svg')" mode=""></image>
					<text>编号：{{ msg.dnumber }}</text>
				</li>
			</ul>
			<div class="pic">
				<p>标准照片</p>
				<image :src="msg.plan_url" mode="" @click="preview(msg.plan_url)"></image>
				<div class="upload" @click="upload()" :style="{'background':'url('+ src_brg +') no-repeat 0/100%'}">
					<image :src="src" mode="" v-if="src_brg == 0? true : false "></image>
					<text v-if="src_brg == 0? true : false ">拍照</text>
				</div>
			</div>
			<div v-if='msg.ispaizhao != 0' class='record'>
				<div>
					<image :src="require('../../../static/record.svg')" mode=""></image>
					<text>审批记录:</text>
				</div>
				<u-collapse class='collapse' :accordion="false">
					<u-collapse-item class='item' :title="item.shenpi.name + '\xa0\xa0\xa0' + item.shenpi.create_time" v-for="(item, index) in check" :key="index" :open="true">
						<p>
							<text :class="item.shenpi.state == 1? 'green':'red' ">{{ item.shenpi.state == 1? '合格' : '不合格' }}</text>
							{{ item.shenpi.content == ''? '，无备注' : '，' + item.shenpi.content }}
						</p>
					</u-collapse-item>
				</u-collapse>
			</div>
		</div>
		<div class="save" v-if='msg.ispaizhao == 0? true : false ' @click='save'>保存</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: '',
				check: [],
				src: '../../../static/camera.svg', // 拍照的 svg图标
				src_brg: '',
				uid: '' // 登录用户的id
			}
		},
		onLoad(option) {
			this.id = option.id
			var that = this
			uni.getStorage({
				key: 'userinfo',
				success(res) {
					// console.log(res)
					that.uid = res.data.data.id
				}
			})
		},
		onShow() {
			this.$request('/api/lnspection/RegularInfo', {
				scheme_id: this.id,
				workorder_id: this.id
			}).then(res => {
				// console.log(res)
				this.msg = res.data.data
				this.check = this.msg.shenpidetail
				if(this.msg.ispaizhao == 0) {
					this.src_brg = ''
				} else {
					this.src_brg = this.msg.imgurl
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			upload(){ // 上传或预览图片
				if(this.msg.ispaizhao == 0) {
					this.$upload('/api/index/upload', ['camera']).then(res => {
						this.src_brg = res
						uni.hideLoading()
					})
				} else {
					this.preview(this.msg.imgurl)
				}
			},
			preview(src_) { // 预览图片
				if(src_ == this.msg.plan_url) {
					uni.previewImage({
						urls: [ this.msg.plan_url ]
					})
				} else if(src_ == this.msg.imgurl) {
					uni.previewImage({
						urls: [ this.msg.imgurl ]
					})
				}
			},
			save() { // 保存
				if(this.src_brg == '') {
					uni.showModal({
						content: '请拍照后再进行保存'
					})
					return
				}
				this.$request('/api/lnspection/takepictures', {
					file_id: this.msg.file_id,
					imgurl: this.src_brg,
					ispaizhao: this.msg.ispaizhao,
					lnspection_id: this.msg.id,
					workorder_id: this.id,
					uid: this.uid
				}).then(res => {
					// console.log(res)
					if(res.data.code == 1) {
						var that = this
						uni.showToast({
							title: '保存成功',
							success() {
								setTimeout(function() {
									that.goBack()
								},1000)
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
		height: auto;
		background-color: #F5F6F9;
	}
	.head{
		width: 100%;
		height: 94rpx;
		background-color: #5E79F2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		image{
			width: 45rpx;
			height: 45rpx;
			margin-left: 40rpx;
		}
		text{
			flex-grow: 1;
			text-align: center;
			font-size: 36rpx;
			font-weight: bold;
			margin-left: -100rpx;
			color: white;
		}
	}
	.main{
		background-color: white;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
	}
	ul{
		width: 90%;
		height: auto;
		margin: 0rpx auto;
		li{
			width: 100%;
			height: auto;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			image{
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}
			&:nth-of-type(2){
				image{
					width: 35rpx;
					height: 35rpx;
					margin-left: 4rpx;
				}
			}
		}
	}
	.pic{
		width: 90%;
		margin: 0 auto;
		&>p{
			font-size: 34rpx;
			font-weight: bold;
			margin-bottom: 10rpx;
			margin-top: 30rpx;
		}
		&>image{
			width: 672rpx;
			height: 452rpx;
			border: 1px solid #F2F2F2;
		}
		.upload{
			width: 672rpx;
			height: 452rpx;
			margin-top: 30rpx;
			border: 1px solid #F2F2F2;
			position: relative;
			image{
				width: 120rpx;
				height: 120rpx;
				position: absolute;
				left: 50%;
				margin-left: -60rpx;
				top: 50%;
				margin-top: -90rpx;
				z-index: 999;
			}
			text{
				z-index: 1;
				position: absolute;
				left: 45.5%;
				top: 56%;
			}
		}
	}
	.record{
		width: 90%;
		margin: 20rpx auto;
		height: auto;
		margin-bottom: 20rpx;
		image{
			width: 40rpx;
			height: 40rpx;
			margin-right: 10rpx;
		}
		&>div{
			display: flex;
			align-items: center;
		}
		.collapse{
			.green{
				color: green;
			}
			.red{
				color: red;
			}
		}
	}
	.save{
		width: 100%;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		color: white;
		font-size: 36rpx;
		background-color: #6F7CFF;
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>
