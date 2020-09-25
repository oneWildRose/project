
<template> <!-- 个人信息 -->
	<view>
		<div class='kong'></div>
		<div class='title'>
			<image :src="require('../../static/fanhui(3).png')" @click="goBack"></image>
			<text>个人信息</text>
			<p>保存</p>
		</div>
		<div class='pic'>
			<image src="../../static/shu.png" mode=""></image>
			<p>修改头像</p>
		</div>
		<div class='msg'>
			<ul>
				<li @click="goModification">
					<p>昵称</p>
					<text>{{ msg_list.username }}</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li>
					<p>手机号</p>
					<text>{{ msg_list.mobile }}</text>
				</li>
				<li>
					<p>性别</p>
					<picker @change="sex" class='sex' :value="index" :range="list" :range-key="'label'">
						<label class='' v-if='bol'>男</label>
						<label class="" v-if="bol_">{{list[index].label}}</label>
					</picker>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li @click="showPop">
					<p>出生日期</p>
					
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li>
					<p>职业</p>
					<text>暂无</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li>
					<p>营业执照</p>
					<text>暂无</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
				<li>
					<p>企业代码</p>
					<text>暂无</text>
					<image :src="require('../../static/jinru.svg')"></image>
				</li>
			</ul>
			<min-popup heightSize="500" v-show='show' @close='close' class='date'>
			    <min-picker 
			    :endTime="endTime"
			    :startTime="startTimes"
			    @cancel="cancel"
			    @sure="sure"
			    >
			    </min-picker>
			</min-popup>
		</div>
	</view>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				msg_list: '',
				xb: '',
				index: 0,
				bol: true,
				bol_: false,
				list: [
				  {
				    label: '男',
				    value: '1'
				  },
				  {
				    label: '女',
				    value: '2'
				  }
				],
				startTimes: [1960,1,1],
				endTime: 2020,
				show: false
			}
		},
		onShow: function () {
			uni.getStorage({
				key: 'userinfo',
				success(res) {
					this.$request('/api/index/infoIndex', {
						uid: res.data.data.id
					}).then(res => {
						this.msg_list = msg.data.data
					})
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({})
			},
			goModification() {
				uni.navigateTo({
					url: '../modification/modification'
				})
			},
			sex(e) {
				this.index = e.target.value
				this.xb = this.list[this.index].label // 单位
				this.bol = false,
				this.bol_ = true
			},
			showPop() { // picker显示
				this.show = true
			},
			sure(e) { // 确认事件
				console.log(e)
			},
			close() { // 关闭picker
				this.show = false
			},
			cancel() { // 取消事件
				this.close()
			},
		}
	}
</script>

<style lang="less" scoped>
	.kong{
		width: 100%;
		height: 60rpx;
	}
	.title{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		image{
			width: 40rpx;
			height: 40rpx;
		}
		text{
			font-size: 36rpx;
			margin-left: 120rpx;
			margin-right: 100rpx;
		}
		p{
			color: #6B65EE;
			font-size: 34rpx;
			font-weight: 600;
		}
	}
	.pic{
		width: 100%;
		height: 280rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		image{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-top: 70rpx;
			margin-bottom: 20rpx;
		}
		p{
			font-size: 28rpx;
		}
	}
	.msg{
		width: 90%;
		margin: 20rpx auto;
		ul{
			width: 100%;
			li{
				width: 100%;
				border-bottom: 1px solid #ECECEC;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 26rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				p{
					flex-grow: 1;
				}
				image{
					width: 30rpx;
					height: 30rpx;
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
