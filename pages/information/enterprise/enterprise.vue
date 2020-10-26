<template> <!-- （乙方）企业信息展示页 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<div>
				<image :src="require('../../../static/brg.png')" mode=""></image>
				<div>
					<p>企业信息</p>
					<text>查看公司的详细信息</text>
				</div>
			</div>
		</div>
		<ul>
			<li>公司名称：{{ list.enterprisename }}</li>
			<li>成立时间：{{ list.established }}</li>
			<li>公司地址：{{ list.province + list.city + list.area }}</li>
			<li>项目数：{{ list.projectnum }}</li>
		</ul>
		<div class="change" @click='goEnterpriseChange'>
			<image :src="require('../../../static/xiugai.svg')" mode=""></image>
			<text>修改信息</text>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: '',
				list: '',
			};
		},
		onLoad() {
			var that = this
			uni.getStorage({
				key: 'userinfo',
				success(res) {
					// console.log(res)
					that.uid = res.data.data.user_id
					that.$request('/api/index/infoIndex', {
						uid: that.uid
					}).then(res => {
						// console.log(res)
						that.list = res.data.data
						that.$request('/api/index/selectCity', {
							pid: 0 //省
						}).then(res => {
							for(var i = 0; i <= res.data.data.length; i++) {
								if (res.data.data[i].id == that.list.province) {
									that.list.province = res.data.data[i].shortname
								}
							}
						})
						that.$request('/api/index/selectCity', {
							pid: that.list.province
						}).then(res => {
							for(var i = 0; i <= res.data.data.length; i++) {
								if (res.data.data[i].id == that.list.city) {
									that.list.city = res.data.data[i].shortname
								}
							}
						})
						that.$request('/api/index/selectCity', {
							pid: that.list.city
						}).then(res => {
							for(var i = 0; i <= res.data.data.length; i++) {
								if (res.data.data[i].id == that.list.area) {
									that.list.area = res.data.data[i].shortname
								}
							}
						})
					})
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goEnterpriseChange() {
				uni.navigateTo({
					url: './enterprise_change?uid=' + this.uid
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.head{
		width: 100%;
		height: 228rpx;
		background: #5E79F2;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding-left: 40rpx;
		&>image{
			width: 50rpx;
			height: 50rpx;
			display: block;
		}
		&>div{
			display: flex;
			margin-left: 20rpx;
			image{
				width: 80rpx;
				height: 80rpx;
				margin-right: 30rpx;
			}
			div{
				color: white;
				margin-top: -12rpx;
				p{
					font-size: 38rpx;
					font-weight: bold;
				}
				text{
					font-size: 28rpx;
				}
			}
		}
	}
	ul{
		width: 90%;
		height: auto;
		margin: 40rpx auto;
		li{
			width: 100%;
			margin-bottom: 40rpx;
			font-size: 34rpx;
		}
	}
	.change{
		width: 150rpx;
		height: 52rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		left: 50%;
		margin-left: -75rpx;
		bottom: 40rpx;
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
</style>
