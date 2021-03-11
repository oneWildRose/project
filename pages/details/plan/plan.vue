<template>  <!-- 专家方案 -->
	<view class='hello'>
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>专家方案</text>
		</div>
		<div v-if='bol'>
			<image class='nothing' :src="require('../../../static/nothing.jpg')" mode=""></image>
			<div class='assign' @click='goAssign' v-if='isAssign'>指定专家制作方案</div>
		</div>
		<div v-if='!bol' class='fangan'>
			<div class="search">
				<image :src="require('../../../static/search.svg')" mode=""></image>
				<input type="text" :value="val" placeholder="搜索点位、编号" @input='getval'/>
			</div>
			<div class="who">
				<div>
					<image :src="require('../../../static/zj.svg')" mode=""></image>
					<text>{{ list[0].username }}</text>
				</div>
				<div>
					<image :src="require('../../../static/ywc.svg')" mode=""></image>
					<text>方案已完成</text>
				</div>
				<div>方案总数：{{ count }}</div>
			</div>
			<p>方案列表</p>
			<scroll-view scroll-y="true" :lower-threshold='50' @scrolltolower='btm'>
				<ul>
					<li v-for="(item, index) in list" :key='index' @click='goPlanMsg(item.id)'>
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
				id: '',
				isAssign: true,
				bol: true,
				project_id: '',
				list: [],
				count: 0,
				val: '',
				arr: [],
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
			this.id = option.id
			// console.log(this.project_id)
			
			this.$request('/api/index/infoIndex', {
				uid: this.id
			}).then(res => {// 项目主管没有权限去指定专家制作方案
				if(res.data.data.isshenfen == 1 || res.data.data.isshenfen == 3) {
					this.isAssign = true
				} else if(res.data.data.isshenfen == 2 || res.data.data.isshenfen == 4) {
					this.isAssign = false
				}
			})
		},
		onShow() {
			// this.list = []
			this.loadmore(0)
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			// 搜索筛选
			getval(e) { 
				this.arr = [] // 清空arr
				for(var i = 0; i <= this.list.length; i++) { // 遍历整个list
					for(var j in this.list[i]) { // 遍历单个list中的属性
						// console.log(j, this.list[i][j]) //键，值
						if (j != 'plan_url' && typeof this.list[i][j] == 'string') { // 除去plan_url这个键的值，因为用户不可能搜索图片链接编码
							if(this.list[i][j].includes(e.target.value) == true ) { // 如果 点位名称 or 点位级别 or 点位编号  有一项包含搜索框的内容
								this.arr.push(this.list[i])  // 将符合条件的信息对象存入arr
								break // 跳出单个list的属性遍历
							}
						}
					}
				}
				// console.log(this.arr)
			},
			goAssign() { // 指定专家
				uni.navigateTo({
					url: '../assign/assign?project_id=' + this.project_id
				})
			},
			goPlanMsg(id){ // 方案详情
				uni.navigateTo({
					url: '../planMsg/planMsg?id=' + id
				})
			},
			btm() {
				if(this.status == 'nomore') { return }
				this.loadmore(this.page)
			},
			loadmore(page) {
				this.status = 'loading'
				page++
				this.$request('/api/scheme/regular', {
					uid: 0, //专家id，为0时表示为项目方
					project_id: this.project_id,
					page: page,
					limit: 10
				}).then(res => {
					// console.log(res)
					if(res.data.data && res.data.data != '') {
						this.count = res.data.count
						switch (page){
							case 1:
								for(var i = 0; i < res.data.data.length; i++) {
									res.data.data[i].plan_url += this.$store.state.imgFix // 在图片后加上参数
								}
								this.list = res.data.data
								break;
							default:
								for(var i = 0; i < res.data.data.length; i++) {
									res.data.data[i].plan_url += this.$store.state.imgFix // 在图片后加上参数
									this.list.push(res.data.data[i])
								}
						}
						this.page = page
						this.status = res.data.data.length < 10? 'nomore' : 'loadmore'
						this.bol = false
					} else {
						this.bol = true
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
	.title{
		width: 100%;
		height: 120rpx;
		background-color: #5E79F2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			width: 50rpx;
			height: 50rpx;
			margin-left: 40rpx;
		}
		text{
			flex-grow: 1;
			text-align: center;
			color: white;
			font-size: 36rpx;
			font-weight: bold;
			margin-left: -100rpx;
		}
	}
	.nothing{
		width: 400rpx;
		height: 400rpx;
		display: block;
		margin: 0rpx auto;
	}
	.assign{
		margin: 40rpx auto;
		width: 400rpx;
		height: 96rpx;
		line-height: 96rpx;
		border-radius: 8rpx;
		text-align: center;
		font-size: 36rpx;
		border: 1px solid #FFAC27;
		color: #FFAC27;
	}
	.fangan{
		width: 100%;
		height: 90%;
		.search{
			width: 94%;
			height: 80rpx;
			margin: 30rpx auto;
			border: 1px solid #F0F0F0;
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
		.who{
			width: 94%;
			height: 60rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&>div{
				image{
					width: 40rpx;
					height: 40rpx;
					vertical-align: middle;
					margin-top: -6rpx;
					margin-right: 6rpx;
				}
				&:nth-of-type(2){
					flex-grow: 1;
					color: #5E79F2;
					margin-left: 40rpx;
				}
			}
		}
		&>p{
			width: 94%;
			margin: 40rpx auto;
			margin-bottom: 20rpx;
			font-size: 34rpx;
			font-weight: bold;
		}
		scroll-view{
			max-height: 72%;
			overflow-y: scroll;
		}
		ul{
			width: 94%;
			// max-height: 1060rpx;
			// overflow-y: scroll;
			margin: 0 auto;
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
					height: auto;
					background-color: transparent;
					box-shadow: none;
					margin-bottom: 40rpx;
				}
				.u-load-more-wrap{
					margin: 0 auto;
				}
			}
		}
	}
</style>
