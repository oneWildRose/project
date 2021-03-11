<template> <!-- 常见问题 -->
	<view>
		<div class="status" style='background-color: #F8F8F8;'></div>
		<div class='title'>
			<image :src="require('../../static/fanhui(3).png')" mode="" @click="goBack"></image>
			<text>常见问题</text>
		</div>
		<u-collapse class='collapse'>
			<u-collapse-item class='item' :title="item.head" v-for="(item, index) in itemList" :key="index">
				{{item.body}}
			</u-collapse-item>
		</u-collapse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [{
					head: "项目主管怎么创建自己的账号",
					body: "项目主管的账号是由PC端后台管理员发放的",
					open: false
				},{
					head: "一个手机号可以注册几个账号？",
					body: "一个手机号仅可以注册绑定一个账号。",
					open: false,
				},{
					head: "登录密码忘记怎么找回？",
					body: "在登录界面点击'忘记密码'可以找回",
					open: false,
				}]
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less" scoped>
	.title{
		width: 90%;
		margin: 0rpx auto;
		height: 100rpx;
		display: flex;
		align-items: center;
		image{
			width: 46rpx;
			height: 46rpx;
		}
		text{
			display: inline-block;
			width: 100%;
			font-size: 32rpx;
			text-align: center;
			margin-left: -40rpx;
		}
	}
	.collapse{
		width: 90%;
		height: auto;
		margin-left: 6%;
		.item{
			min-height: 80rpx;
			line-height: 80rpx;
			uni-view{
				
			}
		}
	}
</style>
