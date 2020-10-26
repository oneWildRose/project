<template> <!-- 添加点位信息 -->
	<view class="hello">.
		<div class='goback'>
			<image :src="require('../../static/fanhui(1).png')" mode="" @click='goBack'></image>
			<div>
				<text>添加点位信息</text>
			</div>
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
			<button class="btn" @click="sub">提交</button>
		</div>
	</view>
</template>

<script>
	
	export default {
		components:{
			
		},
		data() {
			return {
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
				
			}
		},
		onLoad(option) {
			// console.log(option)
			this.project_id = option.project_id
			this.$request('/api/index/Project_info', {
				project_id: this.project_id
			}).then(res => {
				// console.log(res)
				this.pname = res.data.data.pname
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			sex(e) {
				this.index = e.target.value
				this.level = this.list[this.index].value // 点位级别  1代表一级，2代表二级，3代表三级
				this.bol_1 = true
			},
			upload() {
				uni.chooseImage({
					count: 1, //最多选取一张图片
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
								this.src = uploadFileRes.data // 上传的图片路径
								this.bol = false
				            }
				        })
				    }
				});
			},
			sub() {
				// console.log(this.name, this.project_id, this.level, this.src)
				if(this.name == '' || this.project_id == '' || this.level == '' || this.src == '') {
					this.$showModal({
						title: '提示',
						concent: '请将信息填写完整',
						cancelVal: '返回',
						confirmVal: '确定',
						cancelColor: '#A09D9D'
					})
				} else {
					this.$request('/api/index/addFile', {
						project_id: this.project_id, // 项目id
						name: this.name, // 点位名称
						level: this.level, // 点位级别
						url: this.src, // 点位图片
					}).then(res => {
						// console.log(res)
						this.$showModal({
							title: '提示',
							concent: res.data.msg,
							cancelVal: '返回',
							confirmVal: '继续添加',
							cancelColor: '#A09D9D'
						}).then(res=>{
							// 继续添加
							this.name = '' // 清空点位名称
							this.level = '' // 清空点位级别
							this.bol_1 = false 
							this.src = '' // 清空点位图片
							this.bol = true
						}).catch(cancel=>{
							// 返回
							this.goBack()
						})
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.hello{
		width: 100%;
		height: 100%;
		background: url(../../static/brg.jpg) no-repeat;
		background-size: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		.goback{
			padding-left: 40rpx;
			padding-right: 40rpx;
			background: transparent;
			width: 90%;
			height: 320rpx;
			line-height: 120rpx;
			margin: 0px auto;
			text-align: center;
			position: relative;
			color: white;
			font-size: 36rpx;
			&>image{
				width: 52rpx;
				height: 52rpx;
				position: absolute;
				left: 40rpx;
				top: 50%;
				margin-top: -120rpx;
			}
			div{
				width: 400rpx;
				height: 80rpx;
				line-height: 80rpx;
				position: absolute;
				left: 40rpx;
				top: 42%;
				font-weight: 800;
				font-size: 40rpx;
				display: flex;
				align-items: center;
			}
		}
	}
	.main{
		width: 100%;
		height: 81.8%;
		background: white;
		border-radius: 40rpx;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		position: absolute;
		top: 280rpx;
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
			width: 600rpx;
			height: 100rpx;
			line-height: 100rpx;
			background: #5C7CF4;
			color: white;
			border-radius: 60rpx;
			position: fixed;
			bottom: 300rpx;
			left: 50%;
			margin-left: -300rpx;
		}
	}
</style>
