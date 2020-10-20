import Vue from 'vue'
import App from './App'
import './static/iconfont/iconfont.css' //矢量图标（首页下方导航栏）
Vue.config.productionTip = false

// 自定义提示框
import G_show_modal from '@/components/G_show_modal/g_show_modal.js'
Vue.use(G_show_modal)


// 全局注册接口函数
import request from 'common/request.js'
Vue.prototype.$request = request

App.mpType = 'app'

const app = new Vue({
    ...App,
})

app.$mount()
