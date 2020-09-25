import Vue from 'vue'
import App from './App'
import './static/iconfont/iconfont.css' //矢量图标（首页下方导航栏）
Vue.config.productionTip = false

// 全局注册接口函数
import request from 'common/request.js'
Vue.prototype.$request = request

App.mpType = 'app'

const app = new Vue({
    ...App,
})

app.$mount()
