import Vue from 'vue'
import App from './App'
import './static/iconfont/iconfont.css' //矢量图标（首页下方导航栏）
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
    ...App
})

app.$mount()
