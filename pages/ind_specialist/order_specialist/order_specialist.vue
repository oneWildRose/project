<template>		<!-- 专家订单 -->
	<view class="hello">
		<div class="status"></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(1).png')" @click="goBack"></image>
			<text>{{ list_tab[ind] }}</text>
			<image :src="require('../../../static/search_white.svg')" mode=""></image>
		</div>
		<div class="tab">
			<div v-for='(item, index) in list_tab' :key='index'>
				<text :class='index == ind? "orange": ""' @click="tab(index)">{{ item }}</text>
				<p :class='index == ind? "brg": ""'></p>
			</div>
		</div>
		<ul>
			<li v-for='(item, index) in list' :key='index'
				@click='goTask(item.id, item.proexpert_id)'>
				<text>{{ item.pname }}</text>
				<div>
					<div>
						<p>{{ item.cliam }}</p>
						<p>{{ item.ctime }}</p>
					</div>
					<p>查看</p>
				</div>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list_tab: ['全部', '待确认', '进行中', '已完成'],
				list: [],
				isheight: false,
				id: this.$store.state.uid, // 专家id
				ind: 0, // 索引
				state: this.$store.state.orderState // 订单状态， 0待确认，1进行中，2已完成，3全部
			}
		},
		onLoad(option) {
			this.ind = option.ind
			let that = this
			uni.getStorage({
				key: 'userinfo',
				success(res) {
					if(res.data.uid) { // 登录出现弹框： 选择身份，完善企业信息，完善个人信息 进入
						that.id = res.data.uid
					} else if(res.data.id) { // 注册成功，请选择身份进入
						that.id = res.data.id
					} else if(res.data.data.id) { // 登录进入
						that.id = res.data.data.id
					}
				}
			})
		},
		onShow() {
			this.$request('/api/Highseasapi/project_list_z', {
				uid: this.id
			}).then(res => {
				// console.log(res)
				this.list = res.data.data
				if(this.list.length > 6) {
					this.isheight = true
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			tab(index) {
				this.ind = index // tab索引
				if(this.ind == 0) {this.state = 3} else // 全部
				if(this.ind == 1) {this.state = 0} else // 待确认
				if(this.ind == 2) {this.state = 1} else // 进行中
				if(this.ind == 3) {this.state = 2} // 已完成
				this.$request('/api/Highseasapi/project_list_z', {
					uid: this.id
				}).then(res => {
					// console.log(res)
					this.list = res.data.data
				})
			},
			goTask(project_id,proexpert_id) {
				uni.navigateTo({
					url: '../task_msg/task_msg?project_id=' + project_id + '&dir=' + 'list' + '&proexpert_id=' + proexpert_id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: #F5F6F9;
		.head{
			width: 100%;
			height: 140rpx;
			background: #5E79F2;
			display: flex;
			align-items: center;
			justify-content: space-around;
			image{
				width: 50rpx;
				height: 50rpx;
				margin-left: 40rpx;
				margin-right: 40rpx;
			}
			text{
				flex-grow: 1;
				color: white;
				font-size: 36rpx;
				text-align: center;
				font-weight: bold;
			}
		}
		.tab{
			width: 100%;
			height: 104rpx;
			background: white;
			display: flex;
			justify-content: space-around;
			align-items: center;
			&>div{
				position: relative;
				text{
					color: #717171;
				}
				p{
					width: 56rpx;
					height: 4rpx;
					background: transparent;
					position: absolute;
					bottom: -30rpx;
					left: 50%;
					margin-left: -28rpx;
				}
			}
			.orange{
				color: #F9A400;
			}
			.brg{
				background-color: #F9A400;
			}
		}
		.scroll{
			height: 1206rpx;
		}
		ul{
			width: 100%;
			height: auto;
			overflow-y: scroll;
			margin-top: 20rpx;
			background-color: white;
			li{
				width: 90%;
				margin: 0 auto;
				height: 180rpx;
				border-bottom: 1px solid #EEEEEE;
				display: flex;
				flex-direction: column;
				&:nth-last-of-type(1){
					border: none;
				}
				&>text{
					display: inline-block;
					width: 100%;
					font-size: 31rpx;
					text-align: left;
					margin-top: 20rpx;
					margin-bottom: 14rpx;
					text-indent: 10rpx;
				}
				&>div{
					width: 100%;
					display: flex;
					justify-content: space-between;
					&>div{
						width: 80%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #999999;
						font-size: 28rpx;
						text-indent: 10rpx;
						p:nth-of-type(1){
							margin-bottom: 5rpx;
						}
					}
					&>p{
						color: #3F5DE6;
						font-size: 30rpx;
						margin-right: 20rpx;
					}
				}
			}
		}
	}
</style>
