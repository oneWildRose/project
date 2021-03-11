import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		uid: '', // 用户ID
		orderState: 3 ,// 专家订单状态；0待确认，1进行中，2已完成，3全部
		clientid: 0, // 设备标识
		
		//图片缩略图参数
		// 第一个数字不可修改，第二个数字为1时缩放裁剪，为2时缩放不裁剪
		// 最后面两个数字越大图片越清晰，体积也越大。是否裁剪也会影响体积。
		// 图片路径 + 下方参数 + |imageInfo 复制到浏览器可查看缩略图信息
		imgFix: '?imageView2/1/w/100/h/100'
	},
	mutations:{
		orderStateChange(state, num) {
			state.orderState = num
		},
		uidSave(state, num) {
			state.uid = num
		},
		clientidSave(state, id) {
			state.clientid = id
		}
	},
	actions: {

	},
	getters: {
		
	}
})

export default store