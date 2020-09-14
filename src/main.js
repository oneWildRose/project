import Vue from 'vue'
import App from './App.vue'
import './assets/iconfont/iconfont.css' //矢量图标（首页下方导航栏）

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
