<template>  <!-- 选择专家标签 -->
	<view>
		<div class="status" style='background: white;'></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(3).png')" mode="" @click="goBack"></image>
			<text @click="save">确定</text>
		</div>
		<p class='title'>选择您的标签</p>
		<p class='tit'>请选择您擅长的领域(可以多选)</p>
		<div class='tag'>
			<div v-for='(item, index) in tag' :key='index' 
				@click='changeColor(index)'
				:class='item.istag? item.class : "" '>
				{{ item.name }}
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tag: [],
				tagArr: [],
				arr_class: ['green','cyan','purple','green','cyan','purple','green','cyan','purple','green']
			}
		},
		onShow() {
			this.$request('/api/index/tagList', {}).then(res => {
				// console.log(res)
				// 向请求来的数据中添加一些属性，方便后续点击事件的逻辑
				for(var i = 0; i < res.data.data.length; i++) {
					res.data.data[i].class = this.arr_class[i]
					res.data.data[i].istag = false
				}
				this.tag = res.data.data
			})
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			changeColor(index) {
				this.tag[index].istag = !this.tag[index].istag // 控制样式类名
				this.tagArr.push(this.tag[index]) // 每一次点击都进行添加
				this.tagArr = this.tagArr.filter(item => { // 筛选出符合条件的
					if(item.istag == true) {
						return true
					}
				})
			},
			save() {
				var that = this
				uni.setStorage({ // 存入缓存
					key: 'tagArr',
					data: that.tagArr,
					success() {
						that.goBack()
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.head{
		width: 94%;
		margin: 0 auto;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			width: 40rpx;
			height: 40rpx;
		}
		text{
			font-size: 32rpx;
		}
	}
	.title{
		font-size: 36rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin-left: 40rpx;
		font-weight: bold;
	}
	.tit{
		font-size: 28rpx;
		color: #828382;
		height: 60rpx;
		line-height: 60rpx;
		margin-left: 40rpx;
		margin-bottom: 20rpx;
	}
	.tag{	
		width: 90%;
		margin: 0 auto;
		height: auto;
		display: flex;
		div{
			padding: 12rpx 20rpx 12rpx 20rpx;
			background: #F2F2F7;
			color: #828486;
			border-radius: 30rpx;
			margin-right: 20rpx;
		}
		.green{
			background: #00CC1E;
			color: white;
		}
		.cyan{
			background: #4CD9C0;
			color: white;
		}
		.purple{
			background: #A4ADFF;
			color: white;
		}
	}
</style>
