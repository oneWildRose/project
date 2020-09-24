import Vue from 'vue'
import App from './App'
import './static/iconfont/iconfont.css' //矢量图标（首页下方导航栏）
Vue.config.productionTip = false

import store from './store/store.js'
Vue.prototype.$store = store


App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})

app.$mount()
