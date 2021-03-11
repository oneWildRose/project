<template> <!-- 点位信息（具体） -->
	<view class="hello">
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>点位信息</text>
		</div>
		<div class='main'>
			<ul>
				<li>
					<text>点位名称</text>
					<text>{{ list.name }}</text>
				</li>
				<li>
					<text>点位级别</text>
					<text>{{ list.levelname }}</text>
				</li>
				<li>
					<text>点位编号</text>
					<text>{{ list.dnumber }}</text>
				</li>
				<li>
					<text>最近更新</text>
					<text>{{ list.create_time }}</text>
				</li>
				<li class='pic'>
					<text>点位照片</text>
					<image :src="list.url" mode="" @click="preview(list.url)"></image>
				</li>
				<!-- <li class='pic'>
					<text>标准照片</text>
					<image :src="list.picture == ''? src_zanwu : list.picture" mode="" @click="preview(list.picture)"></image>
				</li>
				<li class='pic'>
					<text>
						最新图片
						<text v-if="list.newpicture == list.url? false : true" style="font-size: 28rpx;">({{ list.create_time }})</text>
					</text>
					<image :src="list.newpicture == '' || list.newpicture == list.url? src_zanwu : list.newpicture" mode="" @click="preview(list.newpicture)"></image>
				</li>
				<button type="default" hover-class="none" @click="upload">点击上传最新图片</button> -->
			</ul>
			<div class='btn' @click='goPointtree'>
				<image :src="require('../../static/shu3.svg')" mode=""></image>
				<text>点位苗木</text>
				<div>
					<text>查看</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</div>
			</div>
			<div class='btn' @click='goAllpic'>
				<image :src="require('../../static/zhaopian.svg')" mode=""></image>
				<text>全部照片</text>
				<div>
					<text>查看</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: '',
				file_id: '',
				project_id: '',
				src_zanwu: '../../static/zanwu.png',
			}
		},
		onLoad(option) {
			this.project_id = option.project_id
			this.file_id = option.file_id
			this.$request('/api/file/fileinfo', {
				file_id: this.file_id
			}).then(res => {
				// console.log(res)
				this.list = res.data.data
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goPointtree() { // 点位苗木
				uni.navigateTo({
					url: '../details/pointTree/pointTree?file_id=' + this.file_id + '&project_id=' + this.project_id
				})
			},
			goAllpic() { // 全部照片
				uni.navigateTo({
					url: '../details/allPic/allPic?file_id=' + this.file_id
				})
			},
			preview(url) {
				if(url == '' || null) {
					return ;
				} else {
					uni.previewImage({
						urls: [ url ]
					})
				}
			},
			getTime() {
				var data = new Date() // 日期对象
				var year = data.getFullYear() // 年份
				var month = data.getMonth() + 1 // 月份
				var day = data.getDate() // 当天
				return year + '-' + month + '-' + day // 拼接格式：2020-02-02
			},
			upload() {
				this.$upload('/api/index/newUpload', ['camera'], {
					'user': 'test',
					'file_id': this.file_id
				}).then(res => {
					// 返回的是string格式，需要转换
					var data = JSON.parse(res)
					if(data.code == 1) { // 上传成功
						this.$request('/api/index/fileinfo', {
							file_id: this.file_id
						}).then(res => {
							// console.log(res)
							this.list = res.data.data
							uni.hideLoading()
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
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
	}
	.main{
		width: 100%;
		height: auto;
		ul{
			width: 88%;
			height: auto;
			font-size: 36rpx;
			margin: 40rpx auto;
			margin-bottom: 0;
			li{
				width: 100%;
				height: 60rpx;
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
			}
			.pic{
				height: auto;
				display: flex;
				margin-bottom: 40rpx;
				flex-direction: column;
				image{
					width: 100%;
					margin-top: 10rpx;
				}
			}
			button{
				width: 50%;
				margin: 20rpx auto;
				height: 60rpx;
				line-height: 60rpx;
				color: white;
				font-size: 30rpx;
				text-align: center;
				background: #5C7CF3;
			}
		}
		.btn{
			width: 90%;
			height: 110rpx;
			margin: 20rpx auto;
			border: 1px solid #E2E2E2;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&>image{
				width: 56rpx;
				height: 56rpx;
				margin-left: 20rpx;
				margin-right: 20rpx;
			}
			&>text{
				flex-grow: 1;
				text-align: left;
				font-size: 34rpx;
			}
			&>div{
				display: flex;
				align-items: center;
				font-size: 30rpx;
				image{
					width: 30rpx;
					height: 30rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
