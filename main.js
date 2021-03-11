import Vue from 'vue'
import App from './App'
import './static/iconfont/iconfont.css' //矢量图标（首页下方导航栏）
Vue.config.productionTip = false

// Vuex
import store from './store/index.js'
Vue.prototype.$store = store


// 自定义提示框
import G_show_modal from '@/components/G_show_modal/g_show_modal.js'
Vue.use(G_show_modal)

// 全局注册接口函数
import request from 'common/request.js'
Vue.prototype.$request = request
// 上传
import upload from 'common/upload.js'
Vue.prototype.$upload = upload

// GoEasy
// import GoEasy from 'common/goeasy-1.1.1';
// 初始化全局的GoEasy对象
// Vue.prototype.$goEasy = new GoEasy({
//     host: "hangzhou.goeasy.io", //应用所在的区域地址: 【hangzhou.goeasy.io | singapore.goeasy.io】
//     appkey: "BC-ce8dea62166a41d9870f674153778224", //替换为您的应用appkey
//     onConnected: function() {
//         console.log('连接成功！')
//     },
//     onDisconnected: function() {
//         console.log('连接断开！')
//     },
//     onConnectFailed: function(error) {
//         console.log('连接失败或错误！')
//     }
// });

// 引入并使用uView的JS库，注意这两行要放在import Vue之后。
import uView from "uview-ui";
Vue.use(uView);

// 向Date对象原型中添加方法，使其输出指定格式
// 调用例子：new Date().Format("yyyy-MM-dd") 或 new Date().Format("yyyy-MM-dd HH:mm:ss");
Date.prototype.Format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"H+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

App.mpType = 'app'

const app = new Vue({
    ...App,
	// store
})

app.$mount()
