<template>
	<view>
		<div class="status" style='background: #6876FF;z-index: 9999;'></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>{{ jname }}</text>
		</div>
		<scroll-view id='scrollview' class="msg-list"
			refresher-background="#e5e5e5" 
			:refresher-enabled='scroll_refresher_enabled' 
			@refresherpulling='refresherpulling'
			@refresherrefresh='refresherrefresh'
			@refresherrestore='refresherrestore'
			@refresherabort='refresherabort'
			@touchstart="hideDrawer" 
			:refresher-triggered='ischufa'
			:refresher-threshold='60'
			scroll-y="true" 
			:scroll-with-animation="scrollAnimation" 
			:scroll-top="scrollTop" 
			@scroll="scroll"
			:scroll-into-view="scrollToView"
			:style="{height: style.contentViewHeight - 21 + 'px'}"
			 ><!-- :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50" -->
			<!-- 加载历史数据waitingUI -->
			<!-- <view class="loading" v-if='isHistoryLoading'>
				<view class="spinner">
					<view class="rect1"></view>
					<view class="rect2"></view>
					<view class="rect3"></view>
					<view class="rect4"></view>
					<view class="rect5"></view>
				</view>
			</view> -->
			<view class="row" v-for="(item, index) in msgList" :key="index" :id="'msg' + item.id">
				<!-- 系统消息 -->
				<!-- <block v-if="item.type=='system'" > -->
					<!-- <view class="system"> -->
						<!-- 文字消息 -->
						<!-- <view v-if="row.msg.type=='text'" class="text"> -->
							<!-- {{row.msg.content.text}} -->
						<!-- </view> -->
					<!-- </view> -->
				<!-- </block> -->
				<!-- 用户消息 -->
				<block> <!--  v-if="item.type == 'user'" -->
					<!-- 自己发出的消息 -->
					<view class="my" v-if="item.uid == id">
						<!-- 左-消息 -->
						<view class="left">
							<view class="username">
								<view class="time">{{item.time}}</view><view class="name">{{item.userinfo.name}}</view> 
							</view>
							<!-- 文字消息 -->
							<view v-if="item.type == 2" class="bubble">
								<rich-text :nodes="item.content"></rich-text>
							</view>
							<!-- 图片消息 -->
							<view v-if="item.type == 3" class="bubble img" @tap="showPic(item.content)">
								<image :src="item.content"></image>
							</view>
							
						</view>
						<!-- 右-头像 -->
						<view class="right">
							<image :src="item.userinfo.file == null? src : item.userinfo.file"></image>
						</view>
					</view>
					<!-- 别人发出的消息 -->
					<view class="other" v-if="item.uid != id">
						<!-- 左-头像 -->
						<view class="left">
							<image :src="item.userinfo.file == null? src:item.userinfo.file"></image>
						</view>
						<!-- 右-用户名称-时间-消息 -->
						<view class="right">
							<view class="username">
								<view class="name">{{item.userinfo.name}}</view> <view class="time">{{item.time}}</view>
							</view>
							<!-- 文字消息 -->
							<view v-if="item.type == 2" class="bubble">
								<!-- <rich-text :nodes="item.content"></rich-text> -->
								<text>{{ item.content }}</text>
							</view>
							<!-- 图片消息 -->
							<view v-if="item.type == 3" class="bubble img" @tap="showPic(item.content)">
								<image :src="item.content"></image>
							</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
		
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 --> 
			<!-- <swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'/static/img/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper> -->
			<!-- 更多功能 相册-拍照 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="getImage"><view class="icon tupian2"></view></view>
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<view class="textbox">
				<view class="text-mode" >
					<view class="box">
						<textarea auto-height maxlength='-1' v-model="textMsg" @focus='focus'/>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="send" @touchend.prevent="sendText">
				<view class="btn">发送</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				src: '../../../static/touxiang.svg',// 默认头像
				id: this.$store.state.uid, // 用户id
				clientid: this.$store.state.clientid, // 设备唯一标识
				jid: 4, // 聊天对象的id
				jname: '',
				jface: '',
				zid: '', // 这则聊天记录的主键id
				textMsg:'', //文字消息
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				scrollAnimation: false,
				scrollBottom: '',
				scrollToView:'',
				msgList:[],//消息列表
				msgImgList:[],
				
				// 抽屉参数
				popupLayerClass:'',
				// more参数
				hideMore: true,
				socketOpen: false,
				pingpangTimes: '',
				isHistoryLoading: false,
				
				showLoading: false,
				page: 0,
				selfinfo: [],
				indexNumber: 0,
				ischufa: false,
				ishave: true,
				scroll_refresher_enabled: false,
				// 聊天页面时时滚动样式
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				height: ''
			};
		},
		onLoad(option) {
			if(option.zid) { this.zid = option.zid }
			if(option.id) {
				this.jid = option.id
				this.$request('/api/index/infoIndex', {
					uid: this.jid
				}).then(res => {
					// console.log(res)
					this.jname = res.data.data.name
					this.jface = res.data.data.file
				})
			}
			this.getMsgList(0) // 加载初始页面消息
			this.$request('/api/index/infoIndex', {
				uid: this.id
			}).then(res => {
				this.selfinfo = res.data.data
			})
		},
		created() {
			let that = this
			uni.connectSocket({ // 创建WebSocket连接
			    url: 'ws://139.9.132.34:9504?uid=' + that.id + '&clientid=' + that.clientid + '&jid=' + that.jid
			});
			uni.onSocketOpen(function (res) {
				console.log('WebSocket连接已打开！');
				that.socketOpen = true;
			});
			uni.onSocketMessage(function (res) { // 监听WebSocket接受到服务器的消息
				// console.log(res)
				if(res.data == "heartBeat") {return}
				let info = JSON.parse(JSON.parse(res.data).tt)
				// console.log(info)
				let msg = {
					id: that.indexNumber,
					uid: 0,
					content: info.content,
					type: info.type,
					time:new Date().Format("yyyy-MM-dd HH:mm:ss"),
					userinfo:{
						name: that.jname,
						file: that.jface,
					}
				}
				if(info.type == 3) {
					that.msgImgList.push(info.content)
				}
				that.msgList.push(msg);
				that.scrollBottom()
				// that.$nextTick(()=> { // 当有新消息时，滚动到最新的一条消息
				// 	let num = that.msgList.length - 1
				// 	that.scrollBottom = "btm" + num
				// });
			});
			
			uni.onSocketClose(()=>{
				that.isSocketOpen = false
				console.log('WebSocket连接已关闭！');
			})
			uni.onSocketError(function (res) {
				that.isSocketOpen = false
				console.log('WebSocket连接打开失败，请检查！');
			});

			//先确保清除了之前的心跳定时器
			clearInterval(that.pingpangTimes)
			//每过一段时间发送一次心跳，这样操作以保持socket一直是连接状态，防止断开连接，心跳停止
			that.pingpangTimes = setInterval(()=>{
				uni.sendSocketMessage({
					data: "heartBeat",
					success:()=>{},
					fail:()=>{
						that.isSocketOpen = false
					}
				});
			},10000)
		},
		mounted(){
			var that = this
			this.$nextTick(function(){
				const res = uni.getSystemInfoSync();   //获取手机可使用窗口高度     api为获取系统信息同步接口
		　　　	that.style.pageHeight = res.windowHeight;
		　　　	that.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100) - 70; //像素   因为给出的是像素高度 然后我们用的是upx  所以换算一下 
		　　	setTimeout(() => {
					that.scrollToBottom();
				},100)
			})
			uni.onKeyboardHeightChange(res => {
				if(res.height > 0) {
					that.height = res.height // 存储键盘高度
					that.style.contentViewHeight -= res.height
					that.scrollToBottom();
				} else {// 键盘收起时再加回去
					that.style.contentViewHeight += that.height
				}
			})
			// this.scrollTop = this.old.scrollTop
			// this.$nextTick(function() {
			// 	this.scrollTop = 9999
			// });
			setInterval(function() {
				
			},100)
			
		},
		onBackPress() { // 监听页面返回
			uni.closeSocket() // 关闭WebSocket连接
		},
		onUnload() { // 监听页面卸载
			uni.closeSocket() 
		},
		methods:{
			goBack() {uni.navigateBack()},
			scrollToBottom: function () {
				let that = this;
				let query = uni.createSelectorQuery().in(this);
				query.selectAll('.row').boundingClientRect();
				query.select('#scrollview').boundingClientRect();
				query.exec((res) => {
					that.style.mitemHeight = 0;
					// console.log(res)
					res[0].forEach((rect) => that.style.mitemHeight = that.style.mitemHeight + rect.height + 40 )   //获取所有内部子元素的高度
	　　　　　　　　 // 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout    主要就是添加了这定时器
	// 　　　　　　　　	setTimeout(() => {
					　　if (that.style.mitemHeight > (that.style.contentViewHeight - 100)) {   //判断子元素高度是否大于显示高度
						　　that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight    //用子元素的高度减去显示的高度就获益获得序言滚动的高度
						}
	// 　　　　　　　　	}, 100)
	　　　　　　	})
			},
			scroll(e) {
				// this.old.scrollTop = e.detail.scrollTop
				var that = this
				setTimeout(function() {
					console.log(Math.floor(e.detail.scrollTop), that.ishave)
					if (Math.floor(e.detail.scrollTop) >= 10 && that.ishave) {
						that.scroll_refresher_enabled = true
					} else {
						that.scroll_refresher_enabled = false
					}
				},500)
			},
			refresherpulling() {
				// console.log('下拉控件被下拉')
			},
			refresherrefresh() {
				// console.log('下拉刷新被触发', this.scroll_refresher_enabled)
				if(this.scroll_refresher_enabled) {
					this.ischufa = true
					this.loadHistory()
				}
			},
			refresherrestore() {
				// console.log('下拉刷新被复位')
			},
			refresherabort() {
				// console.log('下拉刷新被中止')
			},
			sendSocketMessage(msg) {
				// console.log(msg)
				let data = {
					msg: msg.content,
					type: msg.type,
					uid: this.id,
					clientid: this.clientid,
					jid: this.jid
				}
				if (this.socketOpen) {
					uni.sendSocketMessage({
						data: JSON.stringify(data)
					});
				} else {
					this.msgList.push(data.msg);
				}
			},
			// 接受消息(筛选处理)
			screenMsg(msg){
				if(msg){
					switch (msg.type){
						case 2:
							this.addTextMsg(msg);
							break;
						case 3:
							this.addImgMsg(msg);
							break;
					}
					this.sendSocketMessage(msg)
				}
				this.$nextTick(function() {
					// 滚动到底
					this.scrollToView = 'msg' + msg.id
				});
			},
			copy(content) { // 文本消息复制粘贴
				uni.setClipboardData({
				    data: content
				});
			},
			
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(){
				if(this.isHistoryLoading){
					return ;
				}
				this.isHistoryLoading = true;//参数作为进入请求标识，防止重复请求
				this.scrollAnimation = false;//关闭滑动动画
				let Viewid = this.msgList[0].id;//记住第一个信息ID
				this.getMsgList(this.page)
				this.ischufa = false
				//这段代码很重要，不然每次加载历史数据都会跳到顶部
				this.$nextTick(function() {
					this.scrollToView = 'msg' + Viewid;//跳转上次的第一行信息位置
					this.$nextTick(function() {
						this.scrollAnimation = true;//恢复滚动动画
					});
				});
				this.isHistoryLoading = false;
			},
			// 加载页面消息
			getMsgList(page){
				page++
				this.$request('/api/fdchatcontent/content', {
					id: this.zid,
					uid: this.id,
					page: page,
					limit: 10
				}).then(res => {
					// console.log(res)
					if(res.data.code != 1 || res.data.data == "") { 
						this.ischufa = false
						return 
					}
					if(res.data.data.length < 10) { 
						this.ishave = false
						this.scroll_refresher_enabled = false
					}
					switch (page) {
						case 1:
							this.msgList = res.data.data
							for(let j = 0; j < res.data.data.length; j++) {
								if(res.data.data[j].type == 3) { this.msgImgList.push(res.data.data[j].content) }
							}
							break;
						default:
							res.data.data.reverse()
							for(let i = 0; i < res.data.data.length; i++) {
								this.msgList.unshift(res.data.data[i])
								if(res.data.data[i].type == 3) { this.msgImgList.unshift(res.data.data[i].content) }
							}
					}
					this.page = page
					this.isHistoryLoading = false
					// 滚动到底部
					// this.scrollTop = this.old.scrollTop
					// this.$nextTick(function() {
					// 	//进入页面滚动到底部
					// 	this.scrollTop = 9999;
					// 	this.$nextTick(function() {
					// 		this.scrollAnimation = true;
					// 	});
					// })
				})
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content){
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350);//350是定义消息图片最大宽度
				let maxH = uni.upx2px(350);//350是定义消息图片最大高度
				if(content.w>maxW||content.h>maxH){
					let scale = content.w/content.h;
					content.w = scale>1?maxW:maxH*scale;
					content.h = scale>1?maxW/scale:maxH;
				}
				return content;
			},
			
			
			// 打开抽屉
			openDrawer(){
				// console.log('打开抽屉')
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer(){
				// console.log('隐藏抽屉')
				this.popupLayerClass = '';
				setTimeout(function() {
					this.hideMore = true;
					this.hideEmoji = true;
				},150)
			},
			//更多功能(点击+弹出)
			showMore(){
				// console.log(this.hideMore) // true说明更多界面没有显示，false说明更多界面显示了
				if(this.hideMore){ // 如果现在更多界面是隐藏的
					this.hideMore = false; // 显示更多界面
					this.openDrawer(); // 打开抽屉
				}else{
					this.hideMore = true // 隐藏更多界面
					this.hideDrawer(); // 隐藏抽屉
				}
			},
			//选照片 or 拍照
			getImage(){
				this.hideDrawer();
				let that = this
				this.$upload('/api/index/upload').then(res => {
					uni.hideLoading()
					uni.getImageInfo({
						src: res,
						success: (image)=>{
							// console.log(image.width);
							// console.log(image.height);
							// let msg = {
							// 	url: res,
							// 	w: image.width,
							// 	h: image.height,
							// }
							that.sendMsg(res, 'img');
						}
					});
				})
			},
			
			// 发送文字消息
			sendText(){
				// this.hideDrawer();//隐藏抽屉
				if(!this.textMsg){
					return;
				}
				this.sendMsg(this.textMsg,'text');
				this.scrollTop += 100;
				this.textMsg = '';//清空输入框
			},
			focus() {
				this.hideDrawer();//隐藏抽屉
			},
			
			// 发送消息
			sendMsg(content,type){
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
				let msg = {
					id: this.indexNumber,
					uid: this.id,
					content: content,
					type:type == 'text'? 2 : 3,
					time:new Date().Format("yyyy-MM-dd HH:mm:ss"),
					userinfo:{
						name: this.selfinfo.name,
						file: this.selfinfo.file,
					}
				}
				this.indexNumber++
				// 发送消息
				this.screenMsg(msg);
			},
			
			// 添加文字消息到列表
			addTextMsg(msg){
				this.msgList.push(msg);
			},
			// 添加图片消息到列表
			addImgMsg(msg){
				// msg.content = this.setPicSize(msg.msg.content);
				this.msgImgList.push(msg.content);
				this.msgList.push(msg);
			},
			// 预览图片
			showPic(url){
				console.log(url, this.msgImgList)
				uni.previewImage({
					current: url,
					urls: this.msgImgList
				});
			},
			discard(){
				return;
			}
		}
	}
</script>
<style lang="scss">
	$height: calc(var(--status-bar-height) + 100rpx);
	.head{
		width: 100%;
		height: 100rpx;
		background: #6876FF;
		// position: fixed;
		// top: var(--status-bar-height);
		// left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 999;
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
	page{
		background-color: #e5e5e5;
	}
	@font-face {font-family:"HMfont-home";src:url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2');}
		.icon {
			font-family:"HMfont-home" !important;
			font-size:56upx;
			font-style:normal;
			color: #333;
			&.biaoqing:before {
			  content: "\e797";
			}
			&.jianpan:before {
			  content: "\e7b2";
			}
			&.yuyin:before {
			  content: "\e805";
			}
			&.tupian:before {
			  content: "\e639";
			}
			&.chehui:before {
			  content: "\e904";
			}
			&.luyin:before {
			  content: "\e905";
			}
			&.luyin2:before {
			  content: "\e677";
			}
			&.other-voice:before {
			  content: "\e667";
			}
			&.my-voice:before {
			  content: "\e906";
			}
			&.hongbao:before {
			  content: "\e626";
			}
			&.tupian2:before {
			  content: "\e674";
			}
			&.paizhao:before {
			  content: "\e63e";
			}
			&.add:before {
			  content: "\e655";
			}
			&.close:before {
			  content: "\e607";
			}
			&.to:before {
			  content: "\e675";
			}
		}
	.hidden{
		display: none !important;
	}
	.popup-layer{
		&.showLayer{
			transform: translate3d(0,-42vw,0);
		}
		transition: all .15s linear;
		width: 100%;
		height: 42vw;
		padding: 20upx 2%;
		background-color: #f3f3f3;
		border-top: solid 1upx #ddd;
		position: fixed;
		z-index: 20;
		top: 100%;
		.emoji-swiper{
			height: 40vw;
			swiper-item{
				display: flex;
				align-content: flex-start;
				flex-wrap: wrap;
				view{
					width: 12vw;
					height: 12vw;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 8.4vw;
						height: 8.4vw;
					}
				}
			}
		}
		.more-layer{
			width: 100%;
			height: 42vw;
			.list{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.box{
					width: 18vw;
					height: 18vw;
					border-radius: 20upx;
					background-color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 0 3vw 2vw 3vw;
					.icon{
						font-size: 70upx;
					}
				}
			}
		}
	}
	.input-box{
		width: 100%;
		min-height: 100upx;
		padding: 0 1%;
		padding-left: 20rpx;
		background-color: #f2f2f2;
		display: flex;
		position: fixed;
		z-index: 20;
		bottom:-2upx;
		&.showLayer{transform: translate3d(0,-42vw,0);}
		transition: all .15s linear;
		border-bottom: solid 1upx #ddd;
		.voice,.more{
			flex-shrink: 0;
			width: 90upx;
			height: 100upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		
		.send{
			//H5发送按钮左边距
			/* #ifdef H5 */
			margin-left: 20upx;
			/* #endif */
			flex-shrink: 0;
			width: 100upx;
			height: 100upx;
			display: flex;
			align-items: center;
			.btn{
				width: 90upx;
				height: 56upx;
				display: flex;
				justify-content: center;
				align-items: center;
				background:linear-gradient(to right,#f09b37,#eb632c);
				color: #fff;
				border-radius: 6upx;
				font-size: 24upx;
			}
		}
		.textbox{
			width: 100%;
			min-height: 70upx;
			margin-top: 15upx;
			.voice-mode{
				width: calc(100% - 2upx);
				height: 68upx;
				border-radius: 70upx;
				border:solid 1upx #cdcdcd;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28upx;
				background-color: #fff;
				color: #555;
				&.recording{
					background-color: #e5e5e5;
				}
			}
			.text-mode{
				width: 100%;
				min-height: 70upx;
				display: flex;
				background-color: #fff;
				border-radius: 40upx;
				.box{
					width: 100%;
					padding-left: 30upx;
					min-height: 70upx;
					display: flex;
					align-items: center;
					textarea{
						width: 100%;
					}
				}
				.em{
					flex-shrink: 0;
					width: 80upx;
					padding-left: 10upx;
					height: 70upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
	.record{
		width: 40vw;
		height: 40vw;
		position: fixed;
		top: 55%;
		left: 30%;
		background-color: rgba(0,0,0,.6);
		border-radius: 20upx;
		.ing{
			width: 100%;
			height: 30vw;
			display: flex;
			justify-content: center;
			align-items: center;
			// 模拟录音音效动画
			@keyframes volatility {
				0% {background-position: 0% 130%;}
				20% {background-position: 0% 150%;}
				30% {background-position: 0% 155%;}
				40% {background-position: 0% 150%;}
				50% {background-position: 0% 145%;}
				70% {background-position: 0% 150%;}
				80% {background-position: 0% 155%;}
				90% {background-position: 0% 140%;}
				100% {background-position: 0% 135%;}
			}
			.icon{
				background-image:linear-gradient(to bottom,#f09b37,#fff 50%); 
				background-size:100% 200%;
				animation: volatility 1.5s ease-in-out -1.5s infinite alternate;
				-webkit-background-clip:text; 
				-webkit-text-fill-color:transparent; 
				font-size: 150upx;
				color: #f09b37;
			}
		}
		.cancel{
			width: 100%;
			height: 30vw;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon{
				color: #fff;
				font-size: 150upx;
			}
		}
		.tis{
			width: 100%;
			height: 10vw;
			display: flex;
			justify-content: center;
			font-size: 28upx;
			color: #fff;
			&.change{
				color: #f09b37;
			}
		}
	}
	// .content{
		// width: 100%;
		.msg-list{
			width: 96%;
			// border: 1px solid red;
			// height: 93%;
			padding: 0 2%;
			// position: fixed;
			// top: $height;
			// bottom: 100rpx;
			.loading{
				//loading动画
				display: flex;
				justify-content: center;
				@keyframes stretchdelay {
					0%, 40%, 100% {
						transform: scaleY(0.6);
					}
					20% {
						transform: scaleY(1.0);
					}
				}
				.spinner {
					margin: 20upx 0;
					width: 60upx;
					height: 100upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					view {
						background-color: #f06c7a;
						height: 50upx;
						width: 6upx;
						border-radius: 6upx;
						animation: stretchdelay 1.2s infinite ease-in-out;
					}
					.rect2 {
					  animation-delay: -1.1s;
					}
					.rect3 {
					  animation-delay: -1.0s;
					}
					.rect4 {
					  animation-delay: -0.9s;
					}
					.rect5 {
					  animation-delay: -0.8s;
					}
				}
			}
			.row{
				.system{
					display: flex;
					justify-content: center;
					view{
						padding: 0 30upx;
						height: 50upx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: #c9c9c9;
						color: #fff;
						font-size: 24upx;
						border-radius: 40upx;
					}
					.red-envelope{
						image{
							margin-right: 5upx;
							width: 30upx;
							height: 30upx;
						}
					}
				}
				&:first-child{
					margin-top: 20upx;
				}
				padding: 20upx 0;
				.my .left,.other .right{
					width: 100%;
					display: flex;
					.bubble{
						max-width: 70%;
						min-height: 50upx;
						border-radius: 10upx;
						padding: 15upx 20upx;
						display: flex;
						align-items: center;
						font-size: 32upx;
						word-break: break-word;
						&.img{
							background-color: transparent;
							padding:0;
							overflow: hidden;
							image{
								max-width: 350upx;
								max-height: 350upx;
							}
						}
						&.red-envelope{
							background-color: transparent;
							padding:0;
							overflow: hidden;
							position: relative;
							justify-content: center;
							align-items: flex-start;
							image{
								width: 250upx;
								height: 313upx;
							}
							.tis{
								position: absolute;
								top: 6%;
								font-size: 26upx;
								color: #9c1712;
							}
							.blessing{
								position: absolute;
								bottom: 14%;
								color: #e9b874;
								width: 80%;
								text-align: center;
								overflow: hidden;
								// 最多两行
								display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;
							}
						}
						&.voice{
							.icon{
								font-size: 40upx;
								display: flex;
								align-items: center;
							}
							.icon:after
							{
								content:" ";
								width: 53upx;
								height: 53upx;
								border-radius: 100%;
								position: absolute;
								box-sizing: border-box;
							}
							.length{
								font-size: 28upx;
							}
						}
					}
				}
				.my .right,.other .left{
					flex-shrink: 0;
					width: 80upx;
					height: 80upx;
					image{
						width: 80upx;
						height: 80upx;
						border-radius: 10upx;
					}
				}
				.my{
					width: 100%;
					display: flex;
					justify-content: flex-end;
					.left{
						min-height: 80upx;
						flex-wrap: wrap;
						justify-content: flex-end;
						.username{
							width: 100%;
							height: 45upx;
							font-size: 24upx;
							color: #999;
							display: flex;
							justify-content: flex-end;
							.name{
								margin-left: 50upx;
							}
						}
						.bubble{
							background-color: #f06c7a;
							color: #fff;
							&.voice{
								.icon{
									color: #fff;
								}
								.length{
									margin-right: 20upx;
								}
							}
							&.play{
								@keyframes my-play {
									0% {
										transform: translateX(80%);
									}
									100% {
										transform: translateX(0%);
									}
								}
								.icon:after
								{
									border-left: solid 10upx rgba(240,108,122,.5);
									animation: my-play 1s linear infinite;
								}
							}
						}
					}
					.right{
						margin-left: 15upx;
					}
				}
				.other{
					width: 100%;
					display: flex;
					.left{
						margin-right: 15upx;
					}
					.right{
						flex-wrap: wrap;
						.username{
							width: 100%;
							height: 45upx;
							font-size: 24upx;
							color: #999;
							display: flex;
							.name{
								margin-right: 50upx;
							}
						}
						.bubble{
							background-color: #fff;
							color: #333;
							&.voice{
								.icon{
									color: #333;
									
								}
								.length{
									margin-left: 20upx;
								}
							}
							&.play{
								@keyframes other-play {
									0% {
										transform: translateX(-80%);
									}
									100% {
										transform: translateX(0%);
									}
								}
								.icon:after
								{
									border-right: solid 10upx rgba(255,255,255,.8);
									
									animation: other-play 1s linear infinite;
								}
							}
						}
					}
				}
			}
		}
	// }
	.windows{
	
		.mask{
			position: fixed;
			top: 100%;
			width: 100%;
			height: 100%;
			// z-index: 1000;
			background-color: rgba(0,0,0,.6);
			opacity: 0;
			transition: opacity .2s ease-out;
		}
		.layer{
			position: fixed;
			width: 80%;
			height: 70%;
			left: 10%;
			// z-index: 1001;
			border-radius: 20upx;
			overflow: hidden;
			top:100%;
			transform: scale3d(.5,.5,1);
			transition: all .2s ease-out;
		}
		&.show{
			display: block;
			.mask{
				top: 0;
				opacity: 1;
			}
			.layer{
				transform: translate3d(0,-85vh,0) scale3d(1,1,1);
			}
		}
		&.hide{
			display: block;
			.mask{
				top: 0;
				opacity: 0;
			}
			.layer{
				//transform: translate3d(0,-85vh,0) scale3d(.5,.5,1);
			}
		}
	}
	.open-redenvelope{
		width: 100%;
		height: 70vh;
		background-color: #cf3c35; 
		position: relative;
		.top{
			width: 100%;
			background-color: #fe5454;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			border-radius: 0 0 100% 100%;
			box-shadow: inset 0 -20upx 0 #9c1712;
			.close-btn{
				width: 100%;
				height: 80upx;
				display: flex;
				justify-content: flex-end;
				margin-bottom: 30upx;
				.icon{
					color: #9c1712;
					margin-top: 10upx;
					margin-right: 10upx;
				}
			}
			image{
				width: 130upx;
				height: 130upx;
				border: solid 12upx #cf3c35;
				border-radius: 100%;
				
				margin-bottom: -65upx;
			}
			margin-bottom: 65upx;
		}
		.from,.blessing,.money,.showDetails{
			width: 90%;
			padding: 5upx 5%;
			display: flex;
			justify-content: center;
			font-size: 32upx;
			color: #fff;
		}
		.money{
			font-size: 100upx;
			color: #f8d757;
			display: flex;
			padding-top: 20upx;
		}
		.showDetails{
			position: absolute;
			bottom: 20upx;
			align-items: center;
			font-size: 28upx;
			color: #f8d757;
			.icon{
				font-size: 26upx;
				color: #f8d757;
			}
		}
	}
</style>