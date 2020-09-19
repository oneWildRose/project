<template> <!-- 创建项目（第一步） -->
	<view>
		<div class='goback' @click='goBack'>
			<image src="../../static/fanhui.png" mode=""></image>
		</div>
		<div class='text'>
			<p>创建项目</p>
			<text>填写项目的完整信息</text>
		</div>
		<div class='step'> <!-- 步骤条 -->
			<!-- 圆 -->
			<div class='cir'>
				<div>
					<text>填写项目信息</text>
				</div>
				<div></div>
				<div></div>
			</div>
			<!-- 线 -->
			<div class=wire>
				<div></div>
				<div></div>
			</div>
		</div>
		<div class="message">
			<input type="text" placeholder="企业名称" v-model="pname"/>
			<input type="text" placeholder="项目名称" v-model="enterprie_name"/>
			
			<div class='city'>
				<text>项目地址</text>
				<div class="city_tab">
					<view class="uni-form-item uni-column" @click="showMulLinkageThreePicker">
						<view class="plaOlder diqu">{{pickerText}}</view>
						<image :src="require('../../static/xuanze.svg')" mode="" style="width: 40rpx;height: 40rpx;"></image>
					</view>
					<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
					 @onConfirm="onConfirm" @="" :pickerValueArray="pickerValueArray"></mpvue-picker>
					<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @=""
					 @onConfirm="onConfirm"></mpvue-city-picker>
				</div>
			</div>
			
			<input type="text" placeholder='详细地址' v-model="address">
			<div class='green'> <!-- 绿化管理面积 -->
				<input type="text" value="" placeholder="绿化管理面积" />
				<lb-picker ref="picker" class="dw" :list="list" @confirm="wenzi" @click='dw_choose'>
					<image :src="require('../../static/xuanze.svg')" mode="" style="width: 40rpx;height: 40rpx;"></image>
					<view>{{ text }}</view>
				</lb-picker>
			</div>
			<input type="text" value="" placeholder="项目竣工时间" v-model="dtime"/>
			<input type="text" value="" placeholder="项目交付时间" v-model="time"/>
			<input type="text" placeholder='项目进场时间' v-model="ctime">
			<input type="text" placeholder='负责人' v-model="user_name">
		</div>
		<navigator class="next" url='./create_sure'>
			<button type="default" @click="next">下一步</button>
		</navigator>
		<text class='resetting'>重置</text>
	</view>
</template>

<script>
	 import LbPicker from '../../components/lb-picker'
	import mpvuePicker from './mpvuePicker.vue';
	import mpvueCityPicker from './mpvueCityPicker.vue';
	import cityData from '../../city.data.js';
	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker,
			LbPicker
		},
		data() {
			return {
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '请选择项目地址',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				province1: '',
				isdefault: 0,
				moHidden:true,//默认
				text: '亩',
				list: [
				  {
				    label: '亩',
				    value: '1'
				  },
				  {
				    label: '㎡',
				    value: '2'
				  }
				],
				
				pname: '', // 项目名称
				enterprie_name: '', // 企业名称
				province: '', // 省
				city: '', // 市
				area: '', // 区\县
				address: '', //详细地址
				user_name: '', // 项目负责人
				time: '', //交付时间
				ctime: '', // 进场时间
				dtime: '', //竣工时间
				auid: '' // app用户id
			}
		},
		onReady () {
		  
		},
		methods: {
			goBack() {
				uni.navigateBack({})
			},
			visible() {
				return false;
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				console.log(e)
				this.pickerText = e.label
				this.province1 = e.label.split(' ')[0]
			},
			wenzi(e) {
				console.log(e)
				this.text = e.item.label
			},
			dw_choose() {
				this.$refs.picker.show()
			},
			next() { // 下一步按钮
				uni.request({
					url: 'http://lvz.maike-docker.com/index.php/api/index/addProject',
					method: 'POST',
					
				})
			}
		}
	}
</script>

<style lang="less">
	
	.uni-input {
		width: 520rpx;
		font-size: 28rpx;
	}
	.plaOlder {
		height: 40rpx;
		// line-height: 40rpx;
		text-indent: 30rpx;
		// color: black;
		color: rgba(117, 117, 117, 1);
		font-size: 30rpx;
		text-align: left;
	}
	.goback{
		width: 92%;
		margin: 20rpx auto;
		image{
			width: 52rpx;
			height: 52rpx;
		}
	}
	.text{
		width: 92%;
		margin: 0 auto;
		p{
			font-weight: bold;
		}
		text{
			font-size: 14px;
			color: #8C8484;
		}
	}
	.step{
		width: 80%;
		height: 80rpx;
		// border: 1px solid red;
		margin: 20rpx auto;
		position: relative;
		.cir{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			div{
				width: 48rpx;
				height: 48rpx;
				border-radius: 50%;
				border: .5px solid #D9D9D9;	
				background: white;
				position: relative;
				&:nth-of-type(1){
					background: url(../../static/wancheng.svg) no-repeat;
					background-size: 116%;
					background-position: -4rpx -4rpx;
					border: none;
				}
				text{
					position: absolute;
					left: -150%;
					bottom: -100%;
					width: 200rpx;
					text-align: center;
					font-size: 12px;
				}
			}
		}
		.wire{
			width: 59.5%;
			margin: -6.5% auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			div{
				width: 43%;
				border: 1px solid #D9D9D9;
				&:nth-of-type(1){
					width: 42%;
				}
			}
		}
	}
	.message{
		width: 80%;
		height: 992rpx;
		box-shadow: #D2D2D2 1px 2px 4px 2px;
		border-radius: 12rpx;
		background: white;
		margin: 52rpx auto;
		padding: 20rpx 20rpx;
		input{
			width: 90%;
			height: 84rpx;
			line-height: 84rpx;
			text-align: left;
			text-indent: 40rpx;
			color: #86868A;
			background: #F6F8FF;
			margin: 18rpx auto;
			border-radius: 40rpx;
			font-size: 16px;
		}
		.city{
			width: 90%;
			height: 84rpx;
			font-size: 16px;
			line-height: 84rpx;
			text-align: left;
			margin: 32rpx auto;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.city_tab{
				width: 400rpx;
				height: 84rpx;
				align-items: center;
				background: #F6F8FF;
				color: #86888E;
				border-radius: 80rpx;
				position: relative;
				image{
					position: absolute;
					top: 50%;
					margin-top: -20rpx;
					right: 20rpx;
				}
			}
			.choose{
				width: 400rpx;
				height: 84rpx;
				line-height: 84rpx;
				margin-right: 0px;
				margin-top: -10rpx;
				background: black;
			}
		}
		.green{
			display: flex;
			align-items: center;
			input{
				width: 69%;
			}
			.dw{
				width: 110rpx;
				font-size: 32rpx;
				height: 84rpx;
				line-height: 84rpx;
				text-indent: 20rpx;
				margin-right: 28rpx;
				position: relative;
				background: #F6F8FF;
				image{
					position: absolute;
					right: 10rpx;
					top: 50%;
					margin-top: -20rpx;
				}
				
			}
		}
	}
	uni-button[type=default]{ /* .next 元素 */
		width: 80%;
		height: 84rpx;
		text-align: center;
		line-height: 84rpx;
		background: #3F5DE3 !important;
		border: none;
		outline: none;
		border-radius: 60rpx;
		margin: 20rpx auto;
		color: white;
	}
	.resetting{
		display: block;
		margin-top: 40rpx;
		width: 100%;
		text-align: center;
		font-size: 14px;
	}
</style>
