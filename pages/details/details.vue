<template> <!-- 项目管理 -->
	<view>
		<div class='goback' @click='goBack'>
			<image :src="require('../../static/fanhui(1).png')" mode=""></image>
			<text></text>
		</div>
		<div class="title">
			<p>融创项目一期</p>
			<div>
				<image src="" mode=""></image>
				<text>最近更新：2020-09-01</text>
			</div>
		</div>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({})
			}
		}
	}
</script>

<style lang="less">
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
	.title{
		width: 100%;
		height: 100%;
		background: white;
		border-radius: 20px;
		position: absolute;
		top: 130px;
	}
</style>
