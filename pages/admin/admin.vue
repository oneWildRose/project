<template>
	<view class="">
		<ind>
			<template>
				<view slot='msg' class="msg">
					<div class='tit'>
						<text>坚实华鼎物业服务有限公司</text>
						<div>
							<image :src="require('../../static/dingwei.svg')" mode=""></image>
							<text>天津</text>
						</div>
					</div>
					<div class='main'>
						<div>
							<p>15</p>
							<text>从业时间(年)</text>
						</div>
						<div>
							<p>255</p>
							<text>总服务项目数</text>
						</div>
					</div>
				</view>
			</template>
		</ind>
	</view>
</template>

<script>
	import ind from '../../module/ind/ind'
	export default {
		components: {
			ind
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.msg{
		width: 90%;
		margin: 40rpx auto;
		.tit{
			width: 100%;
			height: 80rpx;
			border: 1px solid red;
			display: flex;
			justify-content: space-between;
			&>text{
				font-weight: bold;
				font-size: 34rpx;
			}
			div{
				font-size: 28rpx;
				image{
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
		.main{
			width: 100%;
			height: 180rpx;
			background: white;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			box-shadow: #adadad 0px 0px 4px 0px;
			div{
				width: 50%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				p{
					font-size: 34rpx;
				}
				text{
					color: #808080;
				}
			}
		}
	}
</style>
