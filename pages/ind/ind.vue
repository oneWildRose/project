<template>
	<view>
		<view class="head">
			<view class="search">
				<image src="../../static/fangdajing.png" mode=""></image>
				<input type="text" value="搜索项目、苗木" />
			</view>
		</view>
		<view class="middle">
			<image src="../../static/02.jpg" mode=""></image>
		</view>
		<view class="bottom">
			<view class="text">
				<text>专注项目品质</text>
				<text>专家协作，指定优秀项目方案</text>
			</view>
			<uni-list>
				<uni-list-item title="" note="">
					<view class="">
						
					</view>
				</uni-list-item>
			</uni-list>
		</view>
		<view class="foot">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						img: '',
						title: '创建项目',
						content: '创建项目，填写项目完整信息，专家协作制定项目方案'
					},
					{
						img: '',
						title: '项目管理',
						content: '查看所有项目并可以对项目进行编辑，记录了项目上的实时数据'
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.head{
		width: 100%;
		height: 308px;
		background: url(../../static/01.jpg) no-repeat;
		background-size: 100%;
		background-position: 0;
		// border: 1px solid red;
		.search{
			width: 90%;
			height: 40px;
			line-height: 40px;
			margin: 0px auto;
			position: relative;
			image{
				width: 24px;
				height: 24px;
				position: absolute;
				top: 98%;
				left: 4%;
				z-index: 999;
			}
			input{
				width: 100%;
				height: 100%;
				color: #C3C3C3;
				background-color: white;
				border-radius: 6px;
				font-size: 14px;
				text-align: center;
				position: absolute;
				left: 0;
				top: 30px;
			}
		}
	}
	.middle{
		width: 96%;
		margin: 10px auto;
		height: 100px;
		image{
			width: 100%;
			height: 100%;
			border-radius: 10px;
		}
	}
</style>
