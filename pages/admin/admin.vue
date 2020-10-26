<template>
	<view class="">
		<ind :background="background" :height="height" :bol="bol">
			<template>
				<view slot='msg' class="msg">
					<div class='tit'>
						<text @click="goEnterprise">{{ list.enterprisename }}</text>
						<div>
							<image :src="require('../../static/dingwei.svg')" mode=""></image>
							<text>{{ list.province }}</text>
						</div>
					</div>
					<div class='main'>
						<div>
							<p>{{ getTime() }}</p>
							<text>从业时间(年)</text>
						</div>
						<div>
							<p>{{ list.projectnum }}</p>
							<text>总服务项目数</text>
						</div>
					</div>
				</view>
			</template>
		</ind>
	</view>
</template>

<script>
	import ind from '../../module/ind/ind'
	export default {
		components: {
			ind
		},
		data() {
			return {
				height: '292rpx', // .head 的高度
				background: '#5E79F2' ,// 背景色
				bol: true,
				uid: '',
				list: '',
			}
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
									// console.log(this.msg.province) // 省
								}
							}
						})
					})
				}
			})
		},
		methods: {
			getTime() {
				var data = new Date() // 日期对象
				var year = data.getFullYear() // 年份
				if(this.list != '') {
					// 当前年份 减去 用户填写的公司成立时间的前四位(即年份) 得出从业时间
					return year - this.list.established.substring(0, 4)
				} else {
					return ;
				}
			},
			goEnterprise() {
				uni.navigateTo({
					url: '../information/enterprise/enterprise'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.msg{
		width: 106%;
		position: absolute;
		left: -24rpx;
		top: 160rpx;
		color: white;
		.tit{
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			&>text{
				font-weight: bold;
				font-size: 34rpx;
				display: block;
				width: 400rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-left: 10rpx;
			}
			div{
				font-size: 28rpx;
				margin-right: 10rpx;
				image{
					width: 30rpx;
					height: 30rpx;
					margin-right: 4rpx;
					position: relative;
					top: 4rpx;
				}
			}
		}
		.main{
			width: 100%;
			height: 172rpx;
			background: white;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			box-shadow: #adadad 0px 0px 4px 0px;
			div{
				width: 50%;
				text-align: center;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				&:nth-of-type(1) {
					p{
						margin-left: -20rpx;
					}
				}
				p{
					font-size: 50rpx;
					color: black;
					margin-top: 20rpx;
				}
				text{
					color: #808080;
					display: block;
					margin-top: -20rpx;
				}
			}
		}
	}
</style>
