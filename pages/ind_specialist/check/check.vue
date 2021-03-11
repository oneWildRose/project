<template>  <!-- 已验收方案、已反馈方案 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>{{ num == 0? '已验收方案' : '已反馈方案' }}</text>
		</div>
		<div class="search">
			<image :src="require('../../../static/search.svg')" mode=""></image>
			<input type="text" value="" placeholder="搜索点位、编号"/>
		</div>
		<div class="tit">
			<div>
				{{ num == 0? '已验收方案' : '已反馈方案' }}：{{ arr.length }}
			</div>
		</div>
		<ul>
			<li v-for="(item, index) in arr" :key='index' @click='goPlanMsg(item.id)'>
				<p>{{ index + 1 }}</p>
				<image :src="item.plan_url" mode=""></image>
				<div>
					<div>
						<text :class="item.name.length > 12? 'wid' : '' ">{{ item.name }}</text>
						<p></p>
						<text>{{ item.levelname }}</text>
					</div>
					<p>点位编号：{{ item.dnumber }}</p>
				</div>
			</li>
			<li>
				<p></p>
				<text>{{ arr.length > 0? '已经到底了' : '暂无' }}</text>
				<p></p>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: 0, // 0已验收，1已反馈
				arr: [
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					},
					{
						id: 1,
						plan_url: '../../../static/shu.png',
						name: '点位名称',
						levelname: '点位级别',
						dnumber: '点位编号'
					}
				]
			}
		},
		onLoad(option) {
			this.num = option.num
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			goPlanMsg(id){ // 方案详情
				uni.navigateTo({
					url: '../../details/planMsg/planMsg?id=' + id
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
	}
	.head{
		width: 100%;
		height: 100rpx;
		background: #5E79F2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			width: 44rpx;
			height: 44rpx;
			margin-left: 40rpx;
		}
		text{
			flex-grow: 1;
			text-align: center;
			margin-left: -80rpx;
			font-size: 36rpx;
			color: white;
			font-weight: bold;
		}
	}
	.search{
		width: 92%;
		height: 80rpx;
		margin: 30rpx auto;
		border: 1px solid #e8e8e8;
		position: relative;
		border-radius: 8rpx;
		image{
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			left: 6%;
			top: 50%;
			margin-top: -20rpx;
		}
		input{
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			text-align: center;
			border-radius: 8rpx;
		}
	}
	.tit{
		width: 92%;
		margin: 0 auto;
	}
	ul{
		width: 94%;
		height: 76%;
		overflow-y: scroll;
		margin: 20rpx auto;
		li{
			width: 99%;
			margin: 1rpx auto;
			height: 140rpx;
			border-radius: 10rpx;
			background: white;
			box-shadow: #bebebf 0 0 6rpx 0;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			font-size: 30rpx;
			&>p{
				width: 90rpx;
				text-align: center;
			}
			image{
				width: 120rpx;
				height: 120rpx;
				margin-right: 30rpx;
			}
			&>div{
				flex-grow: 1;
				text-align: left;
				&>div{
					display: flex;
					align-items: center;
					.wid{
						width: 66%;
					}
					text:nth-of-type(1){
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					p{
						width: 2rpx;
						height: 30rpx;
						background-color: #ADAFAD;
						margin: 0 20rpx 0 20rpx;
					}
					text:nth-of-type(2){
						color: #ADAFAD;
						font-weight: bold;
					}
				}
				p{
					margin-top: 10rpx;
				}
			}
			&:nth-last-of-type(1) {
				text-align: center;
				color: #B7B7BD;
				width: 99%;
				height: 60rpx;
				background: transparent;
				box-shadow: none;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 34rpx;
				&>p{
					width: 200rpx;
					height: 2rpx;
					background-color: #B7B7BD;
					margin-top: 4rpx;
				}
			}
		}
	}
</style>
