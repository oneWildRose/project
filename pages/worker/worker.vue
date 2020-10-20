<template> <!-- 员工 -->
	<view class="hello">
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../static/fanhui(1).png')" mode="" class="goback" @click="goBack"></image>
			<text>员工</text>
		</div>
		<div class="search">
			<image :src="require('../../static/search.svg')" mode=""></image>
			<input type="text" value="" placeholder="搜索员工" />
		</div>
		<div class="list">
			<ul>
				<li v-for="(item, index) in list" :key='index' @click='goworkerMsg(item.name)'>
					<image :src="item.src" mode=""></image>
					<div>
						<div>
							<text>{{ item.name }}</text>
							<p>
								{{ item.sex }}
								<image :src="item.src_sex" mode=""></image>
							</p>
							<text>{{ item.age }}岁</text>
						</div>
						<p>{{ item.work }}</p>
					</div>
					<image :src="require('../../static/jinru.svg')" mode=""></image>
				</li>
			</ul>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						src: 'https://org.modao.cc/uploads4/images/5258/52585076/v2_qemset.png',
						name: '刘备',
						sex: '男',
						src_sex: '../../static/10-13/man.svg',
						age: '46',
						work: '绿化工人'
					},
					{
						src: 'https://org.modao.cc/uploads4/images/5258/52585076/v2_qemset.png',
						name: '张飞',
						sex: '男',
						src_sex: '../../static/10-13/man.svg',
						age: '42',
						work: '绿化工人'
					},
					{
						src: 'https://org.modao.cc/uploads4/images/5258/52585076/v2_qemset.png',
						name: '关羽',
						sex: '男',
						src_sex: '../../static/10-13/man.svg',
						age: '44',
						work: '绿化工人'
					},
					{
						src: 'https://org.modao.cc/uploads4/images/5258/52585076/v2_qemset.png',
						name: '刘备',
						sex: '女',
						src_sex: '../../static/10-13/woman.svg',
						age: '46',
						work: '绿化工人'
					},
					{
						src: 'https://org.modao.cc/uploads4/images/5258/52585076/v2_qemset.png',
						name: '张飞',
						sex: '男',
						src_sex: '../../static/10-13/man.svg',
						age: '42',
						work: '绿化工人'
					},
					{
						src: 'https://org.modao.cc/uploads4/images/5258/52585076/v2_qemset.png',
						name: '关羽',
						sex: '女',
						src_sex: '../../static/10-13/woman.svg',
						age: '44',
						work: '绿化工人'
					},
					{
						src: 'https://org.modao.cc/uploads4/images/5258/52585076/v2_qemset.png',
						name: '关羽',
						sex: '女',
						src_sex: '../../static/10-13/woman.svg',
						age: '44',
						work: '绿化工人'
					},
					{
						src: 'https://org.modao.cc/uploads4/images/5258/52585076/v2_qemset.png',
						name: '关羽',
						sex: '女',
						src_sex: '../../static/10-13/woman.svg',
						age: '44',
						work: '绿化工人'
					},
					{
						src: 'https://org.modao.cc/uploads4/images/5258/52585076/v2_qemset.png',
						name: '关羽',
						sex: '女',
						src_sex: '../../static/10-13/woman.svg',
						age: '44',
						work: '绿化工人'
					},
					{
						src: 'https://org.modao.cc/uploads4/images/5258/52585076/v2_qemset.png',
						name: '关羽',
						sex: '女',
						src_sex: '../../static/10-13/woman.svg',
						age: '44',
						work: '绿化工人'
					},
					{
						src: 'https://org.modao.cc/uploads4/images/5258/52585076/v2_qemset.png',
						name: '关羽',
						sex: '女',
						src_sex: '../../static/10-13/woman.svg',
						age: '44',
						work: '绿化工人'
					}
				]
			};
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goworkerMsg(name) {
				uni.navigateTo({
					url: 'workerMsg/workerMsg?name=' + name
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
		background: #F5F6F9;
		.title{
			width: 100%;
			height: 100rpx;
			background: #5E79F2;
			display: flex;
			justify-content: space-around;
			align-items: center;
			image{
				width: 50rpx;
				height: 50rpx;
				margin-left: 40rpx;
			}
			text{
				flex-grow: 1;
				text-align: center;
				color: white;
				font-size: 36rpx;
				font-weight: bold;
				margin-left: -100rpx;
			}
		}
		.search{
			width: 700rpx;
			height: 80rpx;
			margin: 40rpx auto;
			position: relative;
			image{
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				top: 50%;
				margin-top: -16rpx;
				left: 34%;
			}
			input{
				width: 100%;
				height: 100%;
				text-align: center;
				border: 1px solid #5E79F2;
				background: white;
				border-radius: 12rpx;
			}
		}
		.list{
			width: 100%;
			height: 90%;
			overflow: auto;
			ul{
				width: 100%;
				height: auto;
				li{
					width: 100%;
					height: 148rpx;
					background: white;
					margin: 20rpx 0;
					display: flex;
					justify-content: space-around;
					align-items: center;
					&>image{
						&:nth-of-type(1) {
							width: 104rpx;
							height: 104rpx;
							border-radius: 50%;
							margin-left: 40rpx;
						}
						&:nth-last-of-type(1){
							width: 40rpx;
							height: 40rpx;
							margin-right: 40rpx;
						}
					}
					&>div{
						width: 450rpx;
						height: 90rpx;
						display: flex;
						flex-direction: column;
						div{
							width: 60%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							p{
								image{
									width: 40rpx;
									height: 40rpx;
									vertical-align: middle;
									margin-top: -6rpx;
								}								
							}
							text:nth-of-type(2){
								margin-left: -40rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
