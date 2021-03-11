<template> <!-- 项目管理 -->
	<view class='hello'>
		<div class='status' style='background-color: #5E79F2;'></div>
		<div class='goback' @click='goBack'>
			<image :src="require('../../static/fanhui(1).png')" mode=""></image>
			<text>项目管理</text>
		</div>
		<div class="search">
			<image :src="require('../../static/search.svg')" mode=""></image>
			<input type="text" placeholder="输入项目名称" />
		</div>
		<div v-if='tip_bol' style='color: #808080;width: 100%;text-align: center;margin-top: 20rpx;'>{{ tip }}</div>
		<div v-if='!tip_bol' class="list">
			<div class='title'>
				<image :src="require('../../static/liebiao.svg')" mode=""></image>
				<text>项目列表</text>
			</div>
			<scroll-view scroll-y="true" :lower-threshold='50' @scrolltolower='btm'>
				<ul>
					<li v-for='(item, index) in project_list' :key='index' @click='goDetails(index)'>
						<div class='up'>
							<text></text>
							<text>项目名称: {{ item.pname }}</text>
							<image :src="require('../../static/more.svg')" mode=""></image>
						</div>
						<div class='down'>
							<image :src="require('../../static/dingwei.svg')" mode=""></image>
							<text>{{ item.ProvinceName + item.CityName + item.AreaName + item.address }}</text>
						</div>
					</li>
					<li>
						<u-loadmore :status="status" :load-text="loadText" @loadmore="btm"/>
					</li>
				</ul>
			</scroll-view>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: this.$store.state.uid,
				ztype: '',
				project_list: [],
				tip: '请联系最高权限管理员在PC端后台创建项目',
				tip_bol: true,
				status: 'loadmore',
				page: 0,
				loadText: {
					loadmore: '点击或上拉加载更多',
					loading: '努力加载中',
					nomore: '已经没有更多了'
				},
				isGet: false
			}
		},
		onLoad() {
			var that = this
			uni.getStorage({ // 从缓存中拿到用户的id
				key: 'userinfo',
				success: (res) => {
					if(res.data.id) {
						that.id = res.data.id
					} else if(res.data.uid) {
						that.id = res.data.uid
					} else if(res.data.data.id) {
						that.id = res.data.data.id
					}
					that.isGet = true
					that.loadmore(0)
				}
			})
		},
		onShow() {
			if(!this.isGet) { return }
			// this.project_list = []
			this.loadmore(0)
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			goDetails(index) {
				uni.navigateTo({
					url: '../details/details?project_id=' + this.project_list[index].id + '&id=' + this.id
				})
			},
			btm() {
				if(this.status == 'nomore') { return }
				this.loadmore(this.page)
			},
			loadmore(page) {
				this.status = 'loading';
				page++
				this.$request('/api/project/project_list', {
					uid: this.id,
					page: page,
					limit: 10
				}).then(res => {
					// console.log(res.data.data)
					if (res.data.data && res.data.data != '') {
						this.tip_bol = false
						switch (page) {
							case 1:
								this.project_list = res.data.data
								break;
							default:
								for(var i = 0; i < res.data.data.length; i++) {
									this.project_list.push(res.data.data[i])
								}
						}
						this.page = page
						this.status = this.project_list.length < 10? 'nomore' : 'loadmore'
					} else { 
						this.status = 'nomore'
					}
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
	.goback{
		background: #5E79F2;
		width: 100%;
		height: 120rpx;
		line-height: 120rpx;
		margin: 0px auto;
		text-align: center;
		position: relative;
		color: white;
		font-size: 36rpx;
		image{
			width: 52rpx;
			height: 52rpx;
			position: absolute;
			left: 40rpx;
			top: 50%;
			margin-top: -20rpx;
		}
	}
	.search{
		width: 100%;
		height: 100rpx;
		background: #5E79F2;
		position: relative;
		image{
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			left: 60rpx;
			top: 50%;
			margin-top: -28rpx;
		}
		input{
			width: 90%;
			height: 80%;
			margin: 0 auto;
			background: white;
			color: #808080;
			text-align: center;
			border-radius: 8rpx;
			font-size: 28rpx;
		}
	}
	.list{
		width: 100%;
		height: 80%;
		// height: auto;
		background: white;
		.title{
			margin-top: 40rpx;
			margin-left: 40rpx;
			font-size: 36rpx;
			image{
				width: 40rpx;
				height: 40rpx;
				margin-left: 8rpx;
				margin-right: 12rpx;
				vertical-align: middle;
			}
		}
		scroll-view{
			max-height: 95%;
			overflow-y: scroll;
		}
		ul{
			width: 100%;
			margin-top: 20rpx;
			// height: 90%;
			&::-webkit-scrollbar {
				display: none; //隐藏滚动条
			}
			li{
				width: 90%;
				height: 160rpx;
				margin: 0 auto;
				margin-top: 40rpx;
				border-radius: 20rpx;
				box-shadow: #D2D2D2 1px 2px 4px 2px;
				&:nth-of-type(1){
					margin-top: 10rpx;
				}
				&:nth-last-of-type(1){
					box-shadow: none;
					height: auto;
					margin-bottom: 20rpx;
				}
				.up{
					width: 100%;
					height: 50%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 32rpx;
					text:nth-of-type(1){
						display: inline-block;
						width: 12rpx;
						height: 52rpx;
						border-radius: 4rpx;
						background: #3F5DE3;
						margin-right: 20rpx;
					}
					text:nth-of-type(2){
						flex-grow: 1
					}
					image{
						width: 60rpx;
						height: 60rpx;
						margin-right: 20rpx;
					}
				}
				.down{
					width: 100%;
					height: 50%;
					line-height: 60rpx;
					padding-left: 40rpx;
					display: flex;
					align-items: center;
					image{
						width: 36rpx;
						height: 36rpx;
						margin-right: 8rpx;
					}
					text{
						font-size: 26rpx;
						color: #919194;
						max-width: 560rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}
	
</style>
