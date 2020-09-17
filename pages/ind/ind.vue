<template> <!-- 首页 -->
	<view>
		<view class="head">
			<view class="search">
				<image :src="require('../../static/fangdajing.png')" mode=""></image>
				<input type="text" value="搜索项目、苗木" />
			</view>
		</view>
		<view class="middle">
			<image :src="require('../../static/02.jpg')" mode=""></image>
		</view>
		<view class="bottom">
			<view class="text">
				<view>专注项目品质</view>
				<text>专家协作，指定优秀项目方案</text>
			</view>
			<ul>
				<li title="" note="">
					<navigator url='../create/create'>
						<image :src="require('../../static/create.svg')"></image>
						<view class="">
							<p>创建项目</p>
							<p>创建项目，填写项目完整信息，专家协作制定项目方案</p>
						</view>
					</navigator>
				</li>
				<li title="" note="">
					<navigator url='../project/project'>
						<image :src="require('../../static/guanli.svg')"></image>
						<view class="">
							<p>项目管理</p>
							<p>查看所有项目并可以对项目进行编辑，记录了项目上的实时数据</p>
						</view>
					</navigator>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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
	
	.bottom{
		width: 100%;
		margin-top: 20px;
		.text{
			width: 90%;
			margin: 0 auto;
			text-align: left;
			view{
				font-weight: bold;
				font-size: 16px;
			}
			text{
				font-size: 14px;
				color: #8C8C8C;
			}
		}
		ul{
			li{
				width: 90%;
				height: 100px;
				margin: 14px auto;
				// border: 1px solid blue;
				background: white;
				box-shadow: #D2D2D2 1px 2px 6px 2px;
				border-radius: 10px;
				display: block;
				position: relative;
				navigator{
					height: 100%;
					position: relative;
				}
				image{
					width: 38px;
					height: 38px;
					position: absolute;
					left: 10%;
					top: 50%;
					margin-top: -19px;
				}
				view{
					width: 60%;
					// border: 1px solid red;
					position: absolute;
					left: 30%;
					top: 16%;
					p:nth-of-type(1){
						font-weight: bold;
						font-size: 16px;
						margin-bottom: 10px;
					}
					p:nth-of-type(2){
						color: #8c8c8c;
						font-size: 12px;
					}
				}
			}
		}
	}
	
</style>
