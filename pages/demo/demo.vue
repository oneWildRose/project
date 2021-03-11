<template>
	<view>
		<div class="status"></div>
		<div class="bgConston">
			<div class="userSession" :style="{height:sHeight+'px'}">
				<block v-for="(item, index) in userContextItem" :key='index'>
					<div class="userH" :class="{'userMe' : item.userId == ''}">
						<div class="userImg">
							<image :src="item.userImg" mode="scaleToFill"></image>
						</div>
						<div class="userType">
							<!-- 是否显示用户昵称 -->
							<template v-if="item.userId != ''">
								<div class="userN">
									<text>{{ item.userName }}</text>
									<text>{{ item.time }}</text>
								</div>
							</template>
							
							<!-- 文本格式 -->
							<template v-if="item.type == 'text'">
								<div class="textType">
									<text>{{ item.context }}</text>
								</div>
							</template>
							
						</div>
					</div>
				</block>
			</div>
		</div>
		<div class="userInput">
			<input type="text" value="" v-model="text" placeholder="文明发言" adjust-position="false"/>
			<div class="sumText" @tap='submit(text)'>发送</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sHeight: 500,
				text: '',
				userContextItem: [
					{
						userId: 1,
						meId: '',
						userName: '纵横天下',
						userImg: '../../static/01.jpg',
						type: 'text',
						context: '你好，请问有什么可以帮助你的吗',
						time: (new Date().getTime())
					},
					{
						userId: "",
						meId: 1,
						userName: '白百合',
						userImg: '../../static/01.jpg',
						type: 'text',
						context: '我能问一下你们店里还有其他的款式吗?',
						time: (new Date().getTime())
					}
				]
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success(res) {
					let height = res.windowHeight - uni.upx2px(100)
					this.sHeight = height
				}
			})
		},
		methods: {
			submit(text){
				let obj = {
					userId: '',
					meId: 2,
					userName: '白百合',
					userImg: '../../static/01.jpg',
					type: 'text',
					context: text,
					time: (new Date().getTime())
				}
				this.userContextItem.push(obj)
			}
		}
	}
</script>

<style>
	.bgConston{
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
		margin: 0;
		padding: 0;
	}
	.userSession{
		width: 100%;
		height: auto;
		border-top: 1px solid #EDEDED;
		overflow: auto;
	}
	.userH{
		width: 80%;
		height: auto;
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		padding: 20rpx;
	}
	.userMe{
		width: 95%;
		height: auto;
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		padding: 20rpx;
		justify-content: flex-start;
		flex-direction: row-reverse;
		/* text-align: center; */
	}
	.userImg{
		width: 70rpx;
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 15rpx;
		margin-left: 15rpx;
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
	}
	.userN{
		height: 50rpx;
		display: flex;
		justify-content: space-around;
	}
	.userN>text{
		height: 50rpx;
		min-height: 100rpx;
		color:#666;
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
	.userInput{
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0 10rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-shadow: 0 0 5rpx 0 #e3e3e3;
	}
	.userInput>input{
		height: 50rpx;
		background-color: #F4F5F6;
		border-radius: 15rpx;
		padding: 10rpx;
		flex: 1;
		margin-right: 20rpx;
		font-size: 28rpx;
	}
	.userInput>div{
		width: 120rpx;
		font-size: 24rpx;
		color: #FFFFFF;
		height: 60rpx;
		background: #E80080;
		border-radius: 20rpx;
		text-align: center;
		line-height: 60rpx;
	}
</style>
