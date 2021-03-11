<template>  <!-- 修改苗木信息 -->
	<view>
		<div class="status"></div>
		<div class="goback">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>修改苗木信息</text>
		</div>
		<ul>
			<li>
				<p>苗木名称</p>
				<input type="text" :value="msg.name" disabled/>
			</li>
			<li>
				<p>数量</p>
				<input type="text" :value="msg.num" />
				<div>颗</div>
			</li>
			<li>
				<p>当前状态</p>
				<picker @change="statu" class='statu' :value="status_index" :range="list" :range-key="'label'">
					<label class='' v-if='bol'>{{ status }}</label>
					<label class="" v-if="bol_">{{ list[status_index].label }}</label>
				</picker>
				<image :src="require('../../../static/xiala.svg')" mode=""></image>
			</li>
			<li>
				<p>年份(年)</p>
				<input type="text" value="" />
			</li>
			<li>
				<p>高度(cm)</p>
				<input type="text" :value="msg.height" />
			</li>
			<li>
				<p>冠幅(cm)</p>
				<input type="text" :value="msg.crown" />
			</li>
			<li>
				<p>胸径(cm)</p>
				<input type="text" :value="msg.perimeter" />
			</li>
			<li>
				<p>苗木图片</p>
				<div v-for='(item, index) in msg.file' :key='index' class='imgarr'
					:style="{background:'url('+ item +') no-repeat 0 0/100% 100%'}">
					<text @click="del(index)">×</text>
				</div>
				<div @click='upload' class='upload'>
					<text v-if='bol2'>+</text>
				</div>
			</li>
		</ul>
		<div class='save' @click='save'>保存</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: '正常', // 当前状态
				status_index: 0, // 状态标识
				bol: true,
				bol_: false,
				list: [{label: '正常',value: '1'},{label: '不正常',value: '2'}],
				bol2: true,
				url: '',
				id: '',
				msg: ''
			}
		},
		onLoad(option) {
			this.id = option.id // 苗木id
			this.$request('/api/Seedling/setSeedlingInfo', {
				seedling_id: this.id
			}).then(res => {
				this.msg = res.data.data
				// console.log(this.msg)
			})
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			del(index) { // 图片右上角删除按钮
				this.msg.file.splice(index, 1)
			},
			statu(e) {
				this.status_index = e.target.value
				this.status = this.list[this.status_index].label
				this.bol = false,
				this.bol_ = true
			},
			upload() {
				this.$upload('/api/index/upload').then(res => {
					this.msg.file.push(res)
					uni.hideLoading()
				})
			},
			save() {
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.goback{
		width: 100%;
		height: 92rpx;
		background: #5C7CF4;
		display: flex;
		align-items: center;
		image{
			width: 50rpx;
			height: 50rpx;
			margin-left: 40rpx;
		}
		text{
			flex-grow: 1;
			text-align: center;
			color: white;
			font-size: 34rpx;
			font-weight: bold;
			margin-left: -80rpx;
		}
	}
	ul{
		width: 90%;
		height: auto;
		margin: 30rpx auto;
		li{
			width: 100%;
			height: 72rpx;
			margin-bottom: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&>p{
				font-size: 32rpx;
			}
			input{
				width: 476rpx;
				height: 90%;
				border: 1px solid #E9E9E9;
				text-indent: 20rpx;
				border-radius: 8rpx;
			}
			&:nth-of-type(1){
				input{
					background: #F2F2F2;
				}
			}
			&:nth-of-type(2){
				input{
					width: 300rpx;
				}
				&>div{
					width: 156rpx;
					background: #F2F2F2;
					height: 90%;
					margin-left: -110rpx;
					line-height: 66rpx;
					text-align: center;
				}
			}
			&:nth-of-type(3){
				position: relative;
				.statu{
					width: 476rpx;
					height: 90%;
					line-height: 66rpx;
					border: 1px solid #E9E9E9;
					text-indent: 20rpx;
					border-radius: 8rpx;
				}
				image{
					width: 26rpx;
					height: 26rpx;
					position: absolute;
					right: 30rpx;
					top: 50%;
					margin-top: -13rpx;
				}
			}
			&:nth-last-of-type(1){
				border: none;
				display: block;
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
					line-height: 160rpx;
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
					text{
						display: block;
						width: 36rpx;
						height: 36rpx;
						line-height: 36rpx;
						text-align: center;
						border-radius: 50%;
						color: white;
						background-color: red;
						font-weight: bold;
						position: absolute;
						top: -16rpx;
						right: -16rpx;
					}
				}
			}
		}
	}
	.save{
		width: 100%;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		color: white;
		font-size: 32rpx;
		background-color: #5C7CF4;
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>
