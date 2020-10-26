<template> <!-- 苗木信息 -->
	<view class="hello">
		<div class="status"></div>
		<div class='goback'>
			<image :src="require('../../static/fanhui(1).png')" mode="" @click='goBack'></image>
			<div>
				<text>点位信息</text>
			</div>
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
					<text>{{ list.update_time }}</text>
				</li>
				<li class='pic'>
					<text>点位照片</text>
					<image :src="list.url" mode="" @click="preview(list.url)"></image>
				</li>
				<li class='pic'>
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
				<button type="default" hover-class="none" @click="upload">点击上传最新图片</button>
			</ul>
			<div></div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: '',
				file_id: '',
				src_zanwu: '../../static/zanwu.png',
			}
		},
		onLoad(option) {
			this.file_id = option.file_id
			this.$request('/api/index/fileinfo', {
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
				uni.chooseImage({
					count: 1, //最多选取一张图片
					sourceType: ['camera'], // 限制用户只能拍照上传，不能选择相册里的图片
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: 'http://lvz.maike-docker.com/index.php/api/index/newUpload',
				            filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test',
								'file_id': this.file_id
							},
				            success: (uploadFileRes) => {
								// 返回的是string格式，需要转换
								var data = JSON.parse(uploadFileRes.data)
								if(data.code == 1) { // 上传成功
									this.$request('/api/index/fileinfo', {
										file_id: this.file_id
									}).then(res => {
										// console.log(res)
										this.list = res.data.data
									})
								}
				            }
				        });
				    }
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		width: 100%;
		height: 100%;
		background: url(../../static/brg.jpg) no-repeat;
		background-size: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		.goback{
			padding-left: 40rpx;
			padding-right: 40rpx;
			background: transparent;
			width: 90%;
			height: 320rpx;
			line-height: 120rpx;
			margin: 0px auto;
			text-align: center;
			position: relative;
			color: white;
			&>image{
				width: 52rpx;
				height: 52rpx;
				position: absolute;
				left: 40rpx;
				top: 50%;
				margin-top: -120rpx;
			}
			div{
				width: 400rpx;
				height: 80rpx;
				line-height: 80rpx;
				position: absolute;
				left: 40rpx;
				top: 36%;
				font-weight: 600;
				font-size: 40rpx;
				display: flex;
				align-items: center;
			}
		}
	}
	.main{
		width: 100%;
		height: auto; /* 81.7% */
		background: white;
		border-radius: 30rpx;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		position: absolute;
		top: 280rpx;
		ul{
			width: 90%;
			height: auto;
			font-size: 36rpx;
			margin: 50rpx auto;
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
		div{
			width: 100%;
			height: 80rpx;
		}
	}
</style>
