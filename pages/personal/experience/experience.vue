<template>  <!-- 项目经历（专家） -->
	<view>
		<div class="status" style='background: white;'></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(3).png')" mode="" @click="goBack"></image>
			<text>项目经历</text>
			<div @click='save_top' v-if='dir != 2'>{{ dir == 0? '确定' : '保存' }}</div>
			<div v-if='dir == 2' style='color:transparent'>哈哈</div> <!-- 占位用的 -->
		</div>
		<ul>
			<li>
				<p>项目名称<text>*</text></p>
				<div>
					<input type="text" value="" placeholder='请输入项目名称' v-model="pname"/>
				</div>
			</li>
			<li>
				<p>担任角色<text>*</text></p>
				<div>
					<input type="text" value="" placeholder='请输入' v-model="role"/>
				</div>
			</li>
			<li class='miaoshu'>
				<p>项目描述</p>
				<textarea value="" placeholder='请输入' v-model="value" auto-height maxlength='-1' @input='text' />
			</li>
			<li>
				<p>案例图片<text>*</text></p>
				<div v-for='(item, index) in urlArr' :key='index' class='imgarr'
					:style="{background:'url('+ item +') no-repeat 0 0/100% 100%'}">
					<image @click="del(index)" :src="require('../../../static/delete.svg')" mode=""></image>
				</div>
				<div @click='upload' class='upload'>
					<text v-if='bol'>+</text>
				</div>
			</li>
		</ul>
		<div class='btm' v-if='dir == 2'>
			<div class='delete' @click='shanchu'>删除</div>
			<div class='save_btm' @click='save_btm'>保存</div>
		</div>
		<u-toast ref="uToast" />
		<u-modal v-model="show" :content="content" :show-cancel-button="true" @confirm="confirm"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				content: '确定删除此项目经历？',
				isClick: true,
				uid: '', // 用户id
				id: '', // 项目经历id
				dir: '',
				cont: '请输入',
				bol: true,
				urlArr: [],
				pname: '',
				role: '',
				value: '',
				msg: '',
				wanshan_msg: []
			}
		},
		onLoad(option) {
			this.dir = option.dir // 0代表是从完善履历页进来的，1是从个人中心的专家履历页的加号+点进来的，2是专家履历页点击进来修改信息
			this.uid = option.uid // 用户id
			if(this.dir == 2) {
				this.id = option.id // 项目经历id
				this.$request('/api/index/edit_record_project', {
					record_id: this.id // 项目经历id
				}).then(res => {
					// console.log(res)
					this.urlArr = JSON.parse(res.data.data.images)
					this.pname = res.data.data.project_name
					this.role = res.data.data.role
					this.value = res.data.data.details
				})
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			text(e) {
				this.value = e.detail.value
			},
			goDescribe() { // 项目描述
				uni.navigateTo({
					url: '../describe/describe?uid=' + this.uid
				})
			},
			del(index) { // 图片右上角删除按钮
				this.urlArr.splice(index, 1)
			},
			shanchu() { // 删除该项目，弹出确认框
				this.show = true
			},
			confirm() { // 确认删除，执行该操作
				this.$request('/api/index/record_project_del', {
					id: this.id
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
							position: 'bottom'
						})
					}
				})
			},
			upload() {
				if(this.isClick == false) {return}
				this.isClick = false
				this.$upload('/api/index/upload').then(res => {
					this.urlArr.push(res)
					this.isClick = true
					uni.hideLoading()
				})
			},
			save_top() { // head部分的保存确定按钮
				var that = this
				if(this.isClick == false) {return}
				this.isClick = false
				if(this.pname == '' || this.role == '' || this.urlArr == 0) { 
					this.$refs.uToast.show({ // 项目名称、角色、案例图片为必填项。描述选填
						title: '请将信息填写完整',
						type: 'error',
						duration: 1200,
						position: 'bottom',
						callback: function() {
							that.isClick = true
						}
					})
					return ;
				}
				this.$request('/api/index/record_project', {
					uid: this.uid, // 用户uid
					project_name: this.pname,
					role: this.role,
					details: this.value,
					images: JSON.stringify(this.urlArr)
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
			},
			save_btm() { // 底部的保存
				var that = this
				if(this.isClick == false) {return}
				this.isClick = false
				if(this.pname == '' || this.role == '' || this.urlArr == 0) {
					this.$refs.uToast.show({
						title: '请将信息填写完整',
						type: 'error',
						duration: 1200,
						position: 'bottom',
						callback: function() {
							that.isClick = true
						}
					})
					return ;
				}
				this.$request('/api/index/edit_record_project_sub', {
					id: this.id, // 项目经历id
					project_name: this.pname,
					role: this.role,
					details: this.value,
					images: JSON.stringify(this.urlArr)
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
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			width: 46rpx;
			height: 46rpx;
			margin-left: 40rpx;
		}
		text{
			flex-grow: 1;
			text-align: center;
			margin-left: 12rpx;
			font-size: 36rpx;
			font-weight: bold;
		}
		div{
			color: #6F7CFF;
			margin-right: 40rpx;
			font-size: 32rpx;
		}
	}
	ul{
		width: 90%;
		height: auto;
		margin: 0 auto;
		li{
			width: 100%;
			height: 160rpx;
			border-bottom: 1px solid #EAEAEA;
			margin-bottom: 20rpx;
			&>p{
				width: 23%;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 34rpx;
				font-weight: bold;
				position: relative;
				text{
					color: red;
					position: absolute;
					top: 0;
					right: 0;
				}
			}
			&>div{
				width: 100%;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				input{
					width: 90%;
					height: 100%;
				}
				image{
					width: 34rpx;
					height: 34rpx;
					margin-right: 10rpx;
				}
			}
			&.miaoshu{
				height: auto;
				textarea{
					width: 100%;
					min-height: 80rpx;
					line-height: 80rpx;
				}
			}
			&:nth-last-of-type(2){
				div{
					width: 99.5%;
					height: 80rpx;
					line-height: 80rpx;
					font-size: 32rpx;
					color: #7c7c7c;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
			&:nth-last-of-type(1){
				border: none;
				height: auto;
				&::after{
					content: '';
					height: 0;
					clear: both;
					visibility: hidden;
					display: block;
				}
				&>div{
					width: 160rpx;
					height: 160rpx;
					float: left;
					margin-right: 20rpx;
				}
				.upload{
					line-height: 140rpx;
					margin-top: 20rpx;
					font-size: 80rpx;
					border: 1px dashed #CACACA;
					position: relative;
					text{
						position: absolute;
						left: 36%;
					}
				}
				.imgarr{
					width: 160rpx;
					height: 160rpx;
					margin-top: 20rpx;
					position: relative;
					&>image{
						width: 36rpx;
						height: 36rpx;
						position: absolute;
						top: -20rpx;
						right: -25rpx;
						background: white;
						border-radius: 50%;
					}
				}
			}
		}
	}
	.btm{
		width: 90%;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 80rpx auto;
		.delete{
			width: 200rpx;
			height: 96rpx;
			text-align: center;
			line-height: 96rpx;
			background: #EAEBF0;
			border-radius: 8rpx;
		}
		.save_btm{
			width: 452rpx;
			height: 96rpx;
			line-height: 96rpx;
			text-align: center;
			background-color: #5E79F2;
			color: white;
			border-radius: 8rpx;
		}
	}
</style>
