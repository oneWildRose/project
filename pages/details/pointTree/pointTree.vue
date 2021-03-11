<template>  <!-- 点位苗木 -->
	<view>
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>点位苗木</text>
		</div>
		<div class='msg'>
			<text>{{ msg.name }}</text>
			<text>{{ msg.dnumber }}</text>
		</div>
		<div class='list'>
			<p>苗木列表</p>
			<scroll-view scroll-y="true" :lower-threshold='50' @scrolltolower='btm'>
				<ul>
					<li v-for="(item, index) in list" :key='index' @click='goTreeMsg(item.id)'>
						<image :src="item.file == null? zanwu : item.file " mode=""></image>
						<div>
							<p>苗木名称：{{ item.name }}</p>
							<p>数量：{{ item.num }}</p>
						</div>
						<text>查看</text>
					</li>
					<li>
						<u-loadmore :status="status" :load-text="loadText" @loadmore="btm" v-if='!tip_bol'/>
					</li>
				</ul>
			</scroll-view>
		</div>
		<div class='tip' v-if='tip_bol'>暂无苗木</div>
		<div class='btn' @click='addTree'>添加苗木</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				file_id: '',
				project_id: '',
				msg: '',
				tip_bol: true,
				zanwu: '../../../static/zanwu.png',
				list: [],
				status: 'loadmore',
				page: 0,
				loadText: {
					loadmore: '点击或上拉加载更多',
					loading: '努力加载中',
					nomore: '已经没有更多了'
				},
			}
		},
		onLoad(option) {
			this.project_id = option.project_id
			this.file_id = option.file_id
			this.$request('/api/file/fileinfo', { // 点位信息
				file_id: this.file_id
			}).then(res => {
				this.msg = res.data.data
			})
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
			addTree() {
				uni.navigateTo({
					url: '../addTree/addTree?file_id=' + this.file_id + '&project_id=' + this.project_id
				})
			},
			goTreeMsg(id) {
				uni.navigateTo({
					url: '../treeMsg/treeMsg?id=' + id
				})
			},
			btm() {
				if(this.status == 'nomore') { return }
				this.loadmore(this.page)
			},
			loadmore(page) {
				this.status = 'loading'
				page++
				this.$request('/api/Seedling/setBindSeedling', { // 点位下的苗木列表
					file_id: this.file_id,
					page: page,
					limit: 10
				}).then(res => {
					// console.log(res.data.data)
					if(res.data.code == 1) {
						switch (page) {
							case 1:
								for(var i = 0; i < res.data.data.length; i++) {
									res.data.data[i].file += this.$store.state.imgFix // 在图片后加上参数
								}
								this.list = res.data.data
								break;
							default:
								for(var i = 0; i < res.data.data.length; i++) {
									res.data.data[i].file += this.$store.state.imgFix // 在图片后加上参数
									this.list.push(res.data.data[i])
								}
						}
						this.tip_bol = this.list == ''? true : false
						this.page = page
						this.status = res.data.data.length < 10? 'nomore' : 'loadmore'
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
	.msg{
		width: 92%;
		margin: 40rpx auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.list{
		width: 100%;
		height: auto;
		&>p{
			width: 100%;
			height: 76rpx;
			line-height: 76rpx;
			font-size: 36rpx;
			font-weight: bold;
			text-indent: 40rpx;
		}
		scroll-view{
			max-height: 1100rpx;
		}
		ul{
			width: 100%;
			overflow-y: scroll;
			border-top: 1px solid #DDDDDD;
			li{
				width: 90%;
				height: 160rpx;
				margin: 0 auto;
				border-bottom: 1px solid #DDDDDD;
				display: flex;
				justify-content: space-between;
				align-items: center;
				image{
					width: 116rpx;
					height: 108rpx;
					margin-right: 20rpx;
				}
				&>div{
					flex-grow: 1;
					p:nth-of-type(2){
						font-size: 28rpx;
						margin-top: 6rpx;
						color: #868686;
					}
				}
				&>text{
					font-size: 28rpx;
					color: #768FFF;
					font-weight: bold;
					margin-right: 20rpx;
				}
				&:nth-last-of-type(1){
					border: none;
					height: auto;
					margin-bottom: 40rpx;
				}
				.u-load-more-wrap{
					margin: 0 auto;
				}
			}
		}
	}
	.tip{
		position: fixed;
		top: 49%;
		width: 100%;
		text-align: center;
		font-size: 32rpx;
		color: #8c8c8c;
	}
	.btn{
		width: 100%;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
		color: white;
		font-size: 36rpx;
		background-color: #5C7CF4;
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>
