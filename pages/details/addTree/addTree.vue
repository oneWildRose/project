<template>  <!-- 选择苗木（添加苗木） -->
	<view>
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>选择苗木</text>
		</div>
		<div class='search'>
			<image src="../../../static/search.svg" mode=""></image>
			<input type="text" value="" placeholder="搜索苗木名称" />
		</div>
		<scroll-view scroll-y="true" :lower-threshold='50' @scrolltolower='btm'>
			<ul>
				<li v-for="(item, index) in list" :key='index' @click='goAddtreemsg(item.id)'>
					<div>
						<div>{{ item.name }}</div>
						<text>高度：{{ item.height }}</text>
					</div>
					<div>
						<p>分类：{{ item.type }}</p>
						<text>冠幅：{{ item.crown }}</text>
					</div>
				</li>
				<li>
					<u-loadmore :status="status" :load-text="loadText" @loadmore="btm"/>
				</li>
			</ul>
		</scroll-view>
		<u-modal v-model="show" :content="content" @confirm='close' :content-style='style'></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				content: '请联系物业方后台管理员上传项目的苗木清单',
				style: { 'text-align': 'left' },
				file_id: '',
				project_id: '',
				list: [],
				status: 'loadmore',
				page: 0,
				loadText: {
					loadmore: '点击或上拉加载更多',
					loading: '努力加载中',
					nomore: '已经没有更多了'
				}
			}
		},
		onLoad(option) {
			this.project_id = option.project_id
			this.file_id = option.file_id
		},
		onShow() {
			// this.list = []
			this.loadmore(0)
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta: 1
				})
			},
			close() {
				this.goBack()
			},
			goAddtreemsg(tree_id) {
				uni.navigateTo({
					url: '../addTreeMsg/addTreeMsg?file_id=' + this.file_id + '&tree_id=' + tree_id
				})
			},
			btm() {
				if(this.status == 'nomore') { return }
				this.loadmore(this.page)
			},
			loadmore(page) {
				this.status = 'loading'
				page++
				this.$request('/api/Seedling/Seedling_list', {
					project_id: this.project_id,
					page: page,
					limit: 10
				}).then(res => {
					// console.log(res)
					if(res.data.data && res.data.data != '') {
						switch (page) {
							case 1:
								this.list = res.data.data
								break;
							default:
								for(var i = 0; i < res.data.data.length; i++) {
									this.list.push(res.data.data[i])
								}
						}
						this.page = page
						this.status = res.data.data.length < 10? 'nomore' : 'loadmore'
					} else if(page == 1) {
						this.show = true
					} else {
						this.status = 'nomore'
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.title{
		width: 100%;
		height: 96rpx;
		background: #5E79F2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		image{
			width: 50rpx;
			height: 50rpx;
			margin-left: 40rpx;
		}
		text{
			font-size: 36rpx;
			font-weight: bold;
			color: white;
			flex-grow: 1;
			text-align: center;
			margin-left: -100rpx;
		}
	}
	.search{
		width: 94%;
		height: 80rpx;
		border: 1px solid #E6E6E6;
		margin: 30rpx auto;
		border-radius: 8rpx;
		position: relative;
		image{
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			left: 4%;
			top: 50%;
			margin-top: -20rpx;
		}
		input{
			width: 100%;
			height: 100%;
			text-align: center;
		}
	}
	scroll-view{
		max-height: 1250rpx;
	}
	ul{
		width: 100%;
		// overflow-y: scroll;
		padding-top: 10rpx;
		li{
			width: 90%;
			height: 156rpx;
			margin: 0 auto;
			margin-bottom: 28rpx;
			border-radius: 10rpx;
			padding-left: 30rpx;
			box-shadow: #bdbdbd 0 0 6rpx 0;
			display: flex;
			&>div{
				width: 50%;
				height: 100%;
				line-height: 78rpx;
				div{
					font-size: 34rpx;
					font-weight: bold;
				}
				p{
					font-size: 30rpx;
					color: #727472;
				}
				text{
					font-size: 30rpx;
					color: #727472;
				}
			}
			&:nth-last-of-type(1){
				height: auto;
				margin-bottom: 40rpx;
				border: none;
				box-shadow: none;
				padding-left: 0;
			}
			.u-load-more-wrap{
				margin: 0 auto;
			}
		}
	}
</style>
