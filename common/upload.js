const baseUrl = 'http://jl.jingyunlv.com/index.php' // 原来的域名http://lvz.maike-docker.com/index.php
//							camera拍照，album从相册选图
const upload = (url = '', sourceType = ['camera','album'], formData = {
	// 'file': 'test'  // 这里一定不能加file! 否则 ios 上传图片会失败，安卓无此问题
},header = { // 请求头一定要加! 否则 ios 上传图片会失败， 安卓可有可无。 总结:‘安卓香香，苹果臭臭’
    'content-type' : 'multipart/form-data' 
}) => {
    return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: 1, //数量限制
			sourceType: sourceType, // 照片选择形式
		    success: (chooseImageRes) => {
		        const tempFilePaths = chooseImageRes.tempFilePaths;
				uni.showLoading({
					mask: true // 透明蒙层，防止触摸穿透
				})
				uni.uploadFile({
					url: baseUrl + url,
					filePath: tempFilePaths[0],
					name: 'file',
					formData: formData,
					success: (uploadFileRes) => {
						// resolve(uploadFileRes.data) // 图片路径
						resolve(JSON.parse(uploadFileRes.data).data.file)
					}
				})
		    }
		})
    });
}
export default upload