<template>		<!-- 聊天界面 -->
	<view class="hello">
		<div class="status" style='background: #6876FF;position: fixed;top: 0;'></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>张三</text>
		</div>
		<div class="message">
			<scroll-view scroll-y="true" >
				<div v-for='(item, index) in message' :key='index'>
					<div class="userH" :class="{'userMe' : item.userId == ''}">
						<div class="userImg">
							<image :src="item.userImg" mode="scaleToFill"></image>
						</div>
						<div class="userType">
							
							<!-- 文本格式 -->
							<template v-if="item.type == 'text'">
								<div class="textType">
									<text>{{ item.context }}</text>
								</div>
							</template>
							
						</div>
					</div>
				</div>
			</scroll-view>
		</div>
		<div class="send">
			<input class='input' type="text" :adjust-position='false' :value="content" @input='textChange' @focus='focus'/>
			<div class='file' v-if='bol'>+</div>
			<!-- 添加prevent修饰符，阻止默认行为，在此场景意为阻止input失焦后键盘的默认隐藏 -->
			<div class='text' v-else @touchend.prevent="send">发送</div> 
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bol: true,
				content: '',
				scrollAnimation: false,
				scrollTop: 0,
				message: [ // 发送的消息数组
					{
						userId: 1,
						meId: '',
						userName: '纵横天下',
						userImg: '../../../static/01.jpg',
						type: 'text',
						context: '你好，请问有什么可以帮助你的吗',
						time: this.getTime()
					},
					{
						userId: "",
						meId: 1,
						userName: '白百合',
						userImg: '../../../static/01.jpg',
						type: 'text',
						context: '没有，谢谢',
						time: (new Date().getTime())
					}
				],
			}
		},
		onLoad() {
			// 滚动到底部
			this.$nextTick(function() {
				//进入页面滚动到底部
				this.scrollTop = 9999;
				this.$nextTick(function() {
					this.scrollAnimation = true;
				});
				
			});
		},
		onShow() {
			this.scrollTop = 9999999;
		},
		methods: {
			focus() {
				uni.pageScrollTo({scrollTop: 99999, duration: 0});
			},
			goBack() {
				uni.navigateBack()
			},
			getTime() {
				var data = new Date() // 日期对象
				var year = data.getFullYear() // 年份
				var month = data.getMonth() + 1 // 月份
				var day = data.getDate() // 当天
				var hour = data.getHours() // 几时
				var minutes = data.getMinutes()
				return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes 
			},
			textChange(e) {
				// console.log(e.target.value)
				if(e.target.value != '') {
					this.bol = false
					this.content = e.target.value
				} else {
					this.bol = true
				}
			},
			send() { // 发送消息
				let obj = {
					userId: '',
					meId: 2,
					userName: '白百合',
					userImg: '../../../static/01.jpg',
					type: 'text',
					context: this.content,
					time: (new Date().getTime())
				}
				this.message.push(obj)
				this.$goEasy.publish({
				    channel: "my_channel", //替换为您自己的channel
				    message: this.content //替换为您想要发送的消息内容
				});
				this.content = ''
				this.bol = true
			},
			receive() { // 接收消息
				this.$goEasy.subscribe({
				    channel: "my_channel", //替换为您自己的channel
				    onMessage: function (message) {
				        console.log("Channel:" + message.channel + " content:" + message.content);
				    }
				});
			}
			
		}
	}
</script>

<style lang="less" scoped>
	.userH{
		width: 98%;
		margin: 0 auto;
		height: auto;
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		padding-top: 20rpx;
	}
	.userMe{
		flex-direction: row-reverse;
		.textType{
			background-color: #1bd173;
			text{
				color: white;
			}
		}
	}
	.userImg{
		width: 70rpx;
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.userImg>image{
		width: 65rpx;
		height: 65rpx;
		border-radius: 100%;
	}
	.userType{
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 10rpx;
		margin-right: 6rpx;
		margin-left: 6rpx;
	}
	.textType{
		max-width: 400rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 3rpx 3rpx 3rpx 3rpx #E3E3E3;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10rpx;
	}
	.textType>text{
		font-size: 28rpx;
		color: #666;
	}
	.head{
		width: 100%;
		height: 120rpx;
		background: #6876FF;
		position: fixed;
		top: var(--status-bar-height);
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			width: 50rpx;
			height: 50rpx;
			margin-left: 40rpx;
		}
		text{
			flex-grow: 1;
			color: white;
			font-size: 36rpx;
			text-align: center;
			margin-left: -100rpx;
		}
	}
	.hello{
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		background: #EEEFF2;
	}
	.message{
		width: 100%;
		max-height: 1260rpx;
		overflow-y: scroll;
		margin-top: 180rpx;
	}
	.send{
		width: 100%;
		height: 120rpx;
		background: #F2F2F2;
		position: fixed;
		bottom: 0;
		left: 0;
		box-shadow: #E2E3E6 4rpx 4rpx 20rpx 4rpx;
		display: flex;
		align-items: center;
		.input{
			width: 560rpx;
			height: 64rpx;
			background: white;
			border-radius: 10rpx;
			margin-left: 50rpx;
			margin-right: 40rpx;
			text-indent: 10rpx;
		}
		.file{
			width: 52rpx;
			height: 52rpx;
			text-align: center;
			line-height: 46rpx;
			background: #6876FF;
			color: white;
			font-size: 50rpx;
			border-radius: 50%;
		}
		.text{
			padding: 10rpx 16rpx 10rpx 16rpx;
			background: #6876FF;
			color: white;
			font-size: 28rpx;
			border-radius: 8rpx;
			margin-left: -14rpx;
		}
	}
</style>