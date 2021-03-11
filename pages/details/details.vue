<template> <!-- 项目信息 -->
	<view class="hello">
		<div class="status"></div>
		<div class='goback'>
			<image :src="require('../../static/fanhui(1).png')" mode="" @click='goBack'></image>
			<p>{{ project_id == ''? '暂无项目' : msg.pname }}</p>
			<div>
				<image :src="require('../../static/9-17icon/zuijinshijian.svg')" mode=""></image>
				<text>最近更新：{{ msg.update_time }}</text>
			</div>
		</div>
		<div class='main'>
			<div v-if="project_id == ''" 
				style='color: #808080;width: 100%;text-align: center;margin-top: 20rpx;'>
				请联系最高权限管理员在PC端后台创建项目
			</div>
			<div class='msg' v-if="project_id == ''? false : true ">  <!-- 基本信息 -->
				<div class='tit'>
					<p>基本信息</p>
					<div @click='goProjectmsg'>
						<text>更多</text>
						<image :src="require('../../static/jinru.svg')" mode=""></image>
					</div>
				</div>
				<ul>
					<li>
						<image :src="require('../../static/9-17icon/project.svg')"></image>
						<p>项目名称：{{ msg == ''? '...' : msg.pname }}</p>
					</li>
					<li>
						<image :src="require('../../static/9-17icon/ress.svg')"></image>
						<p class='address'>项目地址：{{ msg == ''? '...' : msg.provinceNmae + msg.cityeNmae + msg.areaNmae + msg.address }}</p>
					</li>
					<li>
						<image :src="require('../../static/9-17icon/fuzeren.svg')"></image>
						<p>负责人：{{ shenfen == null? '暂无':shenfen }}</p>
					</li>
					<li>
						<image :src="require('../../static/9-17icon/intime.svg')"></image>
						<p>项目竣工时间：{{ msg == ''? '...' : msg.dtime }}</p>
					</li>
				</ul>
			</div>
			<div class='list' v-for="(item, index) in list" :key='index' v-if="project_id == ''? false : true "> <!-- 点位信息、专家方案、品质监控-->
				<div class='tit'>
					<div>
						<image :src="item.src" mode=""></image>
						<text>{{ item.title }}</text>
					</div>
					<div @click='item.gonext'>
						<text>查看</text>
						<image :src="require('../../static/jinru.svg')" mode=""></image>
					</div>
				</div>
				<p>{{ item.content }}</p>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isshenfen: '',
				shenfen: '',
				msg: '',
				acreage: '',
				list: [
					{
						title: '点位信息',
						src: '../../static/icon_point.svg',
						content: '查看点位信息以及苗木信息',
						gonext: this.goPointmsg
					},
					{
						title: '专家方案',
						src: '../../static/liebiao.svg',
						content: '查看专家制作的方案/指定专家制作方案',
						gonext: this.goPlan
					}
				],
				project_id: '',
				province_num: 0,
				city_num: 0,
				area_num: 0,
			}
		},
		onLoad(option) {
			this.project_id = option.project_id
			this.id = option.id
			// console.log(this.project_id)
		},
		onShow() {
			var that = this
			this.$request('/api/project/Project_info', { // 项目信息
				project_id: this.project_id
			}).then(res => {
				// console.log(res)
				this.msg = res.data.data
				this.$request('/api/index/infoIndex', { // 取到身份
					uid: this.id
				}).then(res => {
					this.isshenfen = res.data.data.isshenfen
					if(this.isshenfen == 1 || this.isshenfen == 2) {// 甲方
						this.shenfen = this.msg.jname
					} else if(this.isshenfen == 3 || this.isshenfen == 4){// 乙方
						this.shenfen = this.msg.yname
					}
					if(this.isshenfen != 4 && this.list.length == 2) {
						let obj = {
							title: '品质监控',
							src: '../../static/pinzhi(1).svg',
							content: '查看项目每天上传的照片',
							gonext: this.goQuality
						}
						this.list.push(obj)
					}
				})
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goProjectmsg() { // 基本信息
				uni.navigateTo({
					url: './projectMsg/projectMsg?project_id=' + this.project_id + '&id=' + this.id
				})
			},
			goPointmsg() { // 点位信息
				uni.navigateTo({
					url: './pointMsg/pointMsg?project_id=' + this.project_id
				})
			},
			goPlan() { // 专家方案
				uni.navigateTo({
					url: './plan/plan?project_id=' + this.project_id + '&id=' + this.id
				})
			},
			goQuality() { // 品质监控
				uni.navigateTo({
					// url: '../ind_provider/quality/quality?project_id=' + this.project_id
					url: '../approvalQuality/approvalQuality?project_id=' + this.project_id + '&uid=' + this.id
				})
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
			background: #5E79F2 url(../../static/9-17icon/bg2.jpg) no-repeat;
			background-size: 100%;
			background-position: 0 -60rpx;
			width: 100%;
			height: 260rpx;
			line-height: 120rpx;
			margin: 0px auto;
			text-align: center;
			position: relative;
			color: white;
			font-size: 36rpx;
			&>image{
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				left: 40rpx;
				top: 54%;
				margin-top: -120rpx;
			}
			p{
				position: absolute;
				left: 48rpx;
				top: 30%;
				font-size: 38rpx;
				font-weight: bold;
			}
			div{
				width: auto;
				height: 80rpx;
				line-height: 80rpx;
				position: absolute;
				left: 48rpx;
				top: 58%;
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
			max-height: 79.5%;
			overflow-y: scroll;
			background: white;
			&::-webkit-scrollbar {
				display: none; //隐藏滚动条
			}
			.msg{
				width: 94%;
				margin: 40rpx auto;
				border-radius: 8rpx;
				height: 428rpx;
				background: white;
				box-shadow: #b3b3b3 0 0 6rpx 0;
				.tit{
					width: 100%;
					height: 96rpx;
					border-bottom: 1px solid #EFEFEF;
					display: flex;
					justify-content: space-between;
					align-items: center;
					p{
						font-weight: bold;
						font-size: 33rpx;
						text-indent: 40rpx;
					}
					&>div{
						font-size: 30rpx;
						display: flex;
						align-items: center;
						image{
							width: 30rpx;
							height: 30rpx;
							margin-top: 4rpx;
							margin-right: 20rpx;
						}
					}
				}
				ul{
					width: 94%;
					height: auto;
					margin: 0 auto;
					li{
						width: 100%;
						height: 80rpx;
						display: flex;
						align-items: center;
						font-size: 32rpx;
						font-weight: 500;
						image{
							width: 34rpx;
							height: 34rpx;
							vertical-align: center;
							margin-right: 10rpx;
							margin-left: 10rpx;
						}
						.address{
							width: 88%;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}
				}
			}
			
			.list{
				width: 94%;
				height: 208rpx;
				margin: 40rpx auto;
				border-radius: 8rpx;
				box-shadow: #b3b3b3 0 0 6rpx 0;
				.tit{
					width: 100%;
					height: 50%;
					display: flex;
					border-bottom: 1px solid #EDEDED;
					justify-content: space-between;
					align-items: center;
					&>div{
						&:nth-of-type(1){
							display: flex;
							align-items: center;
							font-weight: bold;
							font-size: 33rpx;
							image{
								width: 40rpx;
								height: 40rpx;
								margin-left: 30rpx;
								margin-right: 12rpx;
							}
						}
						&:nth-of-type(2){
							display: flex;
							align-items: center;
							image{
								width: 30rpx;
								height: 30rpx;
								margin-right: 20rpx;
							}
						}
					}
				}
				p{
					width: 100%;
					height: 50%;
					line-height: 104rpx;
					text-indent: 40rpx;
					font-size: 36rpx;
				}
			}
		}
	}
</style>
