<template> <!-- 项目信息 -->
	<view class="hello">
		<div class="status"></div>
		<div class='goback'>
			<image :src="require('../../static/fanhui(1).png')" mode="" @click='goBack'></image>
			<p>{{ msg.pname }}</p>
			<div>
				<image :src="require('../../static/9-17icon/zuijinshijian.svg')" mode=""></image>
				<text>最近更新：{{ msg.update_time }}</text>
			</div>
		</div>
		<div class='main'> <!-- Tab -->
			<div class="title">
				<div v-show='num != 2' v-for="(item, index) in tabs" :key="index" :class="{active:num==index}" @click="table(index)">
					<text>{{ item }}</text>
					<div :class="{ block:num == index }"></div>
				</div>
			</div>
			<ul v-show="num == 0"> <!-- 基本信息 -->
				<li>
					<image :src="require('../../static/9-17icon/project.svg')"></image>
					<p>项目名称：{{ msg.pname }}</p>
				</li>
				<li>
					<image :src="require('../../static/9-17icon/gongsi.svg')"></image>
					<p>企业名称：{{ msg.enterprie_name }}</p>
				</li>
				<li>
					<image :src="require('../../static/9-17icon/ress.svg')"></image>
					<p>项目地址：{{ msg.province + msg.city + msg.area + msg.address }}</p>
				</li>
				<li>
					<image :src="require('../../static/9-17icon/mianji.svg')"></image>
					<p>项目管理面积：{{ acreage }}</p>
				</li>
				<li>
					<image :src="require('../../static/9-17icon/intime.svg')"></image>
					<p>项目竣工时间：{{ msg.dtime }}</p>
				</li>
				<li>
					<image :src="require('../../static/9-17icon/intime.svg')"></image>
					<p>项目交付时间：{{ msg.time }}</p>
				</li>
				<li>
					<image :src="require('../../static/9-17icon/intime.svg')"></image>
					<p>项目进场时间：{{ msg.ctime }}</p>
				</li>
				<li>
					<image :src="require('../../static/9-17icon/fuzeren.svg')"></image>
					<p>负责人：{{ msg.user_name }}</p>
				</li>
				<li>
					<p>项目平面图：</p>
					<image :src="msg.plan_url == null? src : msg.plan_url" mode="" @click="preview"></image>
				</li>
				<div class='change' @click='goChange'>
					<image :src="require('../../static/xiugai.svg')" mode=""></image>
					<text>修改信息</text>
				</div>
			</ul>
			<div class='tree' v-show='num == 1'> <!-- 点位信息 -->
				<div class='search'>
					<input type="search" value="" placeholder="搜索点位" />
					<image :src="require('../../static/search.svg')" mode=""></image>
				</div>
				<div class='kind'>
					<ul>
						<li v-for="(item, index) in list" :key='index' @click='goTreeMsg(item.id)' >
							<image :src="item.url" mode=""></image>
							<div>
								<div>
									<text>点位名称：{{ item.name }}</text>
									<text>点位级别：{{ item.levelname }}</text>
								</div>
							</div>
							<image :src="require('../../static/jinru.svg')"></image>
						</li>
						<li style='width: 100%;height: 100rpx;box-shadow: none;'></li> <!-- 占位，防止下面的添加按钮覆盖li -->
					</ul>
				</div>
				
				<!-- 添加点位按钮 -->
				<button type="default" class='upload' @click="goUpload">添加点位</button>
			</div>
			
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: ['基本信息', '点位信息'],
				num: 0,
				msg: '',
				acreage: '',
				src: '../../static/zanwu.png',
				list: '',
				project_id: ''
			}
		},
		onLoad(option) {
			this.project_id = option.project_id
		},
		onShow() {
			this.$request('/api/index/Project_info', { // 项目信息
				project_id: this.project_id
			}).then(res => {
				this.msg = res.data.data
				// console.log(this.msg)
				if (this.msg.company == 0) { // 单位 0代表亩  1代表平方米
					this.acreage = this.msg.measure + this.msg.unit
				} else {
					this.acreage = this.msg.measure + this.msg.unit
				}
				this.$request('/api/index/selectCity', {
					pid: 0
				}).then(res => {
					// console.log(res)
					this.province = res.data.data
					for(var i = 0; i <= res.data.data.length; i++) {
						if (res.data.data[i].id == this.msg.province) {
							this.msg.province = res.data.data[i].shortname
							// console.log(this.msg.province) // 省
						}
					}
				})
				this.$request('/api/index/selectCity', {
					pid: this.msg.province
				}).then(res => {
					// console.log(res)
					this.city = res.data.data
					for(var i = 0; i <= res.data.data.length; i++) {
						if (res.data.data[i].id == this.msg.city) {
							this.msg.city = res.data.data[i].shortname
							// console.log(this.msg.city) // 市
						}
					}
				})
				this.$request('/api/index/selectCity', {
					pid: this.msg.city
				}).then(res => {
					// console.log(res)
					this.area = res.data.data
					for(var i = 0; i <= res.data.data.length; i++) {
						if (res.data.data[i].id == this.msg.area) {
							this.msg.area = res.data.data[i].shortname
							// console.log(this.msg.area) // 区
						}
					}
				})
			})
			this.$request('/api/index/filelist', { // 点位信息
				project_id: this.project_id
			}).then(res => {
				// console.log(res)
				this.list = res.data.data
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			table(index) {
				this.num = index
			},
			goTreeMsg(file_id) {
				uni.navigateTo({
					url: '../tree_msg/tree_msg?file_id=' + file_id
				})
			},
			goUpload() {
				uni.navigateTo({
					url: '../single/single?project_id=' + this.project_id
				})
			},
			goChange() {
				uni.navigateTo({
					url: '../change/change?project_id=' + this.project_id
				})
			},
			preview() {
				uni.previewImage({
					urls: [ this.msg.plan_url ]
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		width: 100%;
		height: 1200rpx;
		background: url(../../static/9-17icon/bg2.jpg) no-repeat;
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
			p{
				position: absolute;
				left: 40rpx;
				top: 30%;
				font-size: 34rpx;
				font-weight: 600;
			}
			div{
				width: 400rpx;
				height: 80rpx;
				line-height: 80rpx;
				position: absolute;
				left: 40rpx;
				top: 56%;
				color: #d3d8e7;
				font-size: 26rpx;
				display: flex;
				align-items: center;
				image{
					width: 36rpx;
					height: 36rpx;
					margin-right: 10rpx;
				}
			}
		}
		
		.main{
			width: 100%;
			height: 100%;
			background: white;
			border-radius: 40rpx;
			position: absolute;
			top: 326rpx;
			.active{
				color: #3F5DE3;
			}
			
			.title{
				width: 90%;
				margin: 0 auto;
				height: 148rpx;
				display: flex;
				align-items: center;
				font-size: 32rpx;
				&>div{
					width: 180rpx;
					position: relative;
					div{
						width: 64rpx;
						border: 1px solid #3F5DE3;
						position: absolute;
						bottom: -12rpx;
						left: 50%;
						margin-left: -60rpx;
						display: none;
						&.block{
							display: block;
						}
					}
				}
			}
			
			ul{
				width: 90%;
				height: 1020rpx;
				margin: 0 auto;
				border: 1px solid #E8E8E8;
				border-radius: 20rpx;
				li{
					width: 100%;
					height: 80rpx;
					display: flex;
					align-items: center;
					font-size: 32rpx;
					font-weight: 500;
					p{
						display: flex;
						justify-content: space-around;
					}
					image{
						width: 34rpx;
						height: 34rpx;
						vertical-align: center;
						margin-right: 10rpx;
						margin-left: 10rpx;
					}
					&:nth-of-type(9){
						height: auto;
						display: block;
						text-indent: 20rpx;
						p{
							display: block;
						}
						image{
							width: 90%;
							height: 300rpx;
							margin: 20rpx auto;
							display: block;
						}
					}
				}
				.change{
					width: 21%;
					height: 50rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 0rpx auto;
					image{
						width: 40rpx;
						height: 40rpx;
					}
					text{
						font-size: 26rpx;
						color: #3F5DE3;
						font-weight: 700;
					}
				}
			}
			
			.tree{
				width: 90%;
				height: 800rpx;
				margin: 0 auto;
				.search{
					width: 100%;
					height: 80rpx;
					position: relative;
					input{
						width: 100%;
						height: 100%;
						line-height: 80rpx;
						border: 1px solid #E6E6E6;
						border-radius: 20rpx;
						text-align: center;
					}
					image{
						width: 40rpx;
						height: 40rpx;
						position: absolute;
						left: 20rpx;
						top: 50%;
						margin-top: -20rpx
					}
				}
				.kind{
					width: 100%;
					height: 90%;
					ul{
						width: 100%;
						height: 100%;
						margin: 0;
						padding: 0;
						border: none;
						li{
							width: 100%;
							height: 144rpx;
							display: flex;
							justify-content: space-around;
							align-items: center;				
							margin-top: 20rpx;
							border-radius: 20rpx;
							box-shadow: #adadad 2px 1px 4px 0px;
							image:nth-of-type(1){
								width: 112rpx;
								height: 112rpx;
							}
							image:nth-of-type(2){
								width: 40rpx;
								height: 40rpx;
							}
							&>div{
								width: 460rpx;
								height: 112rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								div{
									display: flex;
									flex-direction: column;
									text-align: left;
									text:nth-of-type(1){
										font-size: 32rpx;
										font-weight: 500;
										margin-bottom: 16rpx;
									}
									text:nth-of-type(2){
										font-size: 26rpx;
										color: #656D6B;
									}									
								}
							}
						}
					}
				}
			}
			
			.upload{
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				position: fixed;
				bottom: 0;
				left: 0;
				background-color: #3F5DE3;
				color: white;
				border-radius: 0;
			}
		
		}
	}
</style>
