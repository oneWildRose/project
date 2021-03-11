<template> 		<!-- 登录、注册、选择角色、修改密码 -->
  <div class="hello">
    <div class="status" style='background-color: transparent;'></div>
	<div class="logo_img">
		<image :src="require('../../static/sign_brg.jpg')" mode=""></image>
	</div>
    <!-- 主体部分 -->
    <div class="main">
        <div class="top">
            <div v-show='num != 2&&num != 3' v-for="(item, index) in tabs" :key="index" :class="{active:num == index}" @click="table(index)">
				<text>{{ item }}</text>
				<div :class="{ block:num == index }"></div>
			</div>
			<div class='modification active' v-show='num == 2' >
				<image :src="require('../../static/fanhui.svg')" mode="" @click="backLogin"></image>
				<text>修改密码</text>
				<div :class="{ block:num == 2 }"></div>
			</div>
        </div>
        <ul class="content">
            <li class="sign_in" v-show="num == 0">  <!-- 登录 -->
                <p>输入手机号码</p>
                <input type="number" placeholder="输入手机号码" id="accounts" v-model='mobile' adjust-position='false'>
                <p>输入密码</p>
                <input type="password" placeholder="输入6-16位密码" id="password" v-model='password'>
                <p type="default" class="forget">
					<text @click='forget'>忘记密码？</text>
				</p>
				<button class="sign_btn" @click="login">登录</button>
				<!-- <div class="other" v-if='isFocus'>
					<div class='tit'>
						<div></div>
						<text>第三方登录</text>
						<div></div>
					</div>
					<div class='way'>
						<a href="javascript:;">
							<image :src="require('../../static/weixin.png')" mode=""></image>
							<text>微信</text>
						</a>
						<a href="javascript:;">
							<image :src="require('../../static/weibo.png')" mode=""></image>
							<text>微博</text>
						</a>
						<a href="javascript:;">
							<image :src="require('../../static/dingding.png')" mode=""></image>
							<text>钉钉</text>
						</a>
					</div>
				</div> -->
            </li>
            <li class="register" v-show="num == 1">  	<!-- 注册 -->
                <p>输入手机号码</p>
                <input type="number" placeholder="输入手机号码" v-model="mobile">
				<p>输入验证码</p>
				<div class='get'>
					<input type="number" placeholder="输入6位短信验证码" id="password" v-model="code_">
					<div class="re_code" @click="getCode(this)" v-if='isCode'>获取验证码</div>
					<div v-if='!isCode' class='time'>{{ second }}</div>
				</div>
				<p>输入密码</p>
				<input type="password" placeholder="输入6-16位密码" v-model="password"/>
				<p>再次输入密码</p>
				<input type="password" placeholder="输入6-16位密码" v-model="password2"/>
                <button class="register_btn" @click="register_success">注册</button>
            </li>
			<li class='register' v-show='num == 2'>   <!-- 修改密码 -->
			  <p>输入手机号码</p>
			  <input type="number" placeholder="输入手机号码" v-model="mobile">
				<p>输入验证码</p>
				<div class='get'>
					<input type="number" placeholder="输入6位短信验证码" id="password" v-model="code_">
					<div class="re_code" @click="getCode(this)" v-if='isCode'>获取验证码</div>
					<div v-if='!isCode' class='time'>{{ second }}</div>
				</div>
				<p>输入新密码</p>
				<input type="password" placeholder="输入6-16位密码" v-model="password"/>
				<p>再次输入密码</p>
				<input type="password" placeholder="输入6-16位密码" v-model="password2"/>
			  <button @click="goSign" class="register_btn">确认修改</button>
			</li>
		</ul>
    </div>
	
	<div class='choose'  v-show='num == 3'>		<!-- 选择角色 -->
		<div class='role' v-if='num_pro == 0'>
			<div :class='role_num == 0? "project" : "" ' @click='tabrole(0)'>
				<image :src="require('../../static/10-26/project.png')" mode=""></image>
				<text>我是项目方</text>
			</div>
			<div :class='role_num == 1? "specialist" : "" ' @click='tabrole(1)'>
				<image :src="require('../../static/10-26/specialist.png')" mode=""></image>
				<text>我是专家</text>
			</div>
		</div>
		<div class='role' v-if='num_pro == 1'>
			<div :class='jy_index == 0? "project" : "" ' @click='tabjy(0)'>
				<image :src="pic_jia" mode=""></image>
				<text>我是甲方</text>
			</div>
			<div :class='jy_index == 1? "project" : "" ' @click='tabjy(1)'>
				<image :src="pic_yi" mode=""></image>
				<text>我是乙方</text>
			</div>
		</div>
		<button type="default" class="ture" @click="gonext(role_num)">下一步</button>
		<div class='prompt'>
			<div>
				<image :src="require('../../static/10-26/prompt.svg')" mode=""></image>
				<text>温馨提示</text>
			</div>
			<p>身份一旦绑定，手机端将不能修改，如需变动请登录后台进行修改</p>
		</div>
	</div>
	<u-toast ref="uToast" />
	<u-mask class='mask' :show="showMask" :zoom="true">
		<div class="signing">
			<u-loading mode="flower"></u-loading>
			<text>登陆中</text>
		</div>
	</u-mask>
  </div>
</template>

<script>
	export default {
	  name: 'HelloWorld',
	  data(){
		return {
			showMask: false,
			isFocus: true,
			tabs: ['登录', '注册'],
			role_pro: [{
				name: '甲方',
				pic: '../../static/10-26/jiafang.png', // 甲方未选中图
				pic_act: '../../static/10-26/jia_act.png' // 选中
			}, {
				name: '乙方',
				pic: '../../static/10-26/yifang.png', // 乙方未选中图
				pic_act: '../../static/10-26/yi_act.png' // 选中
			}],
			pic_jia: '../../static/10-26/jia_act.png', // 甲方图片默认选中
			pic_yi: '../../static/10-26/yifang.png', // 乙方图片默认未选中
			num: 0, // 控制  0'登录' 1'注册' 2'修改密码' 3'选择角色' 的显示隐藏
			num_pro: 0, // 控制  0'选择项目方或专家'   1'选择甲乙方'  的显示隐藏
			role_num: 0, // 角色索引，0代表项目方，1代表专家
			jy_index: 0, // 存储甲乙方索引
			ind: 0, // 最终要上传到服务器的角色标识，1甲方 2乙方 3专家
			username : '', // 用户名称（暂无用）
			mobile : '', // 手机号
			password : '', // 密码
			password2 : '', // 密码二次确认
			code_ : '', // input双向绑定的验证码，PS：成功发送验证码后返回的id会因为双向绑定自动出现在用户的输入框中
			code: this.code_, // 验证码本🐎， 注册、修改密码操作要传的参数
			code_id : '' ,// 成功发送验证码后的id
			user_id: '', // 用户成功注册后的id
			timer: null,
			second: 60,
			isCode: true,
		}
	},
	onLoad() {
		
	},
	mounted(){
		uni.onKeyboardHeightChange(res => {
			if(res.height > 0) {
				this.isFocus = false
			} else {
				this.isFocus = true
			}
		})
	},
	methods: {
		backLogin() { // 返回登录
			this.num = 0
		},
		table(index) {
			this.num = index;
		},
		table_(index) {
			this.ind = index;
		},
		tabrole(index) { // 切换项目方和专家
			this.role_num = index
		},
		tabjy(index) { // 切换甲乙方
			this.jy_index = index // 存储甲方或乙方索引
			if(index == 0) { // 根据索引判断图片的切换
				this.pic_jia = this.role_pro[0].pic_act
				this.pic_yi = this.role_pro[1].pic
			} else {
				this.pic_jia = this.role_pro[0].pic
				this.pic_yi = this.role_pro[1].pic_act
			}
		},
		gonext(role_num) { 
			if(role_num == 0) {// 此时role_num为0(项目方)，角色暂定...
				if(this.num_pro == 0) {
					this.num_pro = 1 // 显示选择甲乙方按钮
				} else {
					this.ind = this.jy_index + 1 // 索引 +1 得出：1甲方 or 2乙方
					this.goInd()
				}
			} else if(role_num == 1) {// 此时role_num为1(专家)，角色已定! 
				this.ind = 3 // 3代表专家
				this.goInd()
			}
		},
		getCode(e) { // 获取验证码
			let that = this
			if(!(/^1[3456789]\d{9}$/.test(this.mobile))){ // 正则判断手机号是否正确
				uni.showModal({
					content: '请输入正确的手机号'
				})
			}else{
				// 倒计时
				this.isCode = false
				// 发送请求
				this.$request('/api/index/send_sms', {
					mobile: this.mobile
				}).then(res => {
					// console.log(res)
					if(res.data.code == 1) {
						that.code = res.data.data.code,
						that.code_id = res.data.data.code_id
						that.timers()
						this.$refs.uToast.show({
							title: '发送成功',
							type: 'success',
							position: 'bottom',
							duration: 1200
						})
					} else {
						this.$refs.uToast.show({
							title: '发送失败，请稍后再试',
							type: 'error',
							position: 'bottom',
							duration: 1000,
							callback: function() {
								that.isCode = true
							}
						})
					}
				})
			}
		},
		timers() { // 倒计时函数
			let that = this
			if (!that.timer) {
				that.timer = setInterval(() => {
					that.second--
					if (that.second == 0) {
						clearInterval(that.timer)
						that.timer = null
						that.isCode = true
						that.second = 60
					}
				}, 1000)
			}
		},
		register_success() { // 注册
			// 判断密码是否符合规范 6-16位 ^([0-9]|[a-zA-Z]){6,16}$
			if(!(/^([0-9]|[a-zA-Z]){6,16}$/.test(this.password))) {
				uni.showModal({
					content: '请输入6-16位密码'
				})
			} else {
				// console.log(this.code_id)
				this.$request('/api/index/register', {
					mobile: this.mobile,
					password: this.password,
					password2: this.password2,
					code: this.code,
					code_id: this.code_id
				}).then(res => {
					// console.log(res)
					if(res.data.code == 1) {
						this.user_id = res.data.id
						this.$store.commit('uidSave', this.user_id)
						uni.setStorage({
							key: 'userinfo',
							data: res.data
						})
						this.num = 3
					} else {
						uni.showModal({
							content: res.data.msg
						})
					}
				})
			}
		},
		login() { // 登录
			this.$request('/api/index/login', {
				mobile: this.mobile,
				password: this.password
			}).then(res => {
				// console.log(res)
				var that = this
				that.showMask = true
				setTimeout(function() {
					if(res.data.code == 1) { // 完事具备
						that.user_id = res.data.data.id // 用户id
						that.$store.commit('uidSave', that.user_id)
						// 将用户信息存入缓存
						uni.setStorage({
							key: 'userinfo',
							data: res.data,
							success: function () {
								//  判断帐号角色，修改TabBar并switchTab跳转
								if (res.data.data.isshenfen == 5) { // 5专家
									uni.setTabBarItem({
										index: 0,
										text: '方案',
										iconPath: '../../static/fangan.png',
										selectedIconPath: '../../static/fangan(2).png',
										pagePath: '/pages/ind_specialist/ind_specialist'
									})
									uni.switchTab({
										url: '../ind_specialist/ind_specialist'
									})
								} else if (res.data.data.isshenfen == 1 || res.data.data.isshenfen == 3) { // isshenfen  1甲方顶级负责人   3乙方顶级负责人
									uni.setTabBarItem({
										index: 0,
										text: '首页',
										iconPath: '../../static/shouye(2).png',
										selectedIconPath: '../../static/shouye.png',
										pagePath: '/pages/ind/ind'
									})
									uni.switchTab({
										url: '../ind/ind'
									})
								} else if(res.data.data.isshenfen == 2) { // isshenfen   2甲方项目主管
									uni.setTabBarItem({	// 目前也进入甲方顶级负责人的页面，暂不区分
										index: 0,
										text: '首页',
										iconPath: '../../static/shouye(2).png',
										selectedIconPath: '../../static/shouye.png',
										pagePath: '/pages/ind/ind'
									})
									uni.switchTab({
										url: '../ind/ind'
									})
								} else if(res.data.data.isshenfen == 4) { // isshenfen   4乙方项目主管
									uni.setTabBarItem({
										index: 0,
										text: '首页',
										iconPath: '../../static/shouye(2).png',
										selectedIconPath: '../../static/shouye.png',
										pagePath: '/pages/ind_provider/provider/provider'
									})
									uni.switchTab({
										url: '../ind_provider/provider/provider'
									})
								}
								that.showMask = false
							}
						})
					} else { // 出现错误
						that.user_id = res.data.uid // 用户id
						that.showMask = false
						uni.setStorage({
							key: 'userinfo',
							data: res.data,
							success() {
								that.$store.commit('uidSave', that.user_id)
							}
						})
						uni.showModal({
							content: res.data.msg,
							success: function (btn) { // btn.confirm 表示用户点击了确定按钮
								if(res.data.code == 2) { // 没有选择角色
									if (btn.confirm) {
										that.num = 3
									}
								} else if(res.data.code == 3) { // 没有完善个人信息
									if (btn.confirm) {
										uni.navigateTo({
											url: '../fillInformation/idCard/idCard' 
										})
									}
								} else if(res.data.code == 4) { // 没有完善企业信息
									if (btn.confirm) {
										uni.navigateTo({
											url: '../fillInformation/fillInformation'
										})
									}
								}
							}
						})
					}
				},1200)
			})
		},
		goInd() { // 选择角色，进入首页
			let that = this
			// console.log(this.ind) // 1代表甲方物业公司，2代表乙方供应商，3代表专家
			this.$request('/api/index/setIdentity', {
				uid: this.user_id,
				ztype: this.ind 
			}).then(res => {
				// console.log(res)
				if (res.data.code == 1) { 
					// 判断帐号角色，修改TabBar并switchTab跳转
					if (this.ind == 3) { // 3专家
						uni.reLaunch({ // 完善个人履历
							url: '../fillInformation/idCard/idCard'
						})
					} else if (this.ind == 2) { // 2乙方
						uni.reLaunch({
							url: '../fillInformation/fillInformation'
						})
					} else if(this.ind == 1) { // 1甲方
						uni.reLaunch({
							url: '../fillInformation/fillInformation'
						})
					}
				}
			})
		},
		forget() { // 忘记密码
			this.num = 2
		},
		goSign() { // 修改密码
			this.$request('/api/index/editPassword', {
				mobile: this.mobile,
				code: this.code,
				password: this.password,
				password2: this.password2,
				code_id: this.code_id
			}).then(res => {
				// console.log(res)
				if(res.data.code == 1) {
					this.$refs.uToast.show({
						title: res.data.msg,
						type: 'success',
						duration: 1200,
						position: 'bottom'
					})
					this.num = 0
				} else {
					uni.showModal({
						content: res.data.msg
					})
				}
			})
		},
	  }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	uni-toast .uni-toast .uni-toast__content {
		font-size: 15px !important;
	}
	.hello{
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		.logo_img{
			width: 100%;
			height: 312rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.signing{
		width: 90%;
		height: 90rpx;
		margin: 100rpx auto;
		border-radius: 4rpx;
		background-color: black;
		display: flex;
		align-items: center;
		justify-content: center;
		text{
			color: white;
			margin-left: 10rpx;
		}
	}
	.main{
		width: 86%;
		height: auto;
		margin: 0 auto;
	}
	.top{
		width: 100%;
		height: 112rpx;
		line-height: 112rpx;
		font-size: 36rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		&>div{
			width: 50%;
			text-align: center;
			border-bottom: 2px solid transparent;
		}
		.active{
			color: #5D6CFF;
			border-bottom: 2px solid #5D6CFF;
		}
		.block{
			display: block;
		}
		.modification{
			width: 100%;
			text-align: left;
			image{
				width: 30rpx;
				height: 30rpx;
				vertical-align: middle;
				margin-top: -8rpx;
				margin-left: 12rpx;
				margin-right: 12rpx;
			}
		}
	}
	.content{
		// 登录
		.sign_in{
			margin-top: 40rpx;
			text-align: left;
			input{
				border-radius: 8rpx;
				font-size: 30rpx;
				text-indent: 20rpx;
				width: 100%;
				height: 88rpx;
				line-height: 88rpx;
				border: 1px solid #C3C3C3;
			}
			p{
				font-weight: bold;
				margin-top: 40rpx;
				margin-bottom: 8rpx;
				margin-left: 12rpx;
			}
			p:nth-of-type(1){
				margin-top: 0rpx;
			}
			#password{
				margin-right: 20rpx;
			}
			p.forget{
				font-size: 28rpx;
				text-align: right;
				color: #C3C3C3;
				margin-top: 20rpx;
				margin-right: 0px;
			}
			.choose{
				width: 90%;
				margin: 80rpx auto;
				height: auto;
				button {
					margin-top: 40rpx;
				}
			}
			.sign_btn{
				width: 100%;
				height: 108rpx;
				line-height: 108rpx;
				background: #5D6CFF;
				color: white;
				border-radius: 8rpx;
				border: none;
				text-align: center;
				margin-top: 40rpx;
				font-size: 38rpx;
			}
			.other{
				width: 90%;
				// border: 1px solid red;
				position: fixed;
				bottom: 100rpx;
				left: 5%;
				height: auto;
				text-align: center;
				.tit{
					width: 100%;
					height: 70rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #B7B4B3;
					div{
						width: 220rpx;
						height: 2rpx;
						background: #D3D3D3;
					}
				}
				.way{
					width: 100%;
					height: auto;
					margin-top: 20rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					a{
						display: inline-block;
						width: 70rpx;
						height: 70rpx;
						color: #B7B4B3;
						image{
						width: 100%;
						height: 100%;
						}
						text{
							font-size: 30rpx;
						}
					}
				}
			}
		}
		// 注册
		.register{
			margin-top: 40rpx;
			text-align: left;
			input{
				border-radius: 8rpx;
				font-size: 30rpx;
				text-indent: 20rpx;
				width: 100%;
				height: 88rpx;
				line-height: 88rpx;
				border: 1px solid #C3C3C3;
			}
			.get{
				display: flex;
				justify-content: space-between;
				align-items: center;
				#password{
					width: 61%;
					height: 88rpx;
					line-height: 88rpx;
					font-size: 30rpx;
					border: 1px solid #C3C3C3;
					border-radius: 8rpx;
				}
			}
			p{
				margin-top: 40rpx;
				margin-bottom: 8rpx;
				margin-left: 12rpx;
				font-weight: bold;
			}
			div image{
				width: 40rpx;
				height: 40rpx;
				position: absolute;
				left: 16rpx;
				top: 50%;
				margin-top: -20rpx;
			}
			.re_code{
				width: 36%;
				height: 88rpx;
				line-height: 88rpx;
				font-size: 30rpx;
				text-align: center;
				background: #5D6CFF;
				color: white;
				border-radius: 8rpx;
				border: 1px solid #5D6CFF;
				margin: 0;
			}
			.time{
				width: 36%;
				height: 88rpx;
				line-height: 88rpx;
				background: #c7c7c7;
				text-align: center;
				border-radius: 8rpx;
				border: 1px solid #c7c7c7;
				color: #6d6d6d;
			}
			.register_btn{
				width: 100%;
				height: 104rpx;
				line-height: 104rpx;
				font-size: 18px;
				background: #5D6CFF;
				color: white;
				border-radius: 8rpx;
				text-align: center;
				margin-top: 40rpx;
			}
		}
	}
	// 选择角色
	.choose{
		width: 90%;
		height: auto;
		margin: 40rpx auto;
		.role{
			width: 100%;
			height: 148rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			&>div{
				width: 324rpx;
				height: 100%;
				box-shadow: #EAEAEA 4px 4px 10px 0px;
				display: flex;
				border-radius: 8rpx;
				justify-content: space-around;
				align-items: center;
				color: black;
				background: white;
				image{
					width: 88rpx;
					height: 88rpx;
					border-radius: 50%;
					margin-left: 30rpx;
				}
				div{
					width: 88rpx;
					height: 88rpx;
					border-radius: 50%;
					margin-left: 30rpx;
				}
				text{
					display: inline-block;
					margin-right: 30rpx;
				}
			}
			.project{ // 选中项目方
				color: white;
				background: #5D6CFF;
			}
			.specialist{ // 选中专家
				color: white;
				background: #F9A400;
			}
		}
		.ture{
			width: 100%;
			height: 104rpx;
			line-height: 104rpx;
			text-align: center;
			font-size: 38rpx;
			background: #5D6CFF;
			color: white;
			border-radius: 8rpx;
			border: none;
			margin-top: 100rpx;
		}
		.prompt{
			width: 100%;
			height: 170rpx;
			background: #F8F8FF;
			display: flex;
			flex-direction: column;
			color: #7B7F83;
			font-size: 30rpx;
			margin-top: 50rpx;
			div{
				margin-left: 40rpx;
				margin-top: 20rpx;
				image{
					width: 40rpx;
					height: 40rpx;
					margin-right: 4rpx;
					vertical-align: text-bottom;
				}
			}
			p{
				width: 90%;
				margin: 0 auto;
			}
		}
	}
	.brg{
		background: #5D6CFF;
		color: white;
	}
</style>
