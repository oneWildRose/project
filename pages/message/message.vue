<template>	<!-- 消息页 -->
	<view class="hello">
		<div>
			<div class="status" style='background:white'></div>
			<div class="search">
				<p>消息</p>
				<div>
					<image :src="require('../../static/search.svg')" mode=""></image>
					<input type="text" value="" placeholder="搜索内容" />
				</div>
			</div>
			<div class='zanwu' v-if='personal_list == ""'>暂无消息</div>
			<ul class="message_list" v-if='personal_list != ""'>
				<u-swipe-action :index="index" v-for="(item, index) in personal_list" :key="item.id" 
					@click="click" :options="options">
					<li @click='goChat(item.userinfo.id, item.id)'>
						<image :src="item.userinfo.file == null? src : item.userinfo.file" mode=""></image>
						<div class='cont'>
							<p>{{ item.userinfo.name }}</p>
							<text>{{ item.content.content }}</text>
						</div>
						<div class='time'>
							<p v-if="item.content.isyd == 0">{{ item.content.shijian }}</p>
							<p v-if="item.content.isyd != 0">{{ item.content.time }}</p>
							<div v-if="item.content.isyd == 0"></div>
						</div>
					</li>
				</u-swipe-action>
			</ul>
		</div>
		<u-tabbar v-model="current" :list="list" active-color='#5E79F2'></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '../../static/touxiang.svg',// 默认头像
				current: 0,
				personal_list: [], // 消息列表
				list: [],
				list_top: [
					{
						iconPath: "../../static/shouye(2).png",
						selectedIconPath: "../../static/shouye.png",
						text: '首页',
						isDot: true,
						customIcon: false,
						pagePath: '/pages/ind/ind',
					},
					{
						iconPath: "../../static/new.png",
						selectedIconPath: "../../static/new(2).png",
						text: '消息',
						isDot: true,
						customIcon: false,
						pagePath: '/pages/message/message',
					},
					{
						iconPath: "../../static/wode.png",
						selectedIconPath: "../../static/wode(2).png",
						text: '个人中心',
						isDot: true,
						customIcon: false,
						pagePath: '/pages/personal/personal',
					}
				],
				list_spe: [
					{
						iconPath: "../../static/shouye(2).png",
						selectedIconPath: "../../static/shouye.png",
						text: '首页',
						isDot: true,
						customIcon: false,
						pagePath: '/pages/ind_specialist/ind_specialist',
					},
					{
						iconPath: "../../static/new.png",
						selectedIconPath: "../../static/new(2).png",
						text: '消息',
						isDot: true,
						customIcon: false,
						pagePath: '/pages/message/message',
					},
					{
						iconPath: "../../static/wode.png",
						selectedIconPath: "../../static/wode(2).png",
						text: '个人中心',
						isDot: true,
						customIcon: false,
						pagePath: '/pages/personal/personal',
					}
				],
				isshenfen: '',
				uid: '',
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				isget: false
			};
		},
		onLoad() {
			var that = this
			uni.getStorage({
				key: 'userinfo',
				success: (res) => {
					if(res.data.id) {
						that.uid = res.data.id
					} else if(res.data.uid) {
						that.uid = res.data.uid
					} else if(res.data.data.id) {
						that.uid = res.data.data.id
					}
					that.$request('/api/index/infoIndex', {
						uid: that.uid
					}).then(res => {
						that.isshenfen = res.data.data.isshenfen
						if(that.isshenfen == 5) { // 专家
							that.list = that.list_spe
						} else { 
							that.list = that.list_top
						}
					})
					that.newsList()
					that.isget = true
				}
			})
		},
		mounted() {
			
		},
		onShow() {
			if(this.isget) {
				this.newsList()
			}
		},
		methods: {
			createSocket() {
				
			},
			goChat(id, zid) {
				// id是聊天对象的用户id，zid是这项聊天记录的主键id
				// uni.preloadPage({url: "chat/chat"}); // 预加载 
				uni.navigateTo({
					url: "chat/chat?id=" + id + '&zid=' + zid
					// url: "../picEdit/picEdit"
				})
			},
			click(index, index1) {
				if(index1 == 0) {
					// this.$u.toast(`删除第${index}个`);
					this.$u.toast("暂无操作");
				}
			},
			newsList() {
				this.$request('/api/fdchatcontent/chatlist', {
					uid: this.uid
				}).then(res => {
					// console.log(res)
					this.personal_list = res.data.data
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		width: 100%;
		height: 100%; 
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: #F5F6F9;
		&>div{
			width: 100%;
			height: 100%;
		}
	}
	.search{
		width: 100%;
		height: 152rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: white;
		p{
			font-size: 40rpx;
			font-weight: bold;
			margin-left: 20rpx;
		}
		&>div{
			width: 560rpx;
			height: 78rpx;
			background: #F8F8FF;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			image{
				width: 40rpx;
				height: 40rpx;
				margin-left: 20rpx;
				margin-right: 10rpx;
			}
			input{
				width: 480rpx;
				height: 100%;
				border-radius: 8rpx;
			}
		}
	}
	.zanwu{
		width: 100%;
		text-align: center;
		position: fixed;
		top: 48%;
		color: #a5a5a5;
		font-size: 34rpx;
	}
	.message_list{
		width: 100%;
		max-height: 82%;
		overflow-y: scroll;
		background: white;
		&>uni-view{
			border-bottom: 1px solid #E3E3E3;
			&:nth-last-of-type(1){
				border: none;
			}
		}
		li{
			width: 92%;
			margin: 0 auto;
			height: 156rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			image{
				width: 96rpx;
				height: 96rpx;
				border-radius: 50%;
			}
			.cont{
				flex-grow: 1;
				height: 96rpx;
				text-align: left;
				margin-left: 20rpx;
				p{
					font-size: 32rpx;
					font-weight: bold;
					height: 48rpx;
					max-width: 360rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				text{
					display: inline-block;
					max-width: 400rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 28rpx;
					color: #B5B5B3;
				}
			}
			.time{
				width: auto;
				height: 96rpx;
				position: relative;
				p{
					font-size: 24rpx;
					color: #B5B5B3;
				}
				div{
					width: 16rpx;
					height: 16rpx;
					background: #FF4A27;
					border-radius: 50%;
					margin-top: 30rpx;
					position: absolute;
					right: 20rpx;
				}
			}
		}
	}
</style>
