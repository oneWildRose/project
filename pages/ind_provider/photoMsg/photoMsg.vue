<template>  <!-- 照片 -->
	<view class="hello">
		<div class="status"></div>
		<div class="head">
			<image :src="require('../../../static/fanhui(1).png')" mode="" @click="goBack"></image>
			<text>照片</text>
		</div>
		<div class="list">
			<ul>
				<li>
					<image :src="require('../../../static/dianwei(2).svg')" mode=""></image>
					<text>点位：{{ msg.name }}</text>
				</li>
				<li>
					<image :src="require('../../../static/miaoshu.svg')" mode="" style='width:30rpx;height:30rpx;margin-left:5rpx;margin-right:16rpx'></image>
					<text>编号：{{ msg.dnumber }}</text>
				</li>
				<li>
					<image :src="require('../../../static/riqi.svg')" mode="" style='width:30rpx;height:30rpx;margin-left:5rpx;margin-right:14rpx'></image>
					<text>上传日期：{{ msg.scdate }}</text>
				</li>
				<li>
					<image :src="require('../../../static/xingming.png')" mode=""></image>
					<text>负责人：{{ msg.username }}</text>
				</li>
				<div v-if='bol'>
					<li>
						<image :src="msg.plan_url" mode="" @click="preview(msg.plan_url)"></image>
						<p>标准照片</p>
					</li>
					<li>
						<image :src="msg.imgurl == ''? zanwu : msg.imgurl " mode="" @click="preview(msg.imgurl)"></image>
						<p>上传照片</p>
					</li>
				</div>
				<li v-if='!bol' class='last'>
					<image :src="msg.imgurl == ''? zanwu : msg.imgurl " mode="" @click="preview(msg.imgurl)"></image>
				</li>
				<li v-if='msg.state == 0' class='state'> <!-- state 0未审批，1合格，2不合格 -->
					<div class='wei'></div>
					<text>待审批</text>
				</li>
				<li v-if='msg.state != 0' class='record'>
					<div>
						<image :src="require('../../../static/record.svg')" mode=""></image>
						<text>审批记录:</text>
					</div>
					<u-collapse class='collapse' :accordion="false">
						<u-collapse-item class='item' :title="item.username + '\xa0\xa0\xa0' + item.update_time" v-for="(item, index) in msg.check" :key="index" :open="true">
							<p>
								<text :class="item.state == '合格'? 'green':'red' ">{{ item.state }}</text>
								{{ item.content == ''? '，无备注' : '，' + item.content }}
							</p>
						</u-collapse-item>
					</u-collapse>
				</li>
			</ul>
		</div>
		<div class="isagree" v-if='ysp != 1 && isshenfen != 4'>
			<div class="option">
				<p>审批意见</p>
				<radio-group @change="radioChange" class="radio">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current"/>
						</view>
						<text>{{item.name}}</text>
					</label>
				</radio-group>
			</div>
			<div class='text'>
				<textarea
					@input="text" 
					placeholder="请输入审批合格/不合格的理由(可不填)" 
					maxlength="200"/>
				<text>200字以内</text>
			</div>
			<button type="default" @click="subFeedBack">提交反馈</button>
			<div style='height: 10rpx;'></div>
		</div>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: this.$store.state.uid,//用户id
				file_id: '',
				lnspection_id: '',
				project_id: '',
				time: '',
				id: '',//照片id
				zhuid: '',
				msg: '',
				zanwu: '../../../static/zanwu.jpg',
				bol: true,
				
				items: [{value: '0',name: '合格',checked: 'true'},{value: '1',name: '不合格',}],
				current: 0 ,// 0默认合格
				explain: '' ,// 备注内容
				isshenfen: '',
				ysp: 0
			}
		},
		onLoad(option) {
			this.project_id = option.project_id
			this.time = option.time
			if(option.direction == 'pz') { // 从品质监控页过来的
				this.bol = true
			} else if(option.direction == 'all') { // 从全部照片页过来的
				this.bol = false
			}
			if(option.file_id && option.zhuid && option.type) {
				this.file_id = option.file_id
				this.zhuid = option.zhuid
				this.$request('/api/lnspection/qualitydetail', { // 品质监控详情
					workorder_id: this.zhuid,
					file_id: this.file_id,
					uid: this.uid,
					type: option.type
					// date: this.time // 日期
				}).then(res => {
					res.data.data.plan_url += this.$store.state.imgFix // 标准图片缩略图
					res.data.data.imgurl += this.$store.state.imgFix // 主管上传的照片缩略图
					this.ysp = res.data.data.ysp
					this.msg = res.data.data
					// console.log(this.msg)
				})
			}
			if(option.id) {
				this.id = option.id// 照片id
				this.$request('/api/lnspection/getPictureInfo', { // 点位照片详情
					id: this.id 
				}).then(res => {
					// console.log(res)
					this.msg = res.data.data
				})
			}
			
			this.$request('/api/index/infoIndex', {
				uid: this.uid
			}).then(res => {
				if(res.data.data.isshenfen) {
					this.isshenfen = res.data.data.isshenfen
				}
			})
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			preview(src) {
				if(src != '') {
					uni.previewImage({
						urls: [ src.split('?')[0] ]
					})
				} else {return}
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i; // 0代表合格，1代表不合格
						break;
					}
				}
			},
			text(e) { // 备注说明
				// console.log(e)
				this.explain = e.target.value // 文本域中的内容
			},
			subFeedBack() { // 提交反馈按钮
				this.$request('/api/lnspection/setImageCheck', {
					image_id: this.msg.image_id, // 图片id
					workorder_id: this.zhuid,
					content: this.explain, // 备注
					state: this.current + 1, // 1合格 2不合格
					uid: this.uid
				}).then(res => {
					// console.log(res)
					if(res.data.code == 1) {
						this.$refs.uToast.show({
							title: '提交成功',
							type: 'success',
							duration: 1000,
							position: 'bottom',
							back: true
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.hello{
		width: 100%;
		height: auto;
		background: #F5F6F9;
	}
	.head{
		width: 100%;
		height: 94rpx;
		background-color: #5E79F2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		image{
			width: 45rpx;
			height: 45rpx;
			margin-left: 40rpx;
		}
		text{
			flex-grow: 1;
			text-align: center;
			font-size: 36rpx;
			font-weight: bold;
			margin-left: -100rpx;
			color: white;
		}
	}
	.list{
		width: 100%;
		height: auto;
		background-color: white;
		padding-top: 30rpx;
		padding-bottom: 20rpx;
		ul{
			width: 90%;
			height: auto;
			margin: 0rpx auto;
			li{
				width: 100%;
				height: auto;
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				image{
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
				}
				&.last{
					image{
						width: 100%;
						height: 404rpx;
						margin: 0 auto;
					}
				}
				&.state{
					div{
						width: 20rpx;
						height: 20rpx;
						transform: rotate(45deg);
						margin-right: 10rpx;
					}
					.yi{
						background-color: #46d367;
					}
					.wei{
						background-color: #FFA41D;
					}
				}
				&.record{
					display: block;
					&>div{
						display: flex;
						align-items: center;
					}
					.collapse{
						.green{
							color: green;
						}
						.red{
							color: red;
						}
					}
				}
			}
			&>div{
				width: 100%;
				height: 260rpx;
				display: flex;
				margin-top: 40rpx;
				align-items: center;
				justify-content: space-between;
				li{
					width: 324rpx;
					height: 100%;
					display: block;
					text-align: center;
					image{
						width: 100%;
						height: 200rpx;
					}
					&>p{
						font-size: 28rpx;
					}
				}
			}
		}
	}
	.isagree{
		width: 100%;
		height: auto;
		background: white;
		margin-top: 20rpx;
		padding-bottom: 30rpx;
		.option{
			width: 90%;
			margin: 0 auto;
			height: auto;
			p{
				height: 60rpx;
				font-size: 30rpx;
				display: flex;
				align-items: flex-end;
			}
			radio-group{
				display: flex;
				margin-top: -4rpx;
				font-size: 30rpx;
				label{
					height: 100rpx;
					line-height: 100rpx;
					display: flex;
					align-items: center;
					margin-right: 40rpx;
					text{
						display: block;
						font-size: 30rpx;
						margin-top: 6rpx;
					}
				}
			}
		}
		.text{
			width: 90%;
			height: 200rpx;
			margin: 0 auto;
			position: relative;
			textarea{
				width: 95%;
				height: 100%;
				padding: 16rpx;
				border: 1px solid #DDDDDD;
				background: white;
			}
			text{
				color: #A4A4A4;
				font-size: 28rpx;
				position: absolute;
				bottom: -16rpx;
				right: 16rpx;
			}
		}
		button{
			width: 90%;
			height: 80rpx;
			border-radius: 8rpx;
			text-align: center;
			line-height: 80rpx;
			color: white;
			background: #5D6CFF;
			margin-top: 60rpx;
		}
	}
</style>
