<template> <!-- 上传苗木数据 -->
	<view class="hello">
		<div class='goback'>
			<image :src="require('../../static/fanhui(1).png')" mode="" @click='goBack'></image>
			<div>
				<text>上传项目苗木清单</text>
			</div>
		</div>
		<div class='main'>
			
			<view class="btns">
				<!-- <web-view src="/hybrid/html/index2.html" @message="message"></web-view> -->
				<view class="content">
					<button type="primary" @tap="openFile">打开文件选择器</button>
					<view>文件路径为:{{ path }}</view>
					<tki-file-manager ref="filemanager" @result="resultPath"></tki-file-manager>
				</view>
			</view>
			
			<button type="default" @click="goSingle">上传单个苗木信息</button>
			<button type="default" @click="download">下载模板</button>
		</div>
	</view>
</template>
<script>
	import tkiFileManager from "@/components/tki-file-manager/tki-file-manager.vue"
	
	export default {
		components:{
			tkiFileManager,
			
		},
		data() {
			return {
				path: '', // 上传文件的路径
				project_id: ''
			}
		},
		onLoad(option) {
			// console.log(option)
			this.project_id = option.project_id
		},
		mounted() {
			// var height= 0;//定义动态的高度变量，如高度为定值，可以直接写
			// uni.getSystemInfo({
			// 	success: (sysinfo) => {
			// 	height = sysinfo.windowHeight-500;//自行修改，自己需要的高度
			// 	// console.log(height);
			// },
			// complete: () => {
				
			// }
			// });
			// var currentWebview = this.$scope.$getAppWebview();//获取当前web-view
			// setTimeout(function() {
			// 	var wv = currentWebview.children()[0];
			// 	// console.log(wv);
			// 	wv.setStyle({//设置web-view距离顶部的距离以及自己的高度，单位为px
			// 		top: 300,
			// 		height: height,
			// 	})
			// }, 0);//如页面初始化调用需要写延迟
		},
		methods: {
			openFile(){
				this.$refs.filemanager._openFile()
			},
			resultPath(e){
				this.path = e
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			download() { // 下载模板
				uni.downloadFile({
				    url: 'http://lvz.maike-docker.com/public/upload/template.xlsx', // 模板链接
				    success: (res) => {
						console.log(res.tempFilePath)
						var path = res.tempFilePath
						if(res.statusCode==200){
							//保存到本地
							console.log(path)
							uni.saveFile({
								tempFilePath: path,
								success:(res)=>{
									console.log(res)
									// 下载成功，打开文档
									uni.openDocument({
										filePath:res.savedFilePath,
										success:(res)=>console.log('成功打开文档')
									})
								}
							})
						}
				    }
				});
			},
			goSingle() {
				uni.navigateTo({
					url: '../single/single?project_id=' + this.project_id
				})
			},
			message(event) {
				this.path = event.detail.data[0].file
				console.log(this.path)
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.hello{
		width: 100%;
		height: 1080rpx;
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
			font-size: 36rpx;
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
				top: 42%;
				font-weight: 600;
				font-size: 38rpx;
				display: flex;
				align-items: center;
			}
		}
	}
	.main{
		width: 100%;
		height: 82%;
		background: white;
		border-radius: 30rpx;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		position: absolute;
		top: 280rpx;
		button{
			width: 90%;
			margin-top: 40rpx;
			background: #EAEEFF;
			color: #4D4D4D;
			font-size: 35rpx;
		}
	}
</style>
