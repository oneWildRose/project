<template>  <!-- 项目基本信息页 -->
	<view>
		<div class="status"></div>
		<div class="title">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>基本信息</text>
		</div>
		<div class="msg">
			<ul>
				<li>
					<image :src="require('../../../static/9-17icon/project.svg')"></image>
					<p>项目名称：{{ msg.pname }}</p>
				</li>
				<li>
					<image :src="require('../../../static/9-17icon/fuzeren.svg')"></image>
					<p>负责人：{{ msg.name == null? '暂无' : msg.name }}</p>
				</li>
				<li>
					<image :src="require('../../../static/dianhua.svg')"></image>
					<p>联系方式：{{ msg.mobile == null? '暂无' : msg.mobile }}</p>
				</li>
				<li class='overwid' :class="{ 'start' : overclass}">
					<image :src="require('../../../static/9-17icon/ress.svg')"></image>
					<p>项目地址：</p>
					<text>{{ str }}</text>
				</li>
				<li>
					<image :src="require('../../../static/9-17icon/mianji.svg')"></image>
					<p>项目管理面积：{{ msg.measure + msg.unit }}</p>
				</li>
				<li>
					<image :src="require('../../../static/9-17icon/intime.svg')"></image>
					<p>项目竣工时间：{{ msg.dtime }}</p>
				</li>
				<li>
					<image :src="require('../../../static/9-17icon/intime.svg')"></image>
					<p>项目交付时间：{{ msg.time }}</p>
				</li>
				<li>
					<p>项目平面图：</p>
					<image :src="msg.plan_url == null? src : msg.plan_url" mode="" @click="preview"></image>
				</li>
				<div class='change' @click='goChange' v-if='isshenfen == 1 || isshenfen == 3'> <!-- 只有甲乙最高管理账号才可以修改项目信息 -->
					<image :src="require('../../../static/xiugai.svg')" mode=""></image>
					<text>修改信息</text>
				</div>
			</ul>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				shenfen: '',
				isshenfen: '',
				num: 0,
				msg: '',
				acreage: '',
				src: '../../../static/zanwu.png',
				project_id: '',
				overclass: false,
				str: ''
			}
		},
		onLoad(option) {
			this.project_id = option.project_id
			this.id = option.id
		},
		onShow() {
			this.$request('/api/project/Project_info', { // 项目信息
				project_id: this.project_id
			}).then(res => {
				this.msg = res.data.data
				// console.log(this.msg)
				this.$request('/api/index/infoIndex', {
					uid: this.id
				}).then(res => {//根据甲乙方身份来判别对应的负责人
					this.isshenfen = res.data.data.isshenfen
					if(this.isshenfen == 1 || this.isshenfen == 2) {// 甲方
						this.shenfen = this.msg.jname
					} else if(this.isshenfen == 3 || this.isshenfen == 4){// 乙方
						this.shenfen = this.msg.yname
					}
				})
				this.str = this.msg.provinceNmae + this.msg.cityeNmae + this.msg.areaNmae + this.msg.address
				if(this.str.length <= 13) {
					this.overclass = false
				} else {
					this.overclass = true
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			goChange() {
				uni.navigateTo({
					url: '../../change/change?project_id=' + this.project_id + '&id=' + this.id
				})
			},
			preview() {
				uni.previewImage({
					urls: [ this.msg.plan_url ]
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.title{
		width: 100%;
		height: 96rpx;
		background: #5E79F2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		image{
			width: 50rpx;
			height: 50rpx;
			margin-left: 40rpx;
		}
		text{
			font-size: 36rpx;
			font-weight: bold;
			color: white;
			flex-grow: 1;
			text-align: center;
			margin-left: -80rpx;
		}
	}
	.msg{
		width: 100%;
		height: auto;
		ul{
			width: 90%;
			height: auto;
			margin: 40rpx auto;
			.start{
				align-items: flex-start;
				image{
					margin-top: 8rpx;
				}
			}
			.overwid{
				width: 100%;
				min-height: 86rpx;
				height: auto;
				text{
					width: 66%;
				}
			}
			li{
				width: 100%;
				height: 86rpx;
				display: flex;
				align-items: center;
				font-size: 34rpx;
				font-weight: 500;
				p{
					display: flex;
					justify-content: space-around;
				}
				image{
					width: 34rpx;
					height: 34rpx;
					vertical-align: middle;
					margin-right: 10rpx;
					margin-left: 10rpx;
				}
				&:nth-last-of-type(1){
					height: auto;
					display: block;
					text-indent: 16rpx;
					p{
						display: block;
					}
					image{
						width: 90%;
						height: 300rpx;
						margin: 20rpx auto;
						display: block;	
					}
				}
			}
			.change{
				width: 20%;
				height: 50rpx;
				position: fixed;
				bottom: 60rpx;
				left: 39%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 0rpx auto;
				image{
					width: 40rpx;
					height: 40rpx;
				}
				text{
					font-size: 26rpx;
					color: #3F5DE3;
					font-weight: 700;
				}
			}
		}
	}
</style>
