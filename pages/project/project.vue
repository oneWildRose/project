<template> <!-- 项目管理 -->
	<view>
		<div class='blue'></div>
		<div class='goback' @click='goBack'>
			<image :src="require('../../static/fanhui(1).png')" mode=""></image>
			<text>项目管理</text>
		</div>
		<div class="search">
			<image :src="require('../../static/search.svg')" mode=""></image>
			<input type="text" placeholder="输入项目名称" />
		</div>
		<div class="list">
			<div class='title'>
				<image :src="require('../../static/liebiao.svg')" mode=""></image>
				<text>项目列表</text>
			</div>
			<ul>
				<li v-for='(item, index) in project_list' :key='index' @click='goDetails(index)'>
					<div class='up'>
						<text></text>
						<text>项目名称: {{ item.pname }}</text>
						<image :src="require('../../static/more.svg')" mode=""></image>
					</div>
					<div class='down'>
						<image :src="require('../../static/dingwei.svg')" mode=""></image>
						<text>{{ item.city + item.area + item.address }}</text>
					</div>
				</li>
			</ul>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				project_list: []
			}
		},
		created() {
			uni.getStorage({ // 从缓存中拿到用户的id
				key: 'userinfo',
				success: (res) => {
					// console.log(res.data)
					this.id = res.data.data.id
					this.$request('/api/index/Project_list', {
						uid: this.id
					}).then(res => {
						//console.log(res.data.data) // 数组数据，如果没有创建项目，那就是空的
						if (res.data.data == []) { // 如果是空的 就 弹框提示 返回首页
							uni.showModal({
								content: '请创建项目',
								success: (res) => {
									uni.navigateTo({
										url: '../ind/ind'
									})
								}
							})
						} else { // 如果不为空，那么就渲染数据，展示项目信息列表
							this.project_list = res.data.data
						}
					})
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({})
			},
			goDetails(index) {
				uni.navigateTo({
					url: '../details/details?project=' + JSON.stringify(this.project_list[index])
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.blue{
		width: 100%;
		height: 50rpx;		
		background: #3F5DE3;
	}
	.goback{
		padding-left: 20px;
		padding-right: 20px;
		background: #3F5DE3;
		width: 90%;
		height: 60px;
		line-height: 60px;
		margin: 0px auto;
		text-align: center;
		position: relative;
		color: white;
		font-size: 18px;
		image{
			width: 26px;
			height: 26px;
			position: absolute;
			left: 20px;
			top: 50%;
			margin-top: -10px;
		}
	}
	.search{
		width: 90%;
		height: 40px;
		padding: 20px;
		padding-bottom: 30px;
		margin: 0 auto;
		background: #3F5DE3;
		position: relative;
		image{
			width: 20px;
			height: 20px;
			position: absolute;
			left: 30px;
			top: 50%;
			margin-top: -14px;
		}
		input{
			width: 100%;
			height: 100%;
			background: white;
			color: #808080;
			text-align: center;
			border-radius: 10px;
			font-size: 14px;
		}
	}
	.list{
		width: 100%;
		height: 75%;
		background: white;
		border-radius: 20px;
		position: absolute;
		top: 160px;
		.title{
			margin-top: 20px;
			margin-left: 20px;
			font-size: 18px;
			image{
				width: 20px;
				height: 20px;
				margin-left: 4px;
				margin-right: 6px;
				vertical-align: middle;
			}
		}
		ul{
			width: 100%;
			li{
				margin: 0 auto;
				width: 90%;
				height: 80px;
				margin-top: 20px;
				border-radius: 10px;
				box-shadow: #D2D2D2 1px 2px 4px 2px;
				.up{
					width: 100%;
					height: 50%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 16px;
					text:nth-of-type(1){
						display: inline-block;
						width: 6px;
						height: 26px;
						border-radius: 2px;
						background: #3F5DE3;
						margin-right: 18px;
					}
					text:nth-of-type(2){
						flex-grow: 1
					}
					image{
						width: 30px;
						height: 30px;
						margin-right: 10px;
					}
				}
				.down{
					width: 100%;
					height: 50%;
					line-height: 40px;
					padding-left: 20px;
					display: flex;
					align-items: center;
					image{
						width: 18px;
						height: 18x;
						margin-right: 4px;
					}
					text{
						font-size: 13px;
						color: #919194;
					}
				}
			}
		}
	}
	
</style>
