<template>  <!-- 选择专家标签 -->
	<view>
		<div class="status" style='background: white;'></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(3).png')" mode="" @click="goBack"></image>
			<text @click="save">保存</text>
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
		<u-toast ref="uToast" />
		<u-modal v-model="show" :content="content"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tag: [], // 后台请求来的标签数组容器
				tag_name: [], // 后台请求来的标签name属性的数组
				tagArr: [], // 用户选中的标签数组容器
				tagArr_id: [], // ............id容器
				uid: this.$store.state.uid,
				arr_class: ['green','cyan','purple','green','cyan','purple','green','cyan','purple','green'],
				isClick: true ,// 控制点击事件是否可以被触发
				show: false,
				content: '请至少选择一个标签'
			}
		},
		onLoad(option) {
			if(option.uid){
				this.uid = option.uid
			}
			this.$request('/api/index/tagList').then(res => {
				// 向请求来的数据中添加一些属性，方便后续点击事件changeColor的逻辑
				for(var i = 0; i < res.data.data.length; i++) {
					res.data.data[i].class = this.arr_class[i]
					res.data.data[i].istag = false
					this.tag_name.push(res.data.data[i].name)
				}
				this.tag = res.data.data
				this.$request('/api/index/infoIndex', {
					uid: this.uid
				}).then(res => {
					var arr = []
					arr = res.data.data.tags
					for(var i = 0; i < arr.length; i++) {
						if(this.tag_name.indexOf(arr[i]) != -1) { //检索name数组中是否存在arr[i]
							var index = this.tag_name.indexOf(arr[i])
							this.tag[index].istag = true
							this.tagArr.push(this.tag[index])
						}
					}
					this.tagArr = this.tagArr.filter(item => { // 筛选出符合条件的
						if(item.istag == true) {
							return true
						}
					})
				})
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
				if(this.isClick == false) {return}
				this.isClick = false // 冻结按钮点击事件，防止用户暴力点击重复触发事件，在所有动作完成后按钮事件恢复正常
				if(this.tagArr.length == 0) {
					this.show = true
					this.isClick = true
					return;
				}
				this.tagArr_id = []
				for(var i = 0; i < this.tagArr.length; i++) {
					this.tagArr_id.push(this.tagArr[i].id)
				}
				this.$request('/api/index/tagSub', { // 选择标签提交
					uid: this.uid,
					tags: this.tagArr_id.toString()
				}).then(res => {
					// console.log(res)
					if(res.data.code == 1) {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'success',
							duration: 1000,
							position: 'bottom',
							back: true
						})
					} else {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'error',
							duration: 1200,
							position: 'bottom',
							callback: function () {
								that.isClick = true
							}
						})
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
			font-size: 34rpx;
			color: #4065F0;
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
