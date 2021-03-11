<template> <!-- 专家试做方案详情 -->
	<view>
		<ul>
			<li>
				<text>点位名称：</text>
				<text>{{ name }}</text>
			</li>
			<li>
				<text>点位编号：</text>
				<text>{{ dnumber }}</text>
			</li>
			<li>
				<text>点位级别：</text>
				<text>{{ levelname }}</text>
			</li>
			<li>
				<text>原始图片：</text>
				<image :src="url" mode="" @click='preview(url)'></image>
			</li>
			<li>
				<text>方案图片：</text>
				<image :src="plan_url" mode="" @click='preview(plan_url)'></image>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schemen_id: '',
				plan_url: '',
				name: '',
				dnumber: '',
				levelname: '',
				url: ''
			}
		},
		onLoad(option) {
			this.schemen_id = option.schemen_id
			this.$request('/api/Highseasapi/schemendetail', {
				schemen_id: this.schemen_id
			}).then(res => {
				// console.log(res)
				this.plan_url = res.data.data.plan_url
				this.name = res.data.data.name
				this.dnumber = res.data.data.dnumber
				this.levelname = res.data.data.levelname
				this.url = res.data.data.url
			})
		},
		methods: {
			preview(url) {
				uni.previewImage({
					urls: [ url ]
				})
			}
		}
	}
</script>

<style lang="less">
	ul{
		width: 90%;
		height: auto;
		margin: 20rpx auto;
		li{
			width: 100%;
			margin-bottom: 20rpx;
			font-size: 32rpx;
			font-weight: bold;
			image{
				width: 100%;
				height: 500rpx;
			}
		}
	}
</style>
