<template>  <!-- 乙方项目主管首页 -->
	<view class='hello'>
		<div>
			<div class="status"></div>
			<div class="head">
				<text>{{ project_id == ""? '暂无项目' : pname }}</text>
				<image :src="require('../../../static/10-13/xiaoxi.svg')" mode=""></image>
			</div>
			<ul>
				<li @click='goPhoto'>
					<image :src="require('../../../static/xunjian.svg')" mode=""></image>
					<div>
						<p>巡检任务</p>
						<text>每天对点位进行拍照并上传</text>
					</div>
				</li>
				<li @click='goDetails'>
					<image :src="require('../../../static/project(1).svg')" mode=""></image>
					<div>
						<p>项目信息</p>
						<text>查看项目的具体信息与实时数据</text>
					</div>
				</li>
				<!-- <li @click='goQuality'>
					<image :src="require('../../../static/pinzhi(1).svg')" mode=""></image>
					<div>
						<p>品质监控</p>
						<text>查看项目的品质呈现</text>
					</div>
				</li> -->
			</ul>
		</div>
		<u-tabbar v-model="current" :list="list" active-color='#5E79F2'></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						iconPath: "../../../static/shouye(2).png",
						selectedIconPath: "../../../static/shouye.png",
						text: '首页',
						isDot: true,
						customIcon: false,
						pagePath: '/pages/ind_provider/provider/provider',
					},
					{
						iconPath: "../../../static/wode.png",
						selectedIconPath: "../../../static/wode(2).png",
						text: '个人中心',
						isDot: true,
						customIcon: false,
						pagePath: '/pages/personal/personal',
					}
				],
				current: 0 ,// 当前tabbar激活项的索引
				id: 0,
				project_id: '',
				pname: '',
				isget: false
			}
		},
		onLoad() {
			var that = this
			uni.getStorage({
				key: 'userinfo',
				success(res) {
					// console.log(res)
					that.id = res.data.data.id
					that.getMsg()
				}
			})
		},
		onShow() {
			if(!this.isget) { return }
			this.getMsg()
		},
		methods: {
			getMsg() {
				this.$request('/api/lnspection/getrojectid', { // 项目主管登录后，缓存中的用户id请求项目id
					uid: this.id
				}).then(res => {
					// console.log(res)
					this.project_id = res.data.data.project_id
					this.$request('/api/project/Project_info', { // 项目基本信息
						project_id: this.project_id
					}).then(res => {
						// console.log(res)
						this.pname = res.data.data.pname
					})
				})
			},
			goDetails() { // 项目信息
				uni.navigateTo({
					url: '../../details/details?project_id=' + this.project_id + '&id=' + this.id
				})
			},
			goPhoto() { // 巡检任务
				uni.navigateTo({
					// url: '../photo/photo?project_id=' + this.project_id + '&id=' + this.id
					url: '../../approval/approval?project_id=' + this.project_id + '&id=' + this.id
				})
			},
			goQuality() { // 品质监控
				uni.navigateTo({
					// url: '../quality/quality?project_id=' + this.project_id
					url: '../../approvalQuality/approvalQuality?project_id=' + this.project_id + '&uid=' + this.id
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
		background-color: #F5F6F9;
	}
	.head{
		width: 100%;
		height: 92rpx;
		background: #5E79F2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		text{
			font-weight: bold;
			font-size: 34rpx;
			margin-left: 40rpx;
			color: white;
		}
		image{
			width: 45rpx;
			height: 45rpx;
			margin-right: 40rpx;
		}
	}
	ul{
		width: 94%;
		margin: 40rpx auto;
		height: auto;
		li{
			width: 100%;
			height: 192rpx;
			background-color: white;
			box-shadow: #bcbcbc 0 0 6rpx 0;
			border-radius: 8px;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			image{
				width: 88rpx;
				height: 88rpx;
				margin-left: 30rpx;
			}
			div{
				width: 66%;
				p{
					font-weight: bold;
					font-size: 34rpx;
					margin-bottom: 8rpx;
				}
				text{
					font-size: 30rpx;
				}
			}
		}
	}
</style>
