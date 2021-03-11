<template> <!-- 添加点位信息 -->
	<view class="hello">
		<div class="status"></div>
		<div class='goback'>
			<image :src="require('../../static/fanhui(1).png')" mode="" @click='goBack'></image>
			<text>添加点位信息</text>
		</div>
		<div class='main'>
			<div>
				<p>项目名称</p>
				<input type="text" value="" v-model="pname" disabled/>
			</div>
			<div>
				<p>点位名称</p>
				<input type="text" value="" v-model="name"/>
			</div>
			<div>
				<p>点位级别</p>
				<picker @change="sex" class='dw' :value="index" :range="list" :range-key="'label'">
					<image src="../../static/xiala.svg" mode=""></image>
					<label class="" v-if="bol_1">{{list[index].label}}</label>
				</picker>
			</div>
			<div>
				<p>点位图片</p>
				<div class='image'>
					<!-- 使用背景图不能使用src 。后续有继续添加操作，要清空路径值等，src会有缓存，虽然值是空的但是图片依然存在于界面-->
					<image :style="{background:'url(' + src + ') no-repeat 0 0/100% 100%'}" mode="" @click='upload'></image>
					<text v-if="bol" @click='upload'>+</text>
				</div>
			</div>
			<button class="btn" @click="sub" v-if='isFocus'>提交</button>
		</div>
		<u-modal v-model="show" cancel-text="返回" confirm-text="继续添加" :show-cancel-button='true' :content="content" @cancel='close' @confirm='contin' ></u-modal>
		<u-modal v-model="show2" :content="content2"></u-modal>
	</view>
</template>

<script>
	
	export default {
		components:{
			
		},
		data() {
			return {
				show: false,
				show2: false,
				content: '添加成功',
				content2: '请将信息填写完整',
				bol: true,
				index: 0,
				bol_1: false,
				list: [
				  {
				    label: '一级点位',
				    value: '1'
				  },
				  {
				    label: '二级点位',
				    value: '2'
				  },
				  {
				    label: '三级点位',
				    value: '3'
				  }
				],
				
				project_id: '',
				pname: '', // 项目名称
				name: '', // 点位名称
				levellevel: '', // 点位级别
				src: '', // 点位图片
				isFocus: true
			}
		},
		onLoad(option) {
			this.project_id = option.project_id
			this.$request('/api/project/Project_info', {
				project_id: this.project_id
			}).then(res => {
				// console.log(res)
				this.pname = res.data.data.pname
			})
		},
		mounted(){
			uni.onKeyboardHeightChange(res => {
				if(res.height > 0) {
					this.isFocus = false
				} else {
					this.isFocus = true
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			close() {
				this.goBack()
			},
			contin() {// 继续添加
				this.name = '' // 清空点位名称
				this.level = '' // 清空点位级别
				this.bol_1 = false 
				this.src = '' // 清空点位图片
				this.bol = true
			},
			sex(e) {
				this.index = e.target.value
				this.level = this.list[this.index].value // 点位级别  1代表一级，2代表二级，3代表三级
				this.bol_1 = true
			},
			upload() {
				this.$upload('/api/index/upload').then(res => {
					this.src = res
					this.bol = false
					uni.hideLoading()
				})
			},
			sub() {
				if(this.name == '' || this.project_id == '' || this.level == '' || this.src == '') {
					this.show2 = true
				} else {
					this.$request('/api/file/addFile', {
						project_id: this.project_id, // 项目id
						name: this.name, // 点位名称
						level: this.level, // 点位级别
						url: this.src, // 点位图片
					}).then(res => {
						// console.log(res)
						this.show = true
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
		.goback{
			width: 100%;
			height: 92rpx;
			background: #5C7CF4;
			display: flex;
			align-items: center;
			justify-content: space-between;
			image{
				width: 50rpx;
				height: 50rpx;
				margin-left: 40rpx;
			}
			text{
				flex-grow: 1;
				text-align: center;
				margin-left: -80rpx;
				font-weight: 800;
				font-size: 40rpx;
				color: white;
			}
		}
	}
	.main{
		width: 100%;
		div{
			width: 90%;
			height: 76rpx;
			line-height: 76rpx;
			margin: 40rpx auto;
			font-size: 34rpx;
			display: flex;
			justify-content: space-between;
			input{
				width: 70%;
				height: 72rpx;
				border: 1px solid #D5D5D5;				
				text-indent: 20rpx;
				margin-right: 20rpx;
				margin-right: 20rpx;
			}
			&:nth-of-type(3) {
				position: relative;
				image{
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					right: 40rpx;
					top: 50%;
					margin-top: -15rpx;
				}
				.dw{
					width: 70%;
					text-align: center;
					border: 1px solid #D5D5D5;
					margin-right: 20rpx;
				}
			}
			&:nth-last-of-type(1) {
				height: 230rpx;
				p{
					width: 41%;
				}
				.image{
					width: 100%;
					margin-right: 60rpx;
					position: relative;	
					image{
						width: 44%;
						height: 200rpx;
						border: 2px solid #F7F7F7;
					}
					text{
						font-size: 100rpx;
						position: absolute;
						left: 17%;
						top: 26%;
						color: #565656;
					}
				}
			}
			p{
				text-indent: 20rpx;
			}
		}
		.btn{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			background: #5C7CF4;
			color: white;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 0;
		}
	}
</style>
