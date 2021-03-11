<template> <!-- 专家履历 -->
	<view class="hello">
		<div class="status" style='background-color: #F8F8F8;'></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(3).png')" mode="" @click="goBack"></image>
			<text>专家履历</text>
		</div>
		<ul class='main'>
			<li>
				<p>从业日期</p>
				<text @click="goWorkDateChange">{{ practicedate == null? '暂未设置' : practicedate }}</text>
				<image :src="require('../../../static/jinru.svg')" @click="goWorkDateChange"></image>
			</li>
			<li>
				<p>专家标签</p>
				<div class='tag'>
					<p v-if="msg.tags == ''">暂无</p>
					<text v-if="msg.tags != ''" v-for='(item, index) in msg.tags' :key='index'>
						{{ item }}
					</text>
				</div>
				<image :src="require('../../../static/jinru.svg')" @click="goTagChange"></image>
			</li>
			<li class='youshi'>
				<div>
					<p>个人优势</p>
					<image :src="require('../../../static/bianji.svg')" style="width: 40rpx;height: 40rpx;" @click="goForteChange"></image>
				</div>
				<textarea class='forte' :value="text" :placeholder="text == null || text == ''? '请填写您的优势':''" auto-height disabled @click="goForteChange"/>
			</li>
			<li class='jingli'>
				<div>
					<p>项目经历</p>
					<image :src="require('../../../static/tianjia.svg')" mode="" @click="goExperience(1)"></image>
				</div>
				<div v-if='msg.record == 0' style='height: auto;'>暂无</div>
				<ul v-if='msg.record != 0'>
					<li v-for='(item, index) in msg.record' :key='index'>
						<div @click="goExperience(2, item.id)">
							<p>项目名称：</p>
							<text>{{ item.project_name }}</text>
							<image :src="require('../../../static/jinru.svg')" mode=""></image>
						</div>
						<div>
							<p>担任角色：</p>
							<text>{{ item.role }}</text>
						</div>
						<div style='min-height: 80rpx; height: auto;'>
							<p>项目描述：
								<text style="margin-left: 5rpx;">{{ item.details == ''? '暂无' : item.details }}</text>
							</p>
						</div>
						<div>
							<p>案例图片：</p>
							<image v-for="(item1, index) in item.images" :src='item1' @click="preview(item1)"></image>
						</div>
					</li>
				</ul>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: '',
				msg: '',
				text: '',
				practicedate: '',
				time: new Date().Format("yyyy-MM-dd"),
			}
		},
		onLoad(option) {
			this.uid = option.uid
		},
		onShow() {
			this.$request('/api/index/infoIndex', {
				uid: this.uid
			}).then(res => {
				// console.log(res)
				if(res.data.data.record) {
					for(var i = 0; i < res.data.data.record.length; i++){
						// 后台数据是字符串格式，将其转换成数组
						res.data.data.record[i].images = JSON.parse(res.data.data.record[i].images)
						for(var j = 0; j < res.data.data.record[i].images.length; j++) {
							res.data.data.record[i].images[j] += this.$store.state.imgFix // 加上缩略图参数
						}
					}
				}
				this.msg = res.data.data
				this.practicedate = this.msg.info.practicedate
				this.text = this.msg.info.introduce
				// console.log(this.msg)
			})
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			goWorkDateChange() { // 修改从业日期
				uni.navigateTo({
					url: '../workDateChange/workDateChange?uid=' + this.uid
				})
			},
			goTagChange() { // 修改专家标签
				uni.navigateTo({
					url: '../tagChange/tagChange?uid=' + this.uid
				})
			},
			goForteChange() { // 修改个人优势
				uni.navigateTo({
					url: '../forteChange/forteChange?uid=' + this.uid
				})
			},
			goExperience(num, id) { // 项目经历
				uni.navigateTo({
					url: '../experience/experience?uid=' + this.uid + '&dir=' + num + '&id=' + id
				})
			},
			preview(url) { // 图片预览
				uni.previewImage({
					urls: [ url.split('?')[0] ]
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
	.head{
		width: 94%;
		height: 100rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			width: 50rpx;
			height: 50rpx;
		}
		text{
			flex-grow: 1;
			text-align: center;
			font-size: 36rpx;
			margin-left: -60rpx;
		}
		&>div{
			font-size: 32rpx;
			color: #4065F0;
		}
	}
	.main{
		width: 90%;
		height: 87.5%;
		overflow-y: scroll;
		&::-webkit-scrollbar {
			display: none; //隐藏滚动条
		}
		margin: 20rpx auto;
		&>li{
			width: 100%;
			border-bottom: 1px solid #ECECEC;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			p{
				flex-grow: 1;
				font-size: 32rpx;
			}
			image{
				width: 30rpx;
				height: 30rpx;
				margin-left: 16rpx;
				vertical-align: middle;
			}
			.tag{
				display: flex;
				align-items: center;
				&>text{
					padding: 0 20rpx 0 20rpx;
					height: 50rpx;
					line-height: 50rpx;
					border-radius: 30rpx;
					margin-left: 10rpx;
					font-size: 28rpx;
					&:nth-of-type(1){
						background: #00CC1E;
						color: white;
					}
					&:nth-of-type(2){
						background: #4CD9C0;
						color: white;
					}
					&:nth-of-type(3){
						background: #A4ADFF;
						color: white;
					}
					&:nth-of-type(4){
						background: #00CC1E;
						color: white;
					}
				}
			}
		}
		.youshi{
			display: block;
			height: auto;
			padding-bottom: 20rpx;
			&>div{
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.forte{
				width: 100%;
				font-size: 30rpx;
				text-indent: 40rpx;
			}
		}
		.jingli{
			display: block;
			height: auto;
			padding-bottom: 20rpx;
			border: none;
			&>div{
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				image{
					width: 46rpx;
					height: 46rpx;
				}
			}
			ul{
				width: 100%;
				height: auto;
				li{
					width: 100%;
					height: auto;
					border-bottom: 1px solid #ECECEC;
					&>div{
						height: 80rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						text{
							flex-grow: 100;
							text-align: left;
							font-size: 30rpx;
						}
						&:nth-last-of-type(1){
							// margin-top: 14rpx;
							display: block;
							height: auto;
							&::after{
								content: '';
								clear: both;
								height: 0;
								display: block;
								visibility: hidden;
							}
							image{
								width: 148rpx;
								height: 148rpx;
								float: left;
								margin-left: 0rpx;
								margin-right: 20rpx;
								margin-bottom: 10rpx;
								margin-top: 10rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
