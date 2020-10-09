<template> <!-- 上传单个苗木信息 -->
	<view class="hello">
		<div class='goback'>
			<image :src="require('../../static/fanhui(1).png')" mode="" @click='goBack'></image>
			<div>
				<text>上传项目苗木清单</text>
			</div>
		</div>
		<div class='main'>
			<div>
				<p>项目名称</p>
				<input type="text" value="" v-model="pname"/>
			</div>
			<div>
				<p>苗木名称</p>
				<input type="text" value="" v-model="name"/>
			</div>
			<div>
				<p>苗木数量</p>
				<input type="text" value="" v-model="num"/>
				<picker @change="sex" class='dw' :value="index" :range="list" :range-key="'label'">
					<label class='' v-if='bol1' style="font-size: 34rpx;">单位<text style="font-size: 18rpx;">(请选择)</text></label>
					<label class="" v-if="bol_1">{{list[index].label}}</label>
				</picker>
			</div>
			<div>
				<p>位置描述</p>
				<input type="text" value="" v-model="site"/>
			</div>
			<div>
				<p>添加图片</p>
				<div class='image'>
					<image :src="src" mode="" @click='upload'></image>
					<text v-if="bol" @click='upload'>+</text>
				</div>
			</div>
			<button class="btn" @click="sub">上传</button>
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
				bol1: true,
				bol_1: false,
				list: [
				  {
				    label: '颗',
				    value: '1'
				  },
				  {
				    label: '株',
				    value: '1'
				  }
				],
				
				project_id: '',
				pname: '',
				name: '',
				num: '',
				unit: '',
				site: '',
				src: '',
				
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
				this.unit = this.list[this.index].label // 单位
				this.bol1 = false,
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
				// console.log(this.name, this.project_id, this.num, this.unit, this.src, this.site)
				this.$request('/api/index/addTree', {
					name: this.name, // 苗木名称
					project_id: this.project_id, // 项目id
					num: this.num, // 数量
					unit: this.unit, // 单位
					files: this.src, // 图片路径
					site: this.site, // 位置
				}).then(res => {
					console.log(res)
					uni.showModal({
						content: res.data.msg
					})
					this.goBack()
				})
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
				font-weight: 600;
				font-size: 38rpx;
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
			}
			&:nth-of-type(3) {
				input{
					width: 44%;
					margin-right: -30rpx;
				}
				.dw{
					width: 22.5%;
					text-align: center;
					border: 1px solid #D5D5D5;
				}
			}
			&:nth-of-type(5) {
				height: 230rpx;
				p{
					width: 41%;
				}
				.image{
					width: 100%;
					position: relative;					
					image{
						width: 44%;
						height: 200rpx;
						border: 2px solid #F7F7F7;
						background-color: #F2F3F7;
					}
					text{
						font-size: 100rpx;
						position: absolute;
						left: 17%;
						top: 76%;
						color: #BFBFBF;
					}
				}
			}
			p{
				text-indent: 20rpx;
			}
		}
		.btn{
			width: 70%;
			height: 80rpx;
			line-height: 80rpx;
			background: #5C7CF4;
			color: white;
			border-radius: 40rpx;
			position: absolute;
			bottom: 60rpx;
			left: 50%;
			margin-left: -250rpx;
		}
	}
</style>
