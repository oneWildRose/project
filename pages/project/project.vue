<template> <!-- 项目管理 -->
	<view>
		<div class='goback' @click='goBack'>
			<image src="../../static/fanhui(1).png" mode=""></image>
			<text>项目管理</text>
		</div>
		<div class="search">
			<image src="../../static/search.svg" mode=""></image>
			<input type="text" value="输入项目名称" />
		</div>
		<div class="list">
			<div class='title'>
				<image src="" mode=""></image>
				<text>项目列表</text>
			</div>
			<ul>
				<li></li>
				<li></li>
				<li></li>
			</ul>
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
		height: 100%;
		background: white;
		border-radius: 20px;
		position: absolute;
		top: 130px;
		.title{
			margin-top: 20px;
			margin-left: 20px;
			image{
				width: 20px;
				height: 20px;
			}
			text{
				
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
			}
		}
	}
	
</style>
